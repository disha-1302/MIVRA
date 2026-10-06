import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="store-footer">
    <Container>
      <div className="footer-grid">
        <div>
          <Link to="/" className="footer-brand">MIVRA<span className="brand-dot">.</span></Link>
          <p className="footer-tagline">Things you'll actually want — electronics and lifestyle essentials, edited down to the good stuff.</p>
          <small>A MERN storefront portfolio project.</small>
        </div>
        <div>
          <h2>Explore</h2>
          <Link to="/products">All products</Link>
          <Link to="/products?sort=newest">Just landed</Link>
          <Link to="/cart">Your cart</Link>
          <Link to="/profile">Your account</Link>
        </div>
        <div>
          <h2>Checkout with confidence</h2>
          <p>Payments powered by Razorpay. Available methods are shown at checkout.</p>
          <Link to="/profile">View your order status</Link>
        </div>
        <div>
          <h2>Behind the store</h2>
          <a href="https://github.com/kirankumarjmeshram/Ecommerce-App">Explore the project ↗</a>
          <p>Built with React and Node.js.</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} MIVRA</span>
        <span>Cream, charcoal &amp; a little cyan.</span>
        <span>Made for everyday discovery.</span>
      </div>
    </Container>
  </footer>
);
export default Footer;
