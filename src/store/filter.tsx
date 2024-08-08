import { create } from 'zustand'

interface FilterState {
    searchQuery: string;
    categorize: string | 0;
    sort: string[] | 0;
    setSearchQuery: (query?: string) => void;
    setCategorize: (query: string | 0) => void;
    setSort: (query: string[] | 0) => void;
}

export const useSearchStore = create<FilterState>((set) => ({
    searchQuery: "",
    categorize: 0,
    sort: 0,
    setSearchQuery: (query) => set({ searchQuery: query, categorize: 0, sort: 0 }),
    setCategorize: (query) => set({ searchQuery: "", categorize: query, sort: 0 }),
    setSort: (query) => set({
        searchQuery: "", categorize: 0, sort: query === 0 ? 0 : [query[0], query[1]]
    })
}));
