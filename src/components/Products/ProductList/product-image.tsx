import Image from 'next/image';
import { useState } from 'react';
import Dummy from "@/assets/dummy.png"


const ProductImage = ({ url, title }: { url: string, title: string }) => {
    const [loaded, setLoaded] = useState<boolean>(false)

    return (
        <figure className='rounded-none relative'>
            {
                !loaded && <Image src={Dummy} fill alt='placeholder' />
            }
            <Image
                width={300}
                height={300}
                className={`w-full h-full opacity-10 group-hover:opacity-100 z-20 duration-300`}
                src={url}
                alt={title}
                onLoad={() => setLoaded(true)}
            />
        </figure>
    );
};

export default ProductImage;
