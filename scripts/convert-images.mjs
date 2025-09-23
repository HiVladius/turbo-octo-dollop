import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const assetsDir = path.join(process.cwd(), 'src/assets');

async function findImages(dir) {
  let images = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      images = images.concat(await findImages(fullPath));
    } else if (entry.isFile() && /\.(jpe?g|png)$/i.test(entry.name)) {
      images.push(fullPath);
    }
  }
  return images;
}

async function convertImages() {
  console.log('Buscando imágenes para convertir a WebP...');
  const images = await findImages(assetsDir);
  let convertedCount = 0;

  for (const imagePath of images) {
    const webpPath = imagePath.replace(/\.(jpe?g|png)$/i, '.webp');
    try {
      await fs.access(webpPath);
      // console.log(`El archivo ${path.basename(webpPath)} ya existe. Saltando.`);
    } catch {
      try {
        await sharp(imagePath)
          .webp({ quality: 80 })
          .toFile(webpPath);
        console.log(`\x1b[32m✓ Convertido:[0m ${path.basename(imagePath)} -> ${path.basename(webpPath)}`);
        convertedCount++;
      } catch (err) {
        console.error(`Error convirtiendo ${path.basename(imagePath)}:`, err);
      }
    }
  }

  if (convertedCount > 0) {
    console.log(`\n${convertedCount} imágenes nuevas convertidas a .webp.`);
  } else {
    console.log('\nTodas las imágenes ya estaban optimizadas a .webp.');
  }
}

convertImages();
