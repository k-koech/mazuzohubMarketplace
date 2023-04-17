import Layout from "@/layout/Layout";
import GetProduct from "@/lib/Helper";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SwiperCore, {Autoplay} from 'swiper';
import Fetcher from "@/lib/Fetcher";
import { useRouter } from "next/router";
import Spinner from "@/components/_child/Spinner";
import Error from "@/components/_child/Error";
import Image from "next/image"
import config from "../../../config.json"
import { AiFillAlert } from "react-icons/ai";
import {FaTrash} from "react-icons/fa"
import {FiEdit} from "react-icons/fi"
import { useContext } from "react";
import { ProductContext } from "@/context/ProductContext";
import Link from "next/link";


export default function Id() 
{
  SwiperCore.use([Autoplay])
  const {deleteProduct} = useContext(ProductContext)

  const router = useRouter();
  const { id } = router.query;
  let product;
  const { data, isLoading, isError } = Fetcher('/products')
  if(isLoading) return <Spinner/>
  if(isError) return <Error />
  if(id){
    product = data.find(value => value.id == id)
  }

  console.log("Mike j ", product)
  

  return (
    <>
    { product?
      <div className="min-h-[70vh] flex flex-wrap sm:px-14 md:px-12 lg:px-28 gap-4 md:flex-nowrap">
        <div className="container mx-auto w-full md:w-2/3 border rounded-lg">
          
        <div className="grid gap-4 bg-white">
          
            <Swiper
              slidesPerView={1}
              autoplay={{delay:2000}}
              loop={true}
            >
              <SwiperSlide >
                {/* <MainSlider /> */}
                {/* <h1>kkk</h1> */}
              </SwiperSlide>
            </Swiper>

            <div className="h-[50vh] flex items-center overflow-hidden">
                <Image src={`https://marketplace.developerske.com${product && product.image}` || ""} width={400} height={400} className="h-auto w-full " alt="" />
            </div>

            <div className="flex justify-between gap-4 h-[15vh] bg-gray-200">
                <div className="h-[15vh]">
                    <Image className="h-full w-auto rounded-lg" width={500} height={500} src={`https://marketplace.developerske.com${product && product.image}`} alt="" />
                </div>
                <div className="h-[15vh]">
                    <Image className="h-full w-auto rounded-lg" width={500} height={500} src={`https://marketplace.developerske.com${product && product.image}`} alt="" />
                </div>
                <div className="h-[15vh]">
                    <Image className="h-full w-auto rounded-lg" width={500} height={500} src={`https://marketplace.developerske.com${product && product.image}`} alt="" />
                </div>
                <div className="h-[15vh]">
                    <Image className="h-full w-auto rounded-lg" width={500} height={500} src={`https://marketplace.developerske.com${product && product.image}`} alt="" />
                </div>
            </div>
        </div>
          
          <div className="p-4 bgh-red-300">
            <h4 className="text-xl my-3 font-semibold">{product && product.title}</h4>
            <p className="text-gray-500 text-sm my-4">Posted 5 days ago</p>
            <h6>Ksh. {product && product.price}</h6>
          </div>
        </div>

        <div className="shadow-lg bg-white rounded-xl py-8 px-2 bordered w-full md:w-1/3">
           <div className="flex justify-between">
            <span>Report ad</span>
            <Link href={{ pathname: "/products/edit/", query: { id: product && product.id } }} >
              <FiEdit className="text-green-800 hover:cursor-pointer" />
            </Link>
            <FaTrash className="text-red-600 hover:cursor-pointer" onClick={()=>deleteProduct(product && product.id)} />
           </div>
          <div className="my-4 border rounded-lg p-3 flex items-center space-x-4">
              <Image width={10} height={10} className="w-10 h-10 rounded-full" src="/images/defaultProfile.png" alt="" />
              <div className="dark:text-white">
                  <div>{product && product.user.username}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Joined in {product && product.user.date_joined}</div>
              </div>
          </div>

          <button className="my-5 px-5 py-2 w-full text-sm font-medium text-center text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">
                    Show Phone Number
              </button>
          <form className="mt-7" >
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Send message</label>
                <textarea rows="4" name="message" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" required />
              </div>
              <div className="text-right">
                  <button type="submit"  className="px-5 py-2 w-full sm:w-auto text-sm font-medium text-center text-white bg-sky-700 rounded-lg hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">
                    Send
                  </button>
              </div>              
            </form>

            <div>
              <h3 className="flex font-bold my-3">Safety Tips <AiFillAlert/></h3>
              <p>  - Don&apos;t pay in advance, including for delivery</p>
              <p>  - Meet the seller at a safe public place</p>
              <p>  - Inspect the item and ensure it&apos;s exactly what you want</p>
              <p>  - On delivery, check that the item delivered is what was inspected</p>
            </div>

        </div>
      </div>
      :
      <div className="h-[50vh] font-semibold text-2xl flex items-center justify-center">
        Product not found!!
      </div>
    }
   </>   
  )
}


function MainSlider()
{
  return (
    <h1 className="font-bold text-xxl bg-red-600">Slide</h1>
  )
}


