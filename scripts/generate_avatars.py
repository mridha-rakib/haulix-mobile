import base64
import os

os.makedirs('apps/driver/src/assets', exist_ok=True)

avatars = {}
for name in ['driver-alex.png', 'helper-marcus.png', 'avatar-camera.png', 'avatar-gallery.png']:
    p = f'apps/driver/assets/avatars/{name}'
    with open(p, 'rb') as f:
        key = name.replace('.png', '').replace('-', '_')
        avatars[key] = 'data:image/png;base64,' + base64.b64encode(f.read()).decode('utf-8')

code = f'''// 100% Offline Local Base64 Avatar Assets matching Figma specifications
export const LOCAL_AVATARS = {{
  driver_alex: "{avatars['driver_alex']}",
  helper_marcus: "{avatars['helper_marcus']}",
  avatar_camera: "{avatars['avatar_camera']}",
  avatar_gallery: "{avatars['avatar_gallery']}",
  placeholder: "{avatars['driver_alex']}",
}};
'''

with open('apps/driver/src/assets/localAvatars.ts', 'w', encoding='utf-8') as f:
    f.write(code)

print("Generated apps/driver/src/assets/localAvatars.ts successfully!")
