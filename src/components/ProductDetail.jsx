

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchProductDetail();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const goToCart = () => {
    navigate('/cart');
  };

  const goToHome = () => {
    navigate('/');
  };

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading product details.</p>;

  return (
    <div className="product-card-details">
      <h2 className="product-title-details">{product.title}</h2>
      <img className="product-image-details" src={product.thumbnail} alt={product.title} />
      <p className="product-description-details">{product.description}</p>
      <p className="product-price-details">Price: ${product.price}</p>
      <p className="product-stock-details">Stock: {product.availabilityStatus}</p>
      <p className="product-brand-details">Brand: {product.brand}</p>
      <p className="product-sku-details">SKU: {product.sku}</p>
      <p className="product-weight-details">Weight: {product.weight}g</p>
      <p className="product-dimensions-details">
        Dimensions: {product.dimensions.width}x{product.dimensions.height}x{product.dimensions.depth}
      </p>
      <p className="product-warranty-details">Warranty: {product.warrantyInformation}</p>
      <p className="product-shipping-details">Shipping: {product.shippingInformation}</p>

      <button onClick={toggleReviews} className="toggle-reviews-button">
        {showReviews ? 'Hide Reviews' : 'Show Reviews'}
      </button>

      {showReviews && (
        <div className="reviews-section">
          <h3>Reviews:</h3>
          <ul>
            {product.reviews.map((review, index) => (
              <li key={index}>
                <p><strong>{review.reviewerName}</strong> ({review.date.slice(0, 10)}): {review.comment}</p>
                <p>Rating: {review.rating}/5</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="product-actions">
        <button onClick={handleAddToCart}>Add to Cart</button>
        <button onClick={goToCart} style={{ marginLeft: '10px' }}>Go to Cart</button>
        <button onClick={goToHome} style={{ marginLeft: '10px' }}>Back to Home</button>
      </div>
    </div>
  );
};

export default ProductDetail;
