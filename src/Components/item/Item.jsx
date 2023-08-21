import { Link } from "react-router-dom";
import "./Item.css";

const Item = ({ data, addToCart }) => {
  const { image, id, title, price } = data;
  return (
    <>
      <div className="card-item card m-3 p-3 shadow col-lg-2 col-md-3 col-sm-4 col-xs-6">
        <img src={image} className="card-img-top card-img" alt={title} />
        <div className="card-body">
          <Link to={`/products/${id}`} className="title-link">
            <h6 className="card-title">{title}</h6>
          </Link>
        </div>
        <div className="card-footer">
          <div>
            <span>
              <strong>${price}</strong>
            </span>
          </div>
          <div
            className="container-iconBye"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={addToCart}
          >
            <span>
              <i className="bi bi-cart4 iconBye" />
            </span>
          </div>
        </div>
      </div>
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

export default Item;
