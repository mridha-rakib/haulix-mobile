import os
import re
import json

def check_demo_screens():
    with open('apps/driver/src/components/demo/driverDemoScreens.ts', 'r', encoding='utf-8') as f:
        text = f.read()

    canonical = re.findall(r'id:\s*"((?:DW\d+|TAB-[A-Z-]+)[^"]*)"', text)
    overlays = re.findall(r'id:\s*"(OV[^"]+)"', text)
    print(f"Total canonical/tab demo entries: {len(canonical)}")
    print(f"Total overlay demo entries: {len(overlays)}")
    print("Overlays found:", overlays)

    # Check which overlays (OV-01 to OV-07) are present in EN and ES
    for i in range(1, 8):
        en_id = f"OV{i:02d}-EN"
        es_id = f"OV{i:02d}-ES"
        print(f"  OV{i:02d}: EN={'YES' if en_id in overlays else 'MISSING'}, ES={'YES' if es_id in overlays else 'MISSING'}")

if __name__ == '__main__':
    check_demo_screens()
