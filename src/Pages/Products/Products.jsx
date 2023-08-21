import "./Products.css";
import { useState, useEffect } from "react";
import FakeStoreApi from "../../Services/fake-store-api";
import Item from "../../Components/item";
import { useSearchParams } from "react-router-dom";
import { useCart } from "../../Context/Cart";

const Products = () => {
  const [query] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const searchQuery = query.get("q");
  let categoryQuery = query.get("cat");
  if (categoryQuery === "All Category") {
    categoryQuery = null;
  }
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const products =
        searchQuery && !categoryQuery
          ? await FakeStoreApi.fetchProductsBySearchQuery(searchQuery)
          : categoryQuery && !searchQuery
          ? await FakeStoreApi.fetchProductsByCategoryQuery(categoryQuery)
          : categoryQuery && searchQuery
          ? await FakeStoreApi.fetchProductsBySearchAndCategoryQuery(
              searchQuery,
              categoryQuery
            )
          : await FakeStoreApi.fetchAllProducts();
      setProducts(products);
      setLoading(false);
    };
    fetchProducts().catch(console.error);
  }, [categoryQuery, searchQuery]);

  if (!loading && searchQuery && !products.length) {
    return (
      <div className="text-center mt-5">
        <strong>No products found matching your query.</strong>
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center loader">
          <div className="spinner-grow" role="status" />
        </div>
      ) : (
        <>
          <div className="t">
            <div className="wrapper-card row">
              {products.map((product) => (
                <Item
                  key={product.id}
                  data={product}
                  addToCart={() => addToCart(product)}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Products;
