import { products } from '../../data/products';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './grid.css';

function ForYouGrid() {
  const { index } = useParams(); 
  const activeProductId = index !== undefined ? products[index]?.id : null;

  const [visibleProducts, setVisibleProducts] = useState([]);
  const [loadedImages, setLoadedImages] = useState({}); // track which images loaded

  // Shuffle once on mount
  useEffect(() => {
    const shuffled = [...products];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setVisibleProducts(shuffled);
  }, []);

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section>
      <h3>For You <i className="ri-arrow-right-up-line"></i></h3>
      <div className='grid-wrapper'>
        <div className="grid-container">
          {visibleProducts
            .filter((p) => p.id !== activeProductId)
            .map((product) => (
              <div key={product.id} className='card'>
                <Link to={`/product/${products.findIndex(p => p.id === product.id)}`}>
                  {/* Skeleton */}
                  {!loadedImages[product.id] && <div className="skeleton"></div>}
                  <img 
                    src={product.src} 
                    alt={product.name} 
                    style={{ display: loadedImages[product.id] ? 'block' : 'none' }}
                    onLoad={() => handleImageLoad(product.id)}
                  />
                </Link>
                <div className='info'>
                  <Link to={`/product/${products.findIndex(p => p.id === product.id)}`}>
                    <div>
                      <p className='name'>{product.name}</p>
                      <p className='price'>{product.price}</p>
                    </div>
                  </Link>
                </div>
              </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ForYouGrid;
