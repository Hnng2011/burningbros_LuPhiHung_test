import ProductCategories from "./ProductFilter.tsx/product-category";
import ProductSearch from "./ProductFilter.tsx/product-search";

export default function SearchProduct() {
    return (
        <div className="w-full flex flex-col gap-4 mx-auto py-6">
            <ProductSearch />
            <ProductCategories />
        </div>
    )
}