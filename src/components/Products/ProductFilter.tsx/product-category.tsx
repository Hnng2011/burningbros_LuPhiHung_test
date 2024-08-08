'use client'

import { useProductCategories } from "@/api/get_data"
import { useSearchStore } from "@/store/filter";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function ProductCategories() {
    const { categories, error } = useProductCategories()

    const { categorize, sort, setCategorize, setSort } = useSearchStore((state) => ({
        categorize: state.categorize,
        sort: state.sort,
        setCategorize: state.setCategorize,
        setSort: state.setSort,
    }));

    return (
        <div className="flex gap-2">
            <select value={categorize} onChange={(e) => { setCategorize(e.target.value) }} className="select w-full max-w-xs">
                <option disabled value={0}>Categories</option>
                {
                    !error && categories?.map((opt: string, idx: number) => <option value={opt} key={idx}>{opt}</option>
                    )
                }
            </select>

            <select value={sort === 0 ? 0 : sort?.join("-")} onChange={(e) => { setSort(e.target.value?.split("-")) }} className="select w-full max-w-44">
                <option disabled value={0}>Sorting</option>
                <option value="asc-price">Ascending - Price</option>
                <option value="desc-price">Descending - Price</option>
                <option value="asc-title">Ascending - Name</option>
                <option value="desc-title">Descending - Name</option>
            </select>

            {(Boolean(categorize) || Boolean(sort)) &&
                <button onClick={() => { categories ? setCategorize(0) : setSort(0) }} className="btn btn-ghost text-error flex gap-1 items-center">
                    {categorize ? `Category: ${categorize}` : sort ? `Sort: ${sort.join("-")}` : null} <Icon icon="material-symbols:cancel-outline" />
                </button>
            }

        </div>
    )
}

