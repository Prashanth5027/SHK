import './foot.css'


function LocationSection() {
  return (
    <section className='iframe-container'>

      <iframe
        className='loco'
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3884.5570632162044!2d80.18414107604575!3d13.190304210043742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a527ca06318406f%3A0x6172bd3651734ff0!2sSri%20Harikrishna%20Textiles!5e0!3m2!1sen!2sin!4v1754321136996!5m2!1sen!2sin'
        title="Sri Harikrishna Textiles Location"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  );
}

export default LocationSection