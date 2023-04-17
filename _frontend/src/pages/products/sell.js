import Add from '@/components/AddProduct'
// import Image from 'next/image'
import Image from "next/image"


export default function sell() {
  return (
    <>
    <div className='grid grid-cols-1 sm:grid-cols-2 min-h-[70vh]'>
      <div class="flex justify-center items-center hidden sm:flex">
         <Image width={500} height={500}  src="/images/sale.png" alt="image loading..." />
        
      </div>        
      <div className='bg-white rounded-lg'>
          <Add />
      </div>
        
    </div>
    </>
  )
}

