import './App.css';
import { Route, Routes, useNavigate, createSearchParams,useSearchParams } from 'react-router-dom'
import Cart from './Pages/Cart';
import NotFound from "./Pages/not-found";
import Product from "./Pages/Product";
import Products from "./Pages/Products";
import NavBar from "./Components/navbar";
import { useCart } from './Context/Cart';
import ScrollToTop from "react-scroll-to-top";


function App() {
  const { cartItemCount } = useCart();
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const prevSearchQuery = query.get("q");
  const prevCategoryQuery = query.get("cat");

  const onSearch = (searchQuery) => {
    if (prevCategoryQuery) {
    navigate(`/?${createSearchParams({ cat: prevCategoryQuery })}&${createSearchParams({ q: searchQuery })}`)
    } else {
      navigate(`/?${createSearchParams({ q: searchQuery })}`)  
    }
  }
  const onCategory = (categoryQuery) => {
    if (prevSearchQuery) {
    navigate(`/?${createSearchParams({ q: prevSearchQuery })}&${createSearchParams({ cat: categoryQuery })}`)
    } else {
      navigate(`/?${createSearchParams({ cat: categoryQuery })}`)  
    }
  }

  return (
    <>
      <NavBar onSearch={onSearch} onCategory={onCategory} cartItemCount={cartItemCount()} />
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/products/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='*' element={<NotFound />} />
      </Routes >
      <ScrollToTop className="scroll" top={300} color="white" smooth />
    </>
  )
}
export default App;