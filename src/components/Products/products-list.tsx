'use client'

import { useProductsList } from '@/api/get_data'
import useDetectScrolledToBottom from '@/hooks/detect-scroll-to-bottom'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useEffect, useRef } from 'react'
import ProductImage from '@/components/Products/ProductList/product-image'
import { Icon } from '@iconify/react';
import ProductInformation from './ProductList/product-inform'

export default function ProductList() {
    const [parent] = useAutoAnimate()
    const { products, error, isLoading, currentPage, setCurrentPage, isEnd } = useProductsList()

    const list = useRef(null)
    const isBottom = useDetectScrolledToBottom(list, isEnd)

    useEffect(() => {
        isBottom && !isLoading && !isEnd && setCurrentPage(currentPage + 1)
    }, [isBottom])

    return (
        <div ref={list} className='overflow-auto h-full pr-2'>
            <div ref={parent} className='grid grid-cols-4 gap-4 py-6'>
                {!error ? products?.map((product) => {
                    return <div key={product.id} className="card w-full h-full min-h-96 overflow-hidden shadow-xl group image-full">
                        <ProductImage url={product.thumbnail} title={product.title} />
                        <ProductInformation title={product.title} id={product.id} description={product.description} category={product.category} price={product.price} />
                    </div>
                }) :
                    <div role="alert" className="alert alert-error">
                        <Icon icon="ic:baseline-error" className='h-6 w-6' />
                        <span>Error! Something wrong!</span>
                    </div>
                }
            </div>
            {
                isLoading && <div>
                    <span className="loading loading-ball loading-lg"></span>
                    <span className="loading loading-ball loading-lg"></span>
                    <span className="loading loading-ball loading-lg"></span>
                </div>
            }
            {
                (isEnd) &&
                <div className='py-2 text-ghost font-bold text-xl flex gap-2 items-center justify-center'><Icon icon="ic:baseline-info" className='h-6 w-6' /> <span>No More To Load</span></div>
            }
        </div>
    )
}

