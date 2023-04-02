import Image from "next/image"

export default function Error() 
{
  return (
    <div className='flex flex-col items-center justify-center py-10 min-h-[20vh]'>
        <h1 className='text-3xl font-bold text-orange-600 py-10'>Something went wrong</h1>
        <Image src={"/images/not_found.png"} alt="Loading.." width={400} height={400} />
    </div>
  )
}
