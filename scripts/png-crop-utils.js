const fs = require('fs');
const zlib = require('zlib');

function readPng(filePath) {
  const input = fs.readFileSync(filePath);
  const signature = '89504e470d0a1a0a';

  if (input.subarray(0, 8).toString('hex') !== signature) {
    throw new Error(`${filePath} is not a PNG file`);
  }

  const idatChunks = [];
  let image;
  let offset = 8;

  while (offset < input.length) {
    const length = input.readUInt32BE(offset);
    offset += 4;
    const type = input.subarray(offset, offset + 4).toString('ascii');
    offset += 4;
    const data = input.subarray(offset, offset + length);
    offset += length + 4;

    if (type === 'IHDR') {
      image = {
        width: data.readUInt32BE(0),
        height: data.readUInt32BE(4),
        bitDepth: data[8],
        colorType: data[9],
        compression: data[10],
        filter: data[11],
        interlace: data[12],
      };
    } else if (type === 'IDAT') {
      idatChunks.push(data);
    } else if (type === 'IEND') {
      break;
    }
  }

  if (!image) {
    throw new Error('Missing PNG header');
  }

  if (
    image.bitDepth !== 8 ||
    image.colorType !== 6 ||
    image.compression !== 0 ||
    image.filter !== 0 ||
    image.interlace !== 0
  ) {
    throw new Error('Only non-interlaced 8-bit RGBA PNG files are supported');
  }

  const raw = zlib.inflateSync(Buffer.concat(idatChunks));
  const bytesPerPixel = 4;
  const stride = image.width * bytesPerPixel;
  const pixels = Buffer.alloc(image.width * image.height * bytesPerPixel);
  let rawOffset = 0;

  for (let y = 0; y < image.height; y += 1) {
    const filter = raw[rawOffset];
    rawOffset += 1;
    const sourceRow = raw.subarray(rawOffset, rawOffset + stride);
    const targetRow = pixels.subarray(y * stride, (y + 1) * stride);
    const previousRow = y === 0 ? null : pixels.subarray((y - 1) * stride, y * stride);
    rawOffset += stride;

    for (let x = 0; x < stride; x += 1) {
      const left = x >= bytesPerPixel ? targetRow[x - bytesPerPixel] : 0;
      const up = previousRow ? previousRow[x] : 0;
      const upLeft = previousRow && x >= bytesPerPixel ? previousRow[x - bytesPerPixel] : 0;
      targetRow[x] = (sourceRow[x] + filterPrediction(filter, left, up, upLeft)) & 255;
    }
  }

  return { ...image, pixels };
}

function cropPng(image, crop) {
  const { x, y, width, height } = crop;

  if (x < 0 || y < 0 || width <= 0 || height <= 0) {
    throw new Error(`Invalid crop for ${crop.file}`);
  }

  if (x + width > image.width || y + height > image.height) {
    throw new Error(`Crop for ${crop.file} exceeds source image bounds`);
  }

  const pixels = Buffer.alloc(width * height * 4);

  for (let row = 0; row < height; row += 1) {
    const sourceStart = ((y + row) * image.width + x) * 4;
    const sourceEnd = sourceStart + width * 4;
    const targetStart = row * width * 4;
    image.pixels.copy(pixels, targetStart, sourceStart, sourceEnd);
  }

  return { width, height, pixels };
}

function writePng(filePath, image) {
  const header = Buffer.alloc(13);
  header.writeUInt32BE(image.width, 0);
  header.writeUInt32BE(image.height, 4);
  header[8] = 8;
  header[9] = 6;
  header[10] = 0;
  header[11] = 0;
  header[12] = 0;

  const stride = image.width * 4;
  const raw = Buffer.alloc((stride + 1) * image.height);

  for (let y = 0; y < image.height; y += 1) {
    const rawStart = y * (stride + 1);
    const pixelStart = y * stride;
    raw[rawStart] = 0;
    image.pixels.copy(raw, rawStart + 1, pixelStart, pixelStart + stride);
  }

  fs.writeFileSync(
    filePath,
    Buffer.concat([
      Buffer.from('89504e470d0a1a0a', 'hex'),
      pngChunk('IHDR', header),
      pngChunk('IDAT', zlib.deflateSync(raw)),
      pngChunk('IEND', Buffer.alloc(0)),
    ]),
  );
}

function filterPrediction(filter, left, up, upLeft) {
  if (filter === 0) return 0;
  if (filter === 1) return left;
  if (filter === 2) return up;
  if (filter === 3) return Math.floor((left + up) / 2);
  if (filter === 4) return paeth(left, up, upLeft);

  throw new Error(`Unsupported PNG filter: ${filter}`);
}

function paeth(left, up, upLeft) {
  const estimate = left + up - upLeft;
  const leftDistance = Math.abs(estimate - left);
  const upDistance = Math.abs(estimate - up);
  const upLeftDistance = Math.abs(estimate - upLeft);

  if (leftDistance <= upDistance && leftDistance <= upLeftDistance) return left;
  if (upDistance <= upLeftDistance) return up;
  return upLeft;
}

function pngChunk(type, data) {
  const typeBuffer = Buffer.from(type, 'ascii');
  const chunk = Buffer.concat([typeBuffer, data]);
  const output = Buffer.alloc(12 + data.length);

  output.writeUInt32BE(data.length, 0);
  typeBuffer.copy(output, 4);
  data.copy(output, 8);
  output.writeUInt32BE(crc32(chunk), 8 + data.length);

  return output;
}

function crc32(buffer) {
  let crc = 0xffffffff;

  for (const byte of buffer) {
    crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ byte) & 0xff];
  }

  return (crc ^ 0xffffffff) >>> 0;
}

function makeCrcTable() {
  const table = new Uint32Array(256);

  for (let i = 0; i < table.length; i += 1) {
    let value = i;

    for (let bit = 0; bit < 8; bit += 1) {
      value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
    }

    table[i] = value >>> 0;
  }

  return table;
}

const CRC_TABLE = makeCrcTable();

module.exports = {
  cropPng,
  readPng,
  writePng,
};
