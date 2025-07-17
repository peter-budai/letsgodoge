const fs = require("fs");

const FILES = [
  "sound.mp3",
  "doge1.png",
  "doge2.png",
  "doge3.png",
  "doge4.png",
  "movement.js",
];

const buffers = FILES.map((file) => fs.readFileSync(file));
const cutoffs = buffers.map((buf) => buf.length);
const out = Buffer.concat(buffers);

fs.writeFileSync("doge.bmp", out);

const cutoffsJS = `window.PACKED_CUTOFFS = ${JSON.stringify(cutoffs)};`;
fs.writeFileSync("cutoffs.js", cutoffsJS);

console.log("✅ Packed as doge.bmp");
console.log("✅ Cutoffs saved in cutoffs.js");
