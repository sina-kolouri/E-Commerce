import "./Cart.css";
import { Link } from "react-router-dom";
import { useCart } from "../../Context/Cart";
import { useNavigate } from "react-router-dom";


const SHIPPING_CHARGE = 25;
const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

  const cartTotal = () => {
    return cart.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  };

  const round = (value, decimals) => {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
  };

  return (
    <>
      {cart.length > 0 ? (
        <div className="container">
          <div className="container-card">
            <h3 className="m-3 order-summary text-center p-2">Order Summary</h3>
            {cart.map((item) => (
              <div className="card card-shop mb-3 shadow" key={item.product.id}>
                <div className="p-2 img-wrap">
                  <img
                    src={item.product.image}
                    className="img-fluid rounded-start img-cart-shop"
                    alt={item.product.title}
                  />
                </div>
                <div className="">
                  <div className="card-body p-4">
                    <div className="title p-3">
                      <Link
                        to={`/products/${item.product.id}`}
                        className="titleLink"
                      >
                        {item.product.title}
                      </Link>
                    </div>
                    <strong>
                      <span className="price-shop ms-1">
                        $ {round(item.product.price * item.quantity, 2)}
                      </span>
                    </strong>
                    <div className="itemControl d-flex justify-content-between mt-2">
                      <div className="left ms-1">
                        <button
                          className="Quantity"
                          onClick={() => increaseQuantity(item.product.id)}
                        >
                          +
                        </button>
                        <span className="m-2">{item.quantity}</span>
                        <button
                          className="Quantity"
                          disabled={item.quantity === 1}
                          onClick={() => decreaseQuantity(item.product.id)}
                        >
                          -
                        </button>
                      </div>
                      <div className="right me-2">
                        <button
                          className="remove p-1"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <small>Remove</small>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="payment text-center shadow mt-2 px-3">
            <h3 className="m-3">Payment Summary</h3>
            <div className="summary">
              <strong>
                <div>
                  <span>Subtotal : </span>
                  <span className="price">$ {round(cartTotal(), 2)}</span>
                </div>
                <div>
                  <span>Shipping Fee : </span>
                  <span className="price">$ {SHIPPING_CHARGE}</span>
                </div>
                <hr />
                <div>
                  <span>Total : </span>
                  <span className="price">
                    $ {round(cartTotal() + SHIPPING_CHARGE, 2)}
                  </span>
                </div>
              </strong>
            </div>
            <div className="d-grid gap-2 mx-auto">
              <button className="btn btn-success" type="button">
              Payment
              </button>
            </div>
            <div className="d-grid gap-2 mx-auto mt-2" onClick={()=>navigate(-1)}>
              <button className="btn btn-dark" type="button">
                Back             
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-5">
          <p>
            <strong>
              <i className="bi bi-exclamation-circle warn-icon">{"  "}</i>
              <span className="text-icon">Cart is empty</span>
            </strong>
          </p>
        </div>
      )}
    </>
  );
};

export default Cart;
