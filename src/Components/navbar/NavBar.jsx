import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import "./NavBar.css";
import FakeStoreApi from "../../Services/fake-store-api";

const Navbar = ({ onSearch, onCategory, cartItemCount }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingCat, setLoadingCat] = useState(true);
  const [availableOption, setAvailableOption] = useState([]);

  const ref = useRef();
  const handleSubmit = () => {
    if (searchQuery.trim().length) {
      onSearch(searchQuery.trim());
      setSearchQuery("");
    }
  };

  const handleClickBrand = () => {
    ref.current.value = "All Category";
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCat(true);
      const allCategories = await FakeStoreApi.fetchAllCategories();
      setAvailableOption(allCategories);
      setLoadingCat(false);
    };
    fetchCategories().catch(console.error);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg container-navbar mb-3">
      <div className="container-fluid">
        <Link onClick={handleClickBrand} className="navbar-brand" to="/">
          <h1 className="brand">E-Commerce</h1>
        </Link>
        <select
          disabled={loadingCat}
          ref={ref}
          onChange={(e) => onCategory(e.target.value)}
          className="form-select form-select-sm category"
        >
          <option defaultValue>All Category</option>
          {availableOption.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </select>
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search Products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="btn btn-success"
            type="button"
          >
            Search
          </button>
        </form>
        <div className="iconShop me-3">
          <Link to="/cart" className="position-relative">
            <i className="bi bi-cart4 icon" />
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
              {cartItemCount > 0 && (
                <div>{cartItemCount < 10 ? cartItemCount : "9+"}</div>
              )}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
