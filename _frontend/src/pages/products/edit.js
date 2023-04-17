import EditProduct from '@/components/EditProduct'
import Image from "next/image"


export default function Edit() 
{
  return (
    <>
    <div className='grid grid-cols-1 sm:grid-cols-2 min-h-[70vh]'>
      <div className="flex justify-center items-center hidden sm:flex">
         <Image width={500} height={500}  src="/images/sale.png" alt="image loading..." />   
      </div>        
      <div className='bg-white rounded-lg'>
          <EditProduct />
      </div>
        
    </div>
    </>
  )
}

