// src/components/Man.jsx
import { products } from '../../data/products';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './man.css';

function Man() {
  // Filter only men category products
  const menProducts = products.filter((p) => p.category === 'men');

  const [visibleProducts, setVisibleProducts] = useState(menProducts);

  const handleProductClick = (productId) => {
    setVisibleProducts((prev) => {
      const index = prev.findIndex((p) => p.id === productId);
      if (index === -1) return prev;

      const clicked = prev[index];
      const remaining = prev.filter((p) => p.id !== productId);

      // put clicked one back at a random later position
      if (remaining.length === 0) return prev;
      const insertPos = Math.floor(Math.random() * (remaining.length - 1)) + 1;
      const newList = [...remaining];
      newList.splice(insertPos, 0, clicked);

      return newList;
    });
  };

  return (
    <section>
      <h3>Men <i className="ri-arrow-right-up-line"></i></h3>
      <div className='grid-wrapper'>
        <div className="grid-container">
          {visibleProducts.map((product, index) => (
            <div key={product.id + '-' + index} className='card'>
              <Link 
                to={`/product/${index}`}
                onClick={() => handleProductClick(product.id)}
              >
                <img src={product.src} alt={product.name} />
              </Link>
              <div className='info'>
                <Link 
                  to={`/product/${index}`}
                  onClick={() => handleProductClick(product.id)}
                >
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

export default Man;
