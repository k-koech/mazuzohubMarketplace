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


export default function Id() 
{
  SwiperCore.use([Autoplay])

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
      <div className="flex flex-wrap gap-4 md:flex-nowrap">
        <div className="container mx-auto w-full md:w-2/3 border rounded-lg">
          
        <div className="grid gap-4 bg-white">
          
            <Swiper
              slidesPerView={1}
              autoplay={{delay:2000}}
              loop={true}
            >
              <SwiperSlide >
                <MainSlider />
                {/* <h1>kkk</h1> */}
              </SwiperSlide>
            </Swiper>

            <div className="h-[50vh] overflow-hidden">
                {/* <Image src={product && config.IMAGES_URL+product.image || ""} height={400}  width={1000} quality={100} alt="product" /> */}
                <Image src={product && config.IMAGES_URL+product.image || ""} alt="" title=""  width="0" height="0" sizes="100vw" className="h-auto w-auto max-h-full max-h-full" />
            </div>

            <div className="grid grid-cols-5 gap-4 h-[15vh] bg-green-300">
                <div className="h-[15vh]">
                    <img className="h-full w-auto rounded-lg" src="http://127.0.0.1:8000/files/products/2023%3A03%3A25/img4.png" alt="" />
                </div>
                <div className="h-[15vh]">
                    <img className="h-full w-auto rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt="" />
                </div>
                <div className="h-[15vh]">
                    <img className="h-full w-auto rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt="" />
                </div>
                <div className="h-[15vh]">
                    <img className="h-full w-auto rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" alt="" />
                </div>
                <div className="h-[15vh]">
                    <img className="h-full w-auto rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" alt="" />
                </div>
            </div>
        </div>

          
          
          <div className="p-4 bg-red-300">
            <h4>{product && product.title}</h4>
            <h6>Ksh. {product && product.price}</h6>
          </div>
        </div>

        <div className="shadow-lg bg-white rounded-xl py-8 px-2 bordered w-full md:w-1/3">
           <div>
            Report ad
           </div>
          <div className="border rounded-lg p-3 flex items-center space-x-4">
              <img className="w-10 h-10 rounded-full" src="/images/defaultProfile.png" alt="" />
              <div className="dark:text-white">
                  <div>{product && product.user.username}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Joined in {product && product.user.created_at}</div>
              </div>
          </div>

        </div>
      </div>
      
  )
}


function MainSlider()
{
  return (
    <h1 className="font-bold text-xxl bg-red-600">Slide</h1>
  )
}


