import { useSearchStore } from '@/store/filter';
import useSWR, { Fetcher } from 'swr';
import useSWRInfinite from 'swr/infinite';

const getCurrentProducts = (pageIndex: number, previousPageData: Products | null, categorize: string | 0, sort: string[] | 0, search: string) => {
    if (previousPageData && !previousPageData.products.length) return null;

    let baseUrl = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/products`;
    const params: Record<string, string> = {};

    if (search.length) {
        baseUrl = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/products/search`;
        params.q = search;
    } else if (categorize !== 0) {
        baseUrl = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/products/category/${categorize}`;
    }

    if (sort !== 0) {
        params.sortBy = sort[1];
        params.order = sort[0];
    }

    if (!search.length && categorize === 0 && sort === 0) {
        params.limit = String(20);
        params.skip = String(pageIndex * 20);
    }

    const queryString = new URLSearchParams(params).toString();
    return `${baseUrl}?${queryString}`;
};


const fetcherInfinite: Fetcher<Products, string> = async (url: string) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response error');
        }
        const data: Products = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error;
    }
};

const fetcherCategories: Fetcher<string[], string> = async (url: string) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response error');
        }
        const data: string[] = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error;
    }
};

export function useProductsList() {
    const { categorize, sort, searh } = useSearchStore((state) => ({ categorize: state.categorize, sort: state.sort, searh: state.searchQuery }))

    const { data, error, size, setSize, isLoading } = useSWRInfinite((pageIndex, previousPageData) => getCurrentProducts(pageIndex, previousPageData, categorize, sort, searh), fetcherInfinite, { revalidateFirstPage: false });

    const products = data ? data.map(page => page.products).flat() : [];
    const isEnd = data && data[data.length - 1]?.products.length < 20 || Boolean(searh);

    return { products, error, isLoading, currentPage: size, setCurrentPage: setSize, isEnd };
}

export function useProductCategories() {
    const url = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/products/category-list`
    const { data, error } = useSWR(url, fetcherCategories, { refreshInterval: 100000 })

    return { categories: data, error }
}