import './caro.css';

function Caro() {
  return (
    <>
      <section>
        <h3>Our Collections</h3>
        <div className="caro">
          <div className='img-container'>
            <img src="./img/caro/mens.jpg" alt="Men's Collection" />
            <div>
              <p>
                Explore stylish and comfortable menswear designed for everyday elegance.
              </p>
            </div>
          </div>
          <div className='img-container'>
            <img src="./img/caro/womens.jpg" alt="Women's Collection" />
            <div>
              <p>
                Discover fashion-forward outfits perfect for every occasion and mood.
              </p>
            </div>
          </div>
          <div className='img-container'>
            <img src="./img/caro/kids.jpg" alt="Kids' Collection" />
            <div>
              <p>
                Bright, playful, and cozy styles for your little ones to shine.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Caro;
