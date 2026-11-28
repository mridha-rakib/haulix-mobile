import json
import os

with open("docs/design/driver-final/DRIVER_WORKER_IMPLEMENTATION_REGISTRY.json", "r", encoding="utf-8") as f:
    registry = json.load(f)

app_dir = os.path.join("apps", "driver", "app")

print(f"{'ID':<6} | {'Title':<30} | {'Registry Route':<32} | {'File Exists?':<12}")
print("-" * 86)

all_match = True
for item in registry:
    sid = item["screenId"]
    title = item["screenTitle"]
    p_route = item["proposedRoute"]
    
    # Check corresponding file
    clean_route = p_route.strip("/")
    # Check clean_route.tsx or clean_route/index.tsx
    candidate1 = os.path.join(app_dir, clean_route + ".tsx")
    candidate2 = os.path.join(app_dir, clean_route, "index.tsx")
    
    exists = os.path.exists(candidate1) or os.path.exists(candidate2)
    status_str = "YES" if exists else "MISSING"
    if not exists:
        all_match = False
    print(f"{sid:<6} | {title[:28]:<30} | {p_route:<32} | {status_str:<12}")

print("-" * 86)
print(f"All routes matched directly in codebase? {all_match}")
