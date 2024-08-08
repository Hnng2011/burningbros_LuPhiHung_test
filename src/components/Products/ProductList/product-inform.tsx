type ProductInformation = Omit<Product, 'thumbnail'>;

export default function ProductInformation({ title, description, category, price }: ProductInformation) {
    return (
        <div className="card-body justify-between gap-6 opacity-100 duration-300">
            <h2 className="card-title text-accent group-hover:opacity-0 ">{title}</h2>
            <p className='line-clamp-3 flex-grow-0 group-hover:opacity-0 '>{description}</p>
            <span className="badge badge-accent group-hover:opacity-0 ">{category}</span>
            <p className='text-accent font-bold text-xl text-end group-hover:opacity-0 '>${price}</p>
            <div className="card-actions justify-end">
                <button className='btn btn-ghost'>View Detail</button>
                <button className="btn btn-primary">Buy Now</button>
            </div >
        </div >
    )
}