import { createRequire } from 'node:module';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const require = createRequire(import.meta.url);
const TextToSVG = require('text-to-svg');

const motto = 'Създавам сайтове, които оставят следа';
const heroWord = 'уебсайтове';
const cyrillicFontPath = path.join(process.cwd(), 'node_modules/@fontsource/manrope/files/manrope-cyrillic-700-normal.woff');
const latinFontPath = path.join(process.cwd(), 'node_modules/@fontsource/manrope/files/manrope-latin-700-normal.woff');
const outputPath = path.join(process.cwd(), 'src/mottoPaths.js');
const fontSize = 42;
const viewWidth = 920;
const viewHeight = 118;
const baseline = 72;

function loadFont(fontPath) {
  return new Promise((resolve, reject) => {
    TextToSVG.load(fontPath, (error, instance) => {
      if (error) reject(error);
      else resolve(instance);
    });
  });
}

const cyrillicFont = await loadFont(cyrillicFontPath);
const latinFont = await loadFont(latinFontPath);

function fontForChar(char) {
  if (/[\u0400-\u04FF]/u.test(char)) return cyrillicFont;
  return latinFont;
}

function charWidth(char, size = fontSize) {
  if (char === ' ') {
    return latinFont.getMetrics('n', { x: 0, y: baseline, fontSize: size }).width * 0.52;
  }

  return fontForChar(char).getMetrics(char, { x: 0, y: baseline, fontSize: size }).width;
}

function createLetterPaths(text, options) {
  const size = options.fontSize;
  const base = options.baseline;
  const width = options.viewWidth;
  const totalWidth = Array.from(text).reduce((sum, char) => sum + charWidth(char, size), 0);
  let x = (width - totalWidth) / 2;
  const letters = [];

  Array.from(text).forEach((char, index) => {
    const charSize = charWidth(char, size);

    if (char !== ' ') {
      const font = fontForChar(char);
      letters.push({
        char,
        index,
        d: font.getD(char, { x, y: base, fontSize: size })
      });
    }

    x += charSize;
  });

  return letters;
}

const letters = createLetterPaths(motto, { fontSize, baseline, viewWidth });
const heroWordFontSize = 54;
const heroWordViewWidth = Math.ceil(Array.from(heroWord).reduce((sum, char) => sum + charWidth(char, heroWordFontSize), 0) + 28);
const heroWordViewHeight = 76;
const heroWordBaseline = 56;
const heroWordLetters = createLetterPaths(heroWord, {
  fontSize: heroWordFontSize,
  baseline: heroWordBaseline,
  viewWidth: heroWordViewWidth
});

const source = `export const mottoText = ${JSON.stringify(motto)};\n\n` +
  `export const mottoViewBox = "0 0 ${viewWidth} ${viewHeight}";\n\n` +
  `export const mottoLetters = ${JSON.stringify(letters, null, 2)};\n\n` +
  `export const heroWordText = ${JSON.stringify(heroWord)};\n\n` +
  `export const heroWordViewBox = "0 0 ${heroWordViewWidth} ${heroWordViewHeight}";\n\n` +
  `export const heroWordLetters = ${JSON.stringify(heroWordLetters, null, 2)};\n`;

await writeFile(outputPath, source, 'utf8');
