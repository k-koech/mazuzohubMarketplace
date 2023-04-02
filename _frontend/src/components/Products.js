import Spinner from "./_child/Spinner"
import Error from "./_child/Error"
import Fetcher from "@/lib/Fetcher"
import Link from "next/link"
import config from "../../config.json"
import ReactPaginate from 'react-paginate';
import { useState } from "react"
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai"


// {initialData}
export default function Products({posts}) {

  const { data, isLoading, isError } = Fetcher('/products')

    console.log("products home ", posts )
    console.log("yis ", config.SERVER_URL+"/products")


  // Pagination
    const [itemsPerPage, setItemsPerPage] = useState(32)
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const products = data && data.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data && data.length / itemsPerPage);
    // Invoke when user click to request another page.


    const handlePageClick = (event) => 
    {
      const newOffset = (event.selected * itemsPerPage) % (data && data.length);
      setItemOffset(newOffset);
    };

    if(isLoading) return <Spinner/>
    if(isError) return <Error />

  return (
    <>
    <div className="bg-white mt-10 columns-2 md:columns-4 gap-4 space-y-8 p-8 min-h-[70vh] bgreen-900">
        {
        products && products.map((product)=>(
        <div key={product.id} className="overflow-auto shadow-lg h-min w-full">
            <div className="relative">
              <img className="object-cover" src={config.IMAGES_URL+product.image} alt="subway" />
              <div className="absolute bottom-0 left-0 hover:cursor-pointer m-2">
               {/* <AiOutlineHeart size={30}/> */}
               <AiFillHeart size={30}/>
              </div>
            </div>
            <div className="p-3 h-min rounded-lg bg-white">
              <Link href={`products/${product.id}`}>
                <h6 className="font-semibold text-sm md:text-lg">{product.title}</h6>
                <p className="text-xs sm:text-lg">Ksh. {product.price}</p>
              </Link>
            </div>
        </div>
        ))
        } 
    </div>
    <div className="flex justify-center items-center whitespace-nowrap overflow-auto">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            className="flex gap-4 py-4"
          /> 
    </div>
  
</>
  )
}


