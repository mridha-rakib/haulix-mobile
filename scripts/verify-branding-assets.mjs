import fs from "node:fs";
import path from "node:path";
import { PNG } from "pngjs";

const DIRS = [
  "c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/apps/customer/assets/branding",
  "c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/apps/driver/assets/branding",
];

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

function assert(condition, message) {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  ✅ ${message}`);
  } else {
    failedChecks++;
    console.error(`  ❌ FAILED: ${message}`);
  }
}

console.log("\n🧪 Running Branding Assets Verification...\n");

for (const dir of DIRS) {
  console.log(`Verifying directory: ${dir}`);

  // 1. Check all files exist
  const files = [
    "icon.png",
    "adaptive-icon.png",
    "monochrome-icon.png",
    "splash-icon.png",
    "favicon.png",
  ];
  for (const f of files) {
    const p = path.join(dir, f);
    assert(fs.existsSync(p), `${f} exists in filesystem`);
    const stat = fs.statSync(p);
    assert(stat.size > 0, `${f} file size is non-zero (${stat.size} bytes)`);
  }

  // 2. Verify icon.png
  {
    const p = path.join(dir, "icon.png");
    const png = PNG.sync.read(fs.readFileSync(p));
    assert(
      png.width === 1024 && png.height === 1024,
      `icon.png is exactly 1024x1024 (got ${png.width}x${png.height})`
    );

    // Check 100% opacity (no alpha != 255)
    let nonOpaquePixels = 0;
    for (let i = 3; i < png.data.length; i += 4) {
      if (png.data[i] !== 255) nonOpaquePixels++;
    }
    assert(
      nonOpaquePixels === 0,
      `icon.png is 100% opaque (0 non-opaque pixels, got ${nonOpaquePixels})`
    );

    // Check background corner colors are #080B0B
    const tl = { r: png.data[0], g: png.data[1], b: png.data[2] };
    assert(
      tl.r === 8 && tl.g === 11 && tl.b === 11,
      `icon.png corner background is #080B0B (rgb: ${tl.r},${tl.g},${tl.b})`
    );
  }

  // 3. Verify adaptive-icon.png
  {
    const p = path.join(dir, "adaptive-icon.png");
    const png = PNG.sync.read(fs.readFileSync(p));
    assert(png.width === 1024 && png.height === 1024, `adaptive-icon.png is exactly 1024x1024`);

    // Check corner is transparent
    assert(png.data[3] === 0, `adaptive-icon.png corners are transparent (alpha = ${png.data[3]})`);

    // Check Android safe-zone: all pixels with alpha > 20 must have radius < 341.3px from (512, 512)
    const centerX = 512,
      centerY = 512;
    let maxRadius = 0;
    let pixelsOutsideSafeZone = 0;
    const safeRadius = 341.33;

    for (let y = 0; y < png.height; y++) {
      for (let x = 0; x < png.width; x++) {
        const idx = (png.width * y + x) << 2;
        const a = png.data[idx + 3];
        if (a > 20) {
          const dx = x - centerX;
          const dy = y - centerY;
          const r = Math.sqrt(dx * dx + dy * dy);
          if (r > maxRadius) maxRadius = r;
          if (r > safeRadius) pixelsOutsideSafeZone++;
        }
      }
    }

    assert(
      pixelsOutsideSafeZone === 0,
      `adaptive-icon.png content fits 100% within 72dp Android safe circle (0 pixels outside, got ${pixelsOutsideSafeZone})`
    );
    assert(
      maxRadius < safeRadius,
      `adaptive-icon.png max radius is ${maxRadius.toFixed(1)}px (safe radius: ${safeRadius.toFixed(1)}px, margin: ${(safeRadius - maxRadius).toFixed(1)}px)`
    );
  }

  // 4. Verify monochrome-icon.png
  {
    const p = path.join(dir, "monochrome-icon.png");
    const png = PNG.sync.read(fs.readFileSync(p));
    assert(png.width === 1024 && png.height === 1024, `monochrome-icon.png is exactly 1024x1024`);

    let nonWhiteColoredPixels = 0;
    for (let i = 0; i < png.data.length; i += 4) {
      const a = png.data[i + 3];
      if (a > 20) {
        if (png.data[i] !== 255 || png.data[i + 1] !== 255 || png.data[i + 2] !== 255) {
          nonWhiteColoredPixels++;
        }
      }
    }
    assert(
      nonWhiteColoredPixels === 0,
      `monochrome-icon.png has 100% white foreground silhouette for Android themed icons (0 non-white pixels)`
    );
  }

  // 5. Verify splash-icon.png
  {
    const p = path.join(dir, "splash-icon.png");
    const png = PNG.sync.read(fs.readFileSync(p));
    assert(png.width === 1024 && png.height === 1024, `splash-icon.png is exactly 1024x1024`);
    assert(png.data[3] === 0, `splash-icon.png background is transparent`);

    // Verify logo is centered
    let minX = png.width,
      maxX = 0,
      minY = png.height,
      maxY = 0;
    for (let y = 0; y < png.height; y++) {
      for (let x = 0; x < png.width; x++) {
        const idx = (png.width * y + x) << 2;
        if (png.data[idx + 3] > 20) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    assert(
      Math.abs(midX - 512) <= 1 && Math.abs(midY - 512) <= 1,
      `splash-icon.png logo is centered at (512, 512): actual center (${midX}, ${midY})`
    );
  }

  // 6. Verify favicon.png
  {
    const p = path.join(dir, "favicon.png");
    const png = PNG.sync.read(fs.readFileSync(p));
    assert(png.width === 48 && png.height === 48, `favicon.png is 48x48`);
  }

  console.log("");
}

console.log(`──────────────────────────────────────────────────`);
console.log(
  `Verification Summary: ${passedChecks}/${totalChecks} checks passed (${failedChecks} failures)`
);

if (failedChecks > 0) {
  process.exit(1);
} else {
  console.log("🎉 All branding asset checks passed with 100% precision!\n");
}
