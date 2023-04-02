import Add from '@/components/AddProduct'


function sell() {
  return (
    <>
    <div className='grid grid-cols-1 sm:grid-cols-2 min-h-[70vh]'>
      <div class="flex justify-center items-center hidden sm:flex">
         <img className="object-cover" src="/images/sale.png" alt="image loading..." />
      </div>        
      <div className='bg-white rounded-lg'>
          <Add />
      </div>
        
    </div>
    </>
  )
}

export default sell