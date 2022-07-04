import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, saveProductReview } from '../actions/productActions';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';

function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productSaveSuccess) {
      alert('Відгук збережено.');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  }, [productSaveSuccess]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
    dispatch(
      saveProductReview(props.match.params.id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };
  const handleAddToCart = () => {
    props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
  };

  return (
    <div>
      <div className="back-to-result">
        <Link to="/">Back to result</Link>
      </div>
      {loading ? (
        <div>Завантаження...</div>
      ) : error ? (
        <div>{error} </div>
      ) : (
        <>
          <div className="details">
            <div className="details-image">
              <img src={product.image} alt="product"></img>
            </div>
            <div className="details-info">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <a href="#reviews">
                    <Rating
                      value={product.rating}
                      text={product.numReviews + ' reviews'}
                    />
                  </a>
                </li>
                <li>
                  Ціна: <b>{product.price} грн.</b>
                </li>
                <li>
                  Опис:
                  <div>{product.description}</div>
                </li>
              </ul>
            </div>
            <div className="details-action">
              <ul>
                <li>Ціна: {product.price}</li>
                <li>
                  Наявність:{' '}
                  {product.countInStock > 0 ? 'У продажі' : 'Немає в наявності.'}
                </li>
                <li>
                  Кількість:{' '}
                  <select
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </li>
                <li>
                  {product.countInStock > 0 && (
                    <button
                      onClick={handleAddToCart}
                      className="button primary"
                    >
                      Додати у Кошик
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div className="content-margined">
            <h2>Відгуки</h2>
            {!product.reviews.length && <div>У цього товару ще немає відгуків!</div>}
            <ul className="review" id="reviews">
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <div>{review.name}</div>
                  <div>
                    <Rating value={review.rating}></Rating>
                  </div>
                  <div>{review.createdAt.substring(0, 10)}</div>
                  <div>{review.comment}</div>
                  <hr
                      style={{
                        height: 1
                      }}
                  />
                </li>
              ))}
              <li>
                <h3>Додати відгук</h3>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <ul className="form-container">
                      <li>
                        <label htmlFor="rating">Оцінка</label>
                        <select
                          name="rating"
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="1">1- Жахливо</option>
                          <option value="2">2- Погано</option>
                          <option value="3">3- Задовільно</option>
                          <option value="4">4- Добре</option>
                          <option value="5">5- Відмінно</option>
                        </select>
                      </li>
                      <li>
                        <label htmlFor="comment">Коментар</label>
                        <textarea
                          name="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </li>
                      <li>
                        <button type="submit" className="button primary">
                          Відправити
                        </button>
                      </li>
                    </ul>
                  </form>
                ) : (
                  <div>
                    Буль-ласка <Link to="/signin">Авторизуйтесь</Link> щоб залишити відгук.
                  </div>
                )}
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
export default ProductScreen;
