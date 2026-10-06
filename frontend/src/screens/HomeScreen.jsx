import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaShoppingBag, FaBoxOpen, FaSearchDollar, FaTags } from 'react-icons/fa';
import Product from '../components/Product';
import { useGetProductsQuery, useGetProductCategoriesQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import ApiError from '../components/ApiError';
import formatCurrency from '../utils/formatCurrency';
import { useState } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';

const TICKER = [
  'Curated electronics & lifestyle',
  'Free shipping over ₹999',
  'Secure checkout with Razorpay',
  'New drops every week',
  '30-day easy returns',
];

const HomeScreen = () => {
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { data, isLoading, error, refetch } = useGetProductsQuery({ limit: 4, sort: 'newest' });
  const { data: categoryData, error: categoryError } = useGetProductCategoriesQuery();
  const products = data?.products || [];
  const featured = products.find((product) => product.countInStock > 0) || products[0];
  const categories = categoryData?.categories || [];
  const totalProducts = data?.totalProducts;

  return (
    <>
      <div className="hero-stage">
        <button className="carousel-toggle" onClick={() => setPaused(!paused)} disabled={reducedMotion}>
          {reducedMotion ? 'Automatic slides disabled for reduced motion' : paused ? 'Play slides' : 'Pause slides'}
        </button>
        <Carousel fade={!reducedMotion} interval={paused || focused || hovered || reducedMotion ? null : 5000} pause={false} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }} className="home-carousel" aria-label="MIVRA highlights">

          <Carousel.Item>
            <section className="hero hero--yellow" aria-labelledby="hero-title">
              <div className="hero-copy">
                <p className="eyebrow">Issue 01 — The MIVRA edit</p>
                <h1 id="hero-title">Good finds.<br />Better <em>everyday</em>.</h1>
                <p>Things you'll actually want. A tightly edited collection of electronics and lifestyle essentials — nothing earns its place on the shelf by accident.</p>
                <div className="hero-actions">
                  <Link to="/products" className="btn btn-primary">Explore the collection <span aria-hidden="true">→</span></Link>
                  <Link to="/products" className="btn btn-light">Browse categories</Link>
                </div>
              </div>
              <div className="hero-panel">
                <span className="hero-index">FEATURE / 01</span>
                {featured ? (
                  <Link to={`/product/${featured._id}`} className="hero-product">
                    <img src={featured.image} alt={featured.name} />
                    <span className="hero-meta">
                      <span>
                        <small>In the collection</small>
                        <strong>{featured.name}</strong>
                      </span>
                      <span className="hero-price">{formatCurrency(featured.price)}</span>
                    </span>
                    <span className="hero-cta">Open product ↗</span>
                  </Link>
                ) : (
                  <div className="hero-placeholder"><FaShoppingBag aria-hidden="true" /><span>Your everyday, upgraded.</span></div>
                )}
              </div>
            </section>
          </Carousel.Item>

          <Carousel.Item>
            <section className="hero hero--cyan" aria-labelledby="hero-title-2">
              <div className="hero-copy">
                <p className="eyebrow eyebrow--cyan">Issue 02 — Made for discovery</p>
                <h2 id="hero-title-2">Find your kind<br />of <em>everyday</em>.</h2>
                <p>Browse by category, filter by price and rating, and narrow the collection down to the one thing you actually came for.</p>
                <div className="hero-actions">
                  <Link className="btn btn-primary" to="/products">Browse categories <span aria-hidden="true">→</span></Link>
                </div>
              </div>
              <div className="hero-panel">
                <span className="hero-index">INDEX / 02</span>
                <div className="hero-placeholder">
                  <FaTags aria-hidden="true" />
                  <p className="hero-statement">{categories.length ? String(categories.length).padStart(2, '0') : '00'}<span>+</span></p>
                  <p className="mono" style={{ fontSize: '.7rem', letterSpacing: '.18em', textTransform: 'uppercase', margin: 0 }}>
                    {categories.length ? `${categories.length} categories live now` : 'Categories loading'}
                  </p>
                </div>
              </div>
            </section>
          </Carousel.Item>

          <Carousel.Item>
            <section className="hero hero--ink" aria-labelledby="hero-title-3">
              <div className="hero-copy">
                <p className="eyebrow">Issue 03 — Checkout with confidence</p>
                <h2 id="hero-title-3">Your next find.<br />A <em>simple</em> checkout.</h2>
                <p>Pay securely through Razorpay. Available payment methods are shown at checkout, and every order stays visible in your account.</p>
                <div className="hero-actions">
                  <Link className="btn btn-primary" to="/products">Start shopping <span aria-hidden="true">→</span></Link>
                </div>
              </div>
              <div className="hero-panel">
                <span className="hero-index">SECURE / 03</span>
                <div className="hero-placeholder">
                  <FaShieldAlt aria-hidden="true" />
                  <p className="hero-statement">RAZOR<span>PAY</span></p>
                </div>
              </div>
            </section>
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[...TICKER, ...TICKER].map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
        </div>
      </div>

      <div className="trust-strip">
        <div><FaShieldAlt aria-hidden="true" /><span><span className="index">01</span><strong>Secure payments</strong><small>Checkout powered by Razorpay</small></span></div>
        <div><FaShoppingBag aria-hidden="true" /><span><span className="index">02</span><strong>A simple checkout</strong><small>From your cart to your order</small></span></div>
        <div><FaBoxOpen aria-hidden="true" /><span><span className="index">03</span><strong>Stay in the loop</strong><small>View order status in your account</small></span></div>
      </div>

      <section className="category-section" aria-labelledby="categories-title">
        <div className="page-heading">
          <div><p className="eyebrow">The index</p><h2 id="categories-title">Shop by category</h2></div>
          <Link to="/products">All categories →</Link>
        </div>
        <div className="category-tiles">
          {categories.map((category, index) => (
            <Link key={category} to={`/products?${new URLSearchParams({ category })}`}>
              <FaSearchDollar aria-hidden="true" />
              <span>{category}</span>
              <span aria-hidden="true">{String(index + 1).padStart(2, '0')} ↗</span>
            </Link>
          ))}
        </div>
        {categoryError && <p className="text-muted mono small">Categories are temporarily unavailable.</p>}
      </section>

      <section id="collection" className="collection" aria-labelledby="collection-title">
        <div className="page-heading">
          <div>
            <p className="eyebrow">Fresh on the shelf</p>
            <h2 id="collection-title">Latest products</h2>
          </div>
          <Link to="/products">View all products →</Link>
        </div>

        {isLoading ? <Loader /> : error ? <ApiError error={error} onRetry={refetch} /> : products.length === 0 ? (
          <div className="empty-state">
            <p className="eyebrow">Empty shelf</p>
            <h3>The collection is on its way</h3>
            <p>Check back soon for available products.</p>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((product, index) => (
              <div className={`grid-cell ${index === 0 ? 'grid-cell--feature' : ''}`} key={product._id}>
                <Product product={product} featured={index === 0} />
              </div>
            ))}
            <aside className="grid-note">
              <div>
                <p className="eyebrow eyebrow--cyan">Editor's note</p>
                <h3>Small catalogue, high standards.</h3>
              </div>
              <p>
                We would rather show you four products we stand behind than four hundred we do not.
                {totalProducts ? ` ${totalProducts} pieces are live in the full collection.` : ''}
              </p>
              <Link className="btn btn-primary" to="/products">See everything <span aria-hidden="true">→</span></Link>
            </aside>
          </div>
        )}
      </section>

      <section className="manifesto" aria-label="How the store works">
        <div>
          <p className="eyebrow">Curated</p>
          <span className="stat">{String(categories.length).padStart(2, '0')}<span>+</span></span>
          <p>Categories in the current edit, from audio gear to home essentials.</p>
        </div>
        <div>
          <p className="eyebrow eyebrow--cyan">Frictionless</p>
          <span className="stat">03<span>.</span></span>
          <p>Steps from cart to confirmed order: sign in, ship, pay.</p>
        </div>
        <div>
          <p className="eyebrow">Always on</p>
          <span className="stat">24<span>/7</span></span>
          <p>Order status stays visible from your account, whenever you look.</p>
        </div>
      </section>

      <section className="cta-band" aria-labelledby="cta-title">
        <div>
          <p className="eyebrow eyebrow--plain" style={{ color: 'var(--ink-80)' }}>Start here</p>
          <h2 id="cta-title">Not sure where to begin?</h2>
          <p>Open the full collection and filter it down by category, price and rating.</p>
        </div>
        <Link className="btn btn-primary" to="/products">Shop the collection <span aria-hidden="true">→</span></Link>
      </section>
    </>
  );
};
export default HomeScreen;
