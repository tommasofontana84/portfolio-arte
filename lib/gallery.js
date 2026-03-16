import fs from 'fs';
import path from 'path';

export function getGalleryData() {
  const artDirectory = path.join(process.cwd(), 'public/art');
  const categories = fs.readdirSync(artDirectory).filter(c => !c.startsWith('.'));

  const allArtworks = categories.flatMap((category) => {
    const categoryPath = path.join(artDirectory, category);
    const artworkFolders = fs.readdirSync(categoryPath).filter(f => !f.startsWith('.'));

    return artworkFolders.map((artworkTitle) => {
      const artworkPath = path.join(categoryPath, artworkTitle);
      const images = fs.readdirSync(artworkPath)
        .filter(file => !file.startsWith('.'))
        .map(file => `/art/${category}/${artworkTitle}/${file}`);

      return {
        title: artworkTitle.replace(/_/g, " "),
        category: category,
        cover: images[0], // Prende la prima immagine come copertina
        details: images // Tutte le immagini per la galleria interna
      };
    });
  });

  return { allArtworks, categories };
}
