import "./foot.css";

function CopyrightSection() {
  const year = new Date().getFullYear();

  return (
    <section className="foot-container">
      {/* Company Info */}
      <div className="foot-card">
        <h3>SHK Fabrics</h3>
        <p>123 Textile Street,<br />Tiruppur, Tamil Nadu, India</p>
      </div>

      {/* Contact */}
      <div className="foot-card">
        <h3>Contact</h3>
        <p>📞 +91 98765 43210</p>
        <p>support@shkfabrics.shop</p>
      </div>

      {/* Quick Links */}
      <div className="foot-card">
        <h3>Quick Links</h3>
        <p>About Us</p>
        <p>Products</p>
        <p>Privacy Policy</p>
      </div>

      {/* Social Media */}
      <div className="foot-card">
        <h3>Follow Us</h3>
        <div className="icon">
          <i className="ri-instagram-line"></i>
          <i className="ri-facebook-circle-line"></i>
<a href="https://wa.me/918122821300?text=mudikitu%20dress%20annupuda%20punda."
   target="_blank" rel="noopener noreferrer"><i className="ri-whatsapp-line"></i></a>
        </div>
      </div>

      {/* Copyright */}
      <div className="copyright">
        <i className="ri-copyright-line" /> {year} SHK Fabrics. All rights reserved.
      </div>
    </section>
  );
}

export default CopyrightSection;
1