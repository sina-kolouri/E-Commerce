const FakeStoreApi = {
    fetchAllCategories: async () => {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        const result = await res.json();
        return result;
    },
    fetchAllProducts: async () => {
        const res = await fetch("https://fakestoreapi.com/products");
        const result = await res.json();
        return result;
    },
    fetchProductById: async (ProductId) => {
        const res = await fetch(`https://fakestoreapi.com/products/${ProductId}`);
        const result = await res.json();
        return result;
    },
    fetchProductsBySearchQuery: async (query) => {
        const res = await fetch("https://fakestoreapi.com/products");
        const result = await res.json();
        return result.filter(product => product.title.toLowerCase().includes(query.toLowerCase()));
    },
    fetchProductsByCategoryQuery: async (categoryquery) => {
        const res = await fetch(`http://fakestoreapi.com/products/category/${categoryquery}`);
        return await res.json();
    },
    fetchProductsBySearchAndCategoryQuery: async (query, categoryquery) => {
        const res = await fetch(`http://fakestoreapi.com/products/category/${categoryquery}`);
        const result = await res.json();
        return result.filter(product => product.title.toLowerCase().includes(query.toLowerCase()));
    }
}
export default FakeStoreApi;