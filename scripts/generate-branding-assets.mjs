import fs from "node:fs";
import path from "node:path";
import { PNG } from "pngjs";

const SOURCE_PATH =
  "C:/Users/rakib_bro/.gemini/antigravity/brain/7c3a139d-5f2c-4686-a3f5-fa64026dff7c/.user_uploaded/media_1794386127963_fd1e6c0b.png";

// Brand Colors
const BG_COLOR = { r: 8, g: 11, b: 11 }; // #080B0B

function loadSource() {
  const buf = fs.readFileSync(SOURCE_PATH);
  return PNG.sync.read(buf);
}

function isPixelVisible(png, x, y) {
  const idx = (png.width * y + x) << 2;
  return png.data[idx + 3] > 10;
}

// 1. Find bounding box of the logo
function getLogoBoundingBox(png) {
  let minX = png.width;
  let maxX = 0;
  let minY = png.height;
  let maxY = 0;

  for (let y = 0; y < png.height; y++) {
    for (let x = 0; x < png.width; x++) {
      if (isPixelVisible(png, x, y)) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
    }
  }
  return { minX, maxX, minY, maxY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

// 2. Crop logo to tight bounding box
function cropLogo(src, bbox) {
  const cropped = new PNG({ width: bbox.width, height: bbox.height });
  for (let y = 0; y < bbox.height; y++) {
    for (let x = 0; x < bbox.width; x++) {
      const srcIdx = (src.width * (y + bbox.minY) + (x + bbox.minX)) << 2;
      const dstIdx = (bbox.width * y + x) << 2;
      cropped.data[dstIdx] = src.data[srcIdx];
      cropped.data[dstIdx + 1] = src.data[srcIdx + 1];
      cropped.data[dstIdx + 2] = src.data[srcIdx + 2];
      cropped.data[dstIdx + 3] = src.data[srcIdx + 3];
    }
  }
  return cropped;
}

function sampleBoxPixel(src, bounds) {
  let totalWeight = 0;
  let accR = 0;
  let accG = 0;
  let accB = 0;
  let accA = 0;

  for (let sy = bounds.y0; sy < bounds.y1; sy++) {
    const yWeight = Math.min(sy + 1, bounds.syEnd) - Math.max(sy, bounds.syStart);
    if (yWeight <= 0) continue;

    for (let sx = bounds.x0; sx < bounds.x1; sx++) {
      const xWeight = Math.min(sx + 1, bounds.sxEnd) - Math.max(sx, bounds.sxStart);
      if (xWeight <= 0) continue;

      const weight = xWeight * yWeight;
      const idx = (src.width * sy + sx) << 2;
      const a = src.data[idx + 3] / 255;

      accR += src.data[idx] * a * weight;
      accG += src.data[idx + 1] * a * weight;
      accB += src.data[idx + 2] * a * weight;
      accA += src.data[idx + 3] * weight;
      totalWeight += weight;
    }
  }

  if (totalWeight > 0 && accA > 0) {
    const finalA = accA / totalWeight;
    const alphaFrac = finalA / 255;
    return [
      Math.round(accR / totalWeight / alphaFrac),
      Math.round(accG / totalWeight / alphaFrac),
      Math.round(accB / totalWeight / alphaFrac),
      Math.round(finalA),
    ];
  }
  return [0, 0, 0, 0];
}

// 3. High-quality area-averaging resampler for smooth scaling (both downscaling and upscaling)
function resizeLogo(src, targetW, targetH) {
  const dst = new PNG({ width: targetW, height: targetH });
  const xRatio = src.width / targetW;
  const yRatio = src.height / targetH;

  for (let dy = 0; dy < targetH; dy++) {
    const syStart = dy * yRatio;
    const syEnd = (dy + 1) * yRatio;
    const y0 = Math.floor(syStart);
    const y1 = Math.min(Math.ceil(syEnd), src.height);

    for (let dx = 0; dx < targetW; dx++) {
      const sxStart = dx * xRatio;
      const sxEnd = (dx + 1) * xRatio;
      const x0 = Math.floor(sxStart);
      const x1 = Math.min(Math.ceil(sxEnd), src.width);

      const [r, g, b, a] = sampleBoxPixel(src, {
        syStart,
        syEnd,
        y0,
        y1,
        sxStart,
        sxEnd,
        x0,
        x1,
      });

      const dstIdx = (targetW * dy + dx) << 2;
      dst.data[dstIdx] = r;
      dst.data[dstIdx + 1] = g;
      dst.data[dstIdx + 2] = b;
      dst.data[dstIdx + 3] = a;
    }
  }

  return dst;
}

// 4. Place a resized logo centered on a target canvas
function placeOnCanvas(logo, canvasW, canvasH, bg = null) {
  const canvas = new PNG({ width: canvasW, height: canvasH });
  const offsetX = Math.round((canvasW - logo.width) / 2);
  const offsetY = Math.round((canvasH - logo.height) / 2);

  for (let y = 0; y < canvasH; y++) {
    for (let x = 0; x < canvasW; x++) {
      const dstIdx = (canvasW * y + x) << 2;
      const lx = x - offsetX;
      const ly = y - offsetY;

      let srcR = 0,
        srcG = 0,
        srcB = 0,
        srcA = 0;
      if (lx >= 0 && lx < logo.width && ly >= 0 && ly < logo.height) {
        const srcIdx = (logo.width * ly + lx) << 2;
        srcR = logo.data[srcIdx];
        srcG = logo.data[srcIdx + 1];
        srcB = logo.data[srcIdx + 2];
        srcA = logo.data[srcIdx + 3];
      }

      if (bg) {
        // Opaque background composite
        const alphaFrac = srcA / 255;
        canvas.data[dstIdx] = Math.round(srcR * alphaFrac + bg.r * (1 - alphaFrac));
        canvas.data[dstIdx + 1] = Math.round(srcG * alphaFrac + bg.g * (1 - alphaFrac));
        canvas.data[dstIdx + 2] = Math.round(srcB * alphaFrac + bg.b * (1 - alphaFrac));
        canvas.data[dstIdx + 3] = 255; // 100% OPAQUE
      } else {
        // Transparent canvas
        canvas.data[dstIdx] = srcR;
        canvas.data[dstIdx + 1] = srcG;
        canvas.data[dstIdx + 2] = srcB;
        canvas.data[dstIdx + 3] = srcA;
      }
    }
  }

  return canvas;
}

// 5. Convert transparent PNG to monochrome white silhouette
function makeMonochrome(src) {
  const dst = new PNG({ width: src.width, height: src.height });
  for (let i = 0; i < src.data.length; i += 4) {
    dst.data[i] = 255; // White R
    dst.data[i + 1] = 255; // White G
    dst.data[i + 2] = 255; // White B
    dst.data[i + 3] = src.data[i + 3]; // Preserve exact alpha
  }
  return dst;
}

function generateAllAssets() {
  console.log("Loading source logo...");
  const src = loadSource();
  const bbox = getLogoBoundingBox(src);
  console.log("Source logo bbox:", bbox);
  const cropped = cropLogo(src, bbox);

  // Asset 1: icon.png (1024x1024, fully opaque #080B0B background)
  // Scale logo to ~620px height (occupies ~60% of canvas height, balanced for iOS squircle)
  const iconLogoH = 620;
  const iconLogoW = Math.round(iconLogoH * (bbox.width / bbox.height));
  console.log(
    `Generating icon.png: logo size ${iconLogoW}x${iconLogoH} on 1024x1024 opaque #080B0B...`
  );
  const resizedIconLogo = resizeLogo(cropped, iconLogoW, iconLogoH);
  const iconPNG = placeOnCanvas(resizedIconLogo, 1024, 1024, BG_COLOR);

  // Asset 2: adaptive-icon.png (1024x1024, transparent background)
  // Scale logo to fit safely within the 72dp Android safe zone (radius 341.3px)
  // Height 430px gives max radius ~300px, leaving >40px safe margin inside the circle
  const adaptiveH = 430;
  const adaptiveW = Math.round(adaptiveH * (bbox.width / bbox.height));
  console.log(
    `Generating adaptive-icon.png: logo size ${adaptiveW}x${adaptiveH} on 1024x1024 transparent...`
  );
  const resizedAdaptiveLogo = resizeLogo(cropped, adaptiveW, adaptiveH);
  const adaptivePNG = placeOnCanvas(resizedAdaptiveLogo, 1024, 1024, null);

  // Asset 3: monochrome-icon.png (1024x1024, transparent background, pure white silhouette)
  console.log("Generating monochrome-icon.png from adaptive icon...");
  const monochromePNG = makeMonochrome(adaptivePNG);

  // Asset 4: splash-icon.png (1024x1024, transparent background)
  // For native splash screen, centered transparent logo
  // Size ~650px height allows sharp rendering when scaled by expo-splash-screen
  const splashH = 650;
  const splashW = Math.round(splashH * (bbox.width / bbox.height));
  console.log(
    `Generating splash-icon.png: logo size ${splashW}x${splashH} on 1024x1024 transparent...`
  );
  const resizedSplashLogo = resizeLogo(cropped, splashW, splashH);
  const splashPNG = placeOnCanvas(resizedSplashLogo, 1024, 1024, null);

  // Asset 5: favicon.png (48x48, web favicon)
  const favH = 36;
  const favW = Math.round(favH * (bbox.width / bbox.height));
  const resizedFavLogo = resizeLogo(cropped, favW, favH);
  const faviconPNG = placeOnCanvas(resizedFavLogo, 48, 48, BG_COLOR);

  // Destinations
  const destinations = [
    "c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/apps/customer/assets/branding",
    "c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/apps/driver/assets/branding",
    "c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/assets/branding",
  ];

  for (const destDir of destinations) {
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    fs.writeFileSync(path.join(destDir, "icon.png"), PNG.sync.write(iconPNG));
    fs.writeFileSync(path.join(destDir, "adaptive-icon.png"), PNG.sync.write(adaptivePNG));
    fs.writeFileSync(path.join(destDir, "monochrome-icon.png"), PNG.sync.write(monochromePNG));
    fs.writeFileSync(path.join(destDir, "splash-icon.png"), PNG.sync.write(splashPNG));
    fs.writeFileSync(path.join(destDir, "favicon.png"), PNG.sync.write(faviconPNG));
    console.log(`Saved branding assets to: ${destDir}`);
  }

  console.log("\nAll assets generated successfully!");
}

generateAllAssets();
