import { useRouter } from "next/router"
import config from "../../config.json"
import useSWR from "swr"

const response = (...args) => fetch(...args).then(res => res.json())
export default function GetProduct(id)
{
    const {push} = useRouter()
    let {data, error} = useSWR(`${config.SERVER_URL}/products`, response)
    
    if(id){
        const product = data && data.find(value => value.id == id)

        return {
            product,
            isLoading: !error && !data,
            isError: error
        }
    }
    else{
            return push("/")
    }
 
}


