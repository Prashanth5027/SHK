import './foot.css'

function InfoSection() {
  return (
    <section className='foot-container'>
      <div className='foot-card'>
        <div className="tip">
          <div className='icon'><i className="ri-refresh-line"></i></div>
          <div>Obsessively Curated</div>
        </div>
        <p>Shop the new luxury featuring the best of the best in Design, Style, and Art.</p>
      </div>

      <div className='foot-card'>
        <div className="tip">
          <div className='icon'><i className="ri-checkbox-circle-line"></i></div>
          <div>Sellers You Can Trust</div>
        </div>
        <p>Access our exclusive community of trusted sellers, hand-picked by our team.</p>
      </div>

      <div className='foot-card'>
        <div className="tip">
          <div className='icon'><i className="ri-inbox-unarchive-line"></i></div>
          <div>Shipping Tailored to You</div>
        </div>
        <p>We take extra care with your orders with custom shipping options and premium, white glove service offerings.</p>
      </div>
    </section>
  );
}

export default InfoSection