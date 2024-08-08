'use client'

import { useSearchStore } from "@/store/filter";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function ProductSearch() {
    const { setSearch, search } = useSearchStore((state) => ({ setSearch: state.setSearchQuery, search: state.searchQuery }));
    const [searchInput, setSearchInput] = useState<string>(search || "");
    const [debounceSearch] = useDebounce(searchInput, 1500);

    useEffect(() => {
        if (debounceSearch !== undefined) {
            setSearch(debounceSearch);
        }
    }, [debounceSearch]);

    useEffect(() => {
        if (search === undefined || search === "") {
            setSearchInput("");
        } else {
            setSearchInput(search);
        }
    }, [search]);

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };

    const handleClearClick = () => {
        setSearchInput("");
        setSearch("");
    };

    return (
        <div className="flex gap-2">
            <label className="input input-bordered flex items-center gap-2 flex-grow w-1/2">
                <input
                    value={searchInput}
                    onChange={handleSearchInputChange}
                    type="text"
                    className="grow"
                    placeholder="Search"
                />
                <Icon icon="ic:baseline-search" className='h-6 w-6' />
            </label>

            <button onClick={handleClearClick} className="btn btn-error">Clear Search</button>
        </div>
    );
}
