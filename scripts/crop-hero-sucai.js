const path = require('path');
const { cropPng, readPng, writePng } = require('./png-crop-utils');

const SOURCE = path.resolve(__dirname, '../public/imgs/site/hero-sucai.png');
const OUTPUT_DIR = path.dirname(SOURCE);

const CROPS = [
  { file: 'hero-bulb.png', note: '单独的灯泡，包含外圈光线', x: 180, y: 55, width: 445, height: 475 },
  { file: 'hero-gear.png', note: '单独的齿轮', x: 1205, y: 120, width: 345, height: 345 },
  { file: 'hero-leaf.png', note: '灯泡和齿轮之间的飘叶', x: 855, y: 170, width: 185, height: 255 },
  { file: 'hero-pot-left.png', note: '左侧带 {} 的小苗盆栽', x: 190, y: 810, width: 390, height: 630 },
  { file: 'hero-pot-right.png', note: '右下角小苗', x: 1310, y: 1885, width: 225, height: 190 },
  { file: 'hero-code-tr.png', note: '中上偏右的 </> 植物', x: 740, y: 800, width: 355, height: 505 },
  { file: 'hero-code-mr.png', note: '右中黄色圆 </> 植物', x: 1305, y: 825, width: 345, height: 495 },
  { file: 'hero-book-br.png', note: '右下角橙色书', x: 1205, y: 1390, width: 445, height: 420 },
  { file: 'hero-book-bl.png', note: '左下角代码本', x: 710, y: 1800, width: 360, height: 325 },
  { file: 'hero-sparkles.png', note: '零散 sparkle 和小圆点', x: 205, y: 580, width: 1405, height: 205 },
];

function main() {
  const image = readPng(SOURCE);

  for (const crop of CROPS) {
    const outputPath = path.join(OUTPUT_DIR, crop.file);
    writePng(outputPath, cropPng(image, crop));
    console.log(`${crop.file} ${crop.width}x${crop.height} - ${crop.note}`);
  }
}

main();
