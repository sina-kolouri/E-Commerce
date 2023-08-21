import "./Product.css";
import { useState, useEffect } from "react";
import FakeStoreApi from "../../Services/fake-store-api";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCart } from "../../Context/Cart";

const Product = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState();
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const product = await FakeStoreApi.fetchProductById(productId);
        setProduct(product);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center loader">
          <div className="spinner-grow" role="status" />
        </div>
      ) : error ? (
        <div className="text-center mt-5">
          <strong>
            product not found. Please visit{" "}
            <Link to="/" replace>
              home
            </Link>{" "}
            to see all available products.
          </strong>
        </div>
      ) : (
        <div className="total">
          <div className="container-wrap">
            <div className="card shadow m-5">
              <div className="row g-0">
                <div className="col-md-4 p-3 img-div">
                  <img
                    src={product.image}
                    className="img-fluid rounded-start img-single-card"
                    alt={product.title}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title mb-3">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                    <div className="mb-2">
                      <span>Category : {product.category}</span>
                    </div>
                    <div className="mb-2">
                      <span>Rate : {product.rating.rate}</span>
                    </div>
                    <div className="mb-2">
                      <span>Available Count : {product.rating.count}</span>
                    </div>
                    <div className="card-footer mt-5">
                      <strong>
                        <span> ${product.price}</span>
                      </strong>
                      <div className="container-iconBye">
                        <i
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          className="bi bi-cart4 iconBye"
                          onClick={() => addToCart(product)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          <button type="button" className="btn btn-dark" onClick={()=>navigate(-1)}>Back</button>
            </div>
          </div>
        </div>
        

      )}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-3" id="exampleModalLabel">
                congratulations
              </h1>
            </div>
            <div className="modal-body">Successfully added to cart</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
