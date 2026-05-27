const path = require('path');
const { cropPng, readPng, writePng } = require('./png-crop-utils');

const SOURCE = path.resolve(__dirname, '../public/imgs/site/cat-sucai.png');
const OUTPUT_DIR = path.dirname(SOURCE);

const CROPS = [
  { file: 'cat-star-lg.png', note: '左上大星光', x: 215, y: 135, width: 315, height: 350 },
  { file: 'cat-star-sm.png', note: '右上小星光', x: 795, y: 230, width: 190, height: 210 },
  { file: 'cat-rays-orange.png', note: '左侧橙色三段光线', x: 205, y: 585, width: 325, height: 215 },
  { file: 'cat-rays-yellow.png', note: '右侧黄色三段光线', x: 725, y: 590, width: 320, height: 215 },
  { file: 'cat-dot-yellow.png', note: '左下黄色圆点', x: 195, y: 958, width: 125, height: 125 },
  { file: 'cat-dot-orange.png', note: '中下橙色圆点', x: 410, y: 955, width: 125, height: 125 },
  { file: 'cat-dot-green.png', note: '右下绿色圆点', x: 637, y: 958, width: 128, height: 125 },
  { file: 'cat-leaf.png', note: '右下叶子', x: 835, y: 905, width: 245, height: 215 },
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
