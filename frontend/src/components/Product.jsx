import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import formatCurrency from '../utils/formatCurrency';

const Product = ({ product, featured = false }) => (
  <Card className={`product-card h-100${featured ? ' product-card--featured' : ''}`}>
    <Link className="product-image" to={`/product/${product._id}`} aria-label={`View ${product.name}`}>
      <img src={product.image} alt={product.name} loading="lazy" />
    </Link>
    <Card.Body>
      <p className="eyebrow">{product.brand || product.category}</p>
      <Link className="product-title" to={`/product/${product._id}`}>{product.name}</Link>
      <Rating value={product.rating} text={`${product.numReviews} reviews`} />
      <div className="product-price-row">
        <strong>{formatCurrency(product.price)}</strong>
        <span className={product.countInStock > 0 ? 'stock-label' : 'text-muted'}>{product.countInStock > 0 ? 'In stock' : 'Out of stock'}</span>
      </div>
    </Card.Body>
  </Card>
);
export default Product;
