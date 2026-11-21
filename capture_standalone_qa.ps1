# HAULIX Phase 03.47B — Automated Standalone APK Deep-Link & Screenshot Script
param(
    [string]$DeviceSerial = "0B04731X200003BB"
)

$routes = @(
    @{ id = "w05-s10-en"; route = "/searching-for-driver"; locale = "en" },
    @{ id = "w05-s10-es"; route = "/searching-for-driver"; locale = "es" },
    @{ id = "w05-s20-en"; route = "/search-expanded-20mi"; locale = "en" },
    @{ id = "w05-s20-es"; route = "/search-expanded-20mi"; locale = "es" },
    @{ id = "w05-s30-en"; route = "/search-expanding-30mi"; locale = "en" },
    @{ id = "w05-s30-es"; route = "/search-expanding-30mi"; locale = "es" },
    @{ id = "w05-s40-en"; route = "/search-expanded-40mi"; locale = "en" },
    @{ id = "w05-s40-es"; route = "/search-expanded-40mi"; locale = "es" },
    @{ id = "w05-s50-en"; route = "/search-expanded-50mi"; locale = "en" },
    @{ id = "w05-s50-es"; route = "/search-expanded-50mi"; locale = "es" },
    @{ id = "w05-matched-en"; route = "/driver-matched"; locale = "en" },
    @{ id = "w05-matched-es"; route = "/driver-matched"; locale = "es" },
    @{ id = "w05-helper-en"; route = "/helper-confirmed"; locale = "en" },
    @{ id = "w05-helper-es"; route = "/helper-confirmed"; locale = "es" },
    @{ id = "w05-reassigned-en"; route = "/driver-reassigned"; locale = "en" },
    @{ id = "w05-reassigned-es"; route = "/driver-reassigned"; locale = "es" },
    @{ id = "w05-late-en"; route = "/driver-late"; locale = "en" },
    @{ id = "w05-late-es"; route = "/driver-late"; locale = "es" },
    @{ id = "w05-nodriver-en"; route = "/no-driver-available"; locale = "en" },
    @{ id = "w05-nodriver-es"; route = "/no-driver-available"; locale = "es" },
    @{ id = "w05-cancel-review-en"; route = "/cancel-request-review"; locale = "en" },
    @{ id = "w05-cancel-review-es"; route = "/cancel-request-review"; locale = "es" },
    @{ id = "w05-canceled-en"; route = "/request-canceled"; locale = "en" },
    @{ id = "w05-canceled-es"; route = "/request-canceled"; locale = "es" }
)

Write-Host "Target Device: $DeviceSerial"
New-Item -ItemType Directory -Force -Path docs/qa/phase-03-47b/android | Out-Null

foreach ($item in $routes) {
    $uri = "haulix-customer://{0}?previewLocale={1}" -f $item.route, $item.locale
    Write-Host "Opening: $uri ($($item.id))"
    adb -s $DeviceSerial shell am start -a android.intent.action.VIEW -d $uri com.haulix.customer | Out-Null
    Start-Sleep -Milliseconds 1800
    
    $outPath = "docs/qa/phase-03-47b/android/$($item.id)-android.png"
    adb -s $DeviceSerial exec-out screencap -p > $outPath
    Write-Host "Captured: $outPath"
}

Write-Host "All hardware screenshots captured successfully."
