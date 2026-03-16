import { getGalleryData } from '../lib/gallery';
import { useState } from 'react';

export async function getStaticProps() {
  const data = getGalleryData();
  return { props: { data } };
}

export default function Home({ data }) {
  const [filter, setFilter] = useState('Tutti');
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const filteredArt = filter === 'Tutti' 
    ? data.allArtworks 
    : data.allArtworks.filter(item => item.category === filter);

  return (
    <div className="min-h-screen bg-white text-gray-900 p-8 font-sans">
      <header className="text-center mb-20">
        <h1 className="text-5xl font-extralight tracking-[0.2em] uppercase mb-6">MAMMA ART STUDIO</h1>
        <nav className="flex justify-center gap-8 text-xs uppercase tracking-widest text-gray-400">
          <button onClick={() => setFilter('Tutti')} className={filter === 'Tutti' ? 'text-black border-b border-black' : ''}>Tutti</button>
          {data.categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} className={filter === cat ? 'text-black border-b border-black' : ''}>{cat}</button>
          ))}
        </nav>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
        {filteredArt.map((artwork, idx) => (
          <div key={idx} className="group cursor-pointer" onClick={() => setSelectedArtwork(artwork)}>
            <div className="aspect-[4/5] overflow-hidden bg-gray-50 mb-4">
              <img src={artwork.cover} alt={artwork.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <h3 className="text-sm uppercase tracking-wider font-medium">{artwork.title}</h3>
            <p className="text-xs text-gray-400 italic mt-1">{artwork.category}</p>
          </div>
        ))}
      </main>

      {/* Modal per i dettagli (Singulart style) */}
      {selectedArtwork && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto p-10">
          <button onClick={() => setSelectedArtwork(null)} className="fixed top-10 right-10 text-2xl font-light">✕ CHIUDI</button>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-light mb-2">{selectedArtwork.title}</h2>
            <p className="text-gray-400 mb-12 uppercase tracking-tighter">{selectedArtwork.category}</p>
            <div className="space-y-20">
              {selectedArtwork.details.map((img, i) => (
                <img key={i} src={img} className="w-full shadow-sm" alt="Dettaglio" />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
