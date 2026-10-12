// Export the existing vector identity; only add transparent square canvas padding.
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { chromium } from "playwright";
const logo = await readFile(
  new URL("../public/m2-mark.svg", import.meta.url),
  "utf8",
);
const icon = logo.replace('viewBox="55 86 400 310"', 'viewBox="55 41 400 400"');
if (icon === logo)
  throw new Error(
    "Logo viewport changed; review its square padding before exporting.",
  );
await writeFile(new URL("../public/favicon.svg", import.meta.url), icon);
const browser = await chromium.launch({
  executablePath:
    process.env.CHROMIUM_PATH ||
    (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined),
  args: ["--no-sandbox"],
});
try {
  const page = await browser.newPage();
  for (const [size, name, background] of [
    [16, "favicon-16x16.png", "transparent"],
    [32, "favicon-32x32.png", "transparent"],
    [48, "favicon-48x48.png", "transparent"],
    [180, "apple-touch-icon.png", "#f4f5f7"],
  ]) {
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(
      `<html><head><style>html,body{margin:0;width:100%;height:100%;background:${background}}svg{display:block;width:100%;height:100%}</style></head><body>${icon}</body></html>`,
    );
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: new URL(`../public/${name}`, import.meta.url).pathname,
      omitBackground: true,
    });
  }
} finally {
  await browser.close();
}
// Embed native-size PNG renders in a standards-compliant multi-resolution ICO.
execFileSync(
  "python3",
  [
    "-c",
    `
from pathlib import Path
from PIL import Image
import struct
root=Path(${JSON.stringify(new URL("../public", import.meta.url).pathname)})
frames=[(size,(root/f'favicon-{size}x{size}.png').read_bytes()) for size in [16,32,48]]
offset=6+16*len(frames)
entries=[]
for size,data in frames:
 entries.append(struct.pack('<BBBBHHII',size,size,0,0,1,32,len(data),offset));offset+=len(data)
(root/'favicon.ico').write_bytes(struct.pack('<HHH',0,1,len(frames))+b''.join(entries)+b''.join(data for _,data in frames))
for size,_ in frames:
 image=Image.open(root/f'favicon-{size}x{size}.png').convert('RGBA')
 assert image.size==(size,size)
 assert image.getextrema()[3][0]==0 and image.getextrema()[3][1]>0
assert Image.open(root/'apple-touch-icon.png').size==(180,180)
assert Image.open(root/'favicon.ico').ico.sizes()=={(16,16),(32,32),(48,48)}
`,
  ],
  { stdio: "inherit" },
);
console.log(
  "Exported authentic square SVG, transparent16/32/48 PNG and ICO, and180px light-background Apple icon.",
);
