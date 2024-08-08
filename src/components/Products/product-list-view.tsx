import ProductFilter from "./product-filter";
import ProductList from "./products-list";

export default function ProductListView() {
    return (
        <div className="container h-screen overflow-hidden flex flex-col">
            <ProductFilter />
            <ProductList />
        </div>)
}