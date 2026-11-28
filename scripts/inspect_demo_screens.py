import re

with open("apps/driver/src/components/demo/driverDemoScreens.ts", "r", encoding="utf-8") as f:
    content = f.read()

pattern = re.compile(r'id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*figmaNode:\s*"([^"]+)",\s*route:\s*"([^"]+)"')
matches = pattern.findall(content)

print(f"Total screens in driverDemoScreens: {len(matches)}")
for sid, name, node, route in matches:
    print(f"{sid:<10} | {node:<15} | {route:<36} | {name[:30]}")
