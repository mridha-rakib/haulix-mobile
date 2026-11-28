import subprocess
import xml.etree.ElementTree as ET
import os

subprocess.run(["adb", "shell", "uiautomator", "dump", "/sdcard/window_dump.xml"])
subprocess.run(["adb", "pull", "/sdcard/window_dump.xml", "temp_window_dump.xml"])

if os.path.exists("temp_window_dump.xml"):
    tree = ET.parse("temp_window_dump.xml")
    root = tree.getroot()
    texts = []
    for node in root.iter("node"):
        t = node.attrib.get("text", "").strip()
        c = node.attrib.get("content-desc", "").strip()
        if t: texts.append(f"text: {t}")
        elif c: texts.append(f"desc: {c}")
    print(f"Total elements: {len(texts)}")
    for item in texts:
        print("  ", item)
