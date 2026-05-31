import { products } from '../../data/products';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './grid.css';

function OurGrid() {
  const [loadedImages, setLoadedImages] = useState({}); // track which images are loaded

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };



  return (
    <section>
      <h3>
        Our Collection <i className="ri-shirt-line"></i>
      </h3>
      <div className='grid-wrapper'>
        <div className="grid-container">
          {products.map((product, index) => (
            <div key={product.id + '-' + index} className='card'>
              <Link to={`/product/${index}`}>
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
                <Link to={`/product/${index}`}>
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

export default OurGrid;
