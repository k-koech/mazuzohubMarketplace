import config from "../../config.json"

export default async function GetProduct(id){
    const res = await fetch(config.SERVER_URL+"products")
    const products = await res.json()

    if(id){
        return products.find(value => value.title == id)
    }
    console.log(products)

    return products;
}

