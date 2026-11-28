import json

with open("docs/design/driver-final/DRIVER_WORKER_IMPLEMENTATION_REGISTRY.json", "r", encoding="utf-8") as f:
    registry = json.load(f)

print(f"Total registry entries: {len(registry)}")

# Check fields of an entry
sample = registry[0]
print("Keys:", list(sample.keys()))

# Check workflows
workflows = {}
for item in registry:
    wf = item.get("workflow", "OTHER")
    workflows.setdefault(wf, []).append(item["screenId"])

for wf, screens in sorted(workflows.items()):
    print(f"{wf}: {len(screens)} screens -> {screens}")
