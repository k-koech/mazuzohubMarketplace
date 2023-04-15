import { AuthContext } from '@/context/AuthContext';
import { ProductContext } from '@/context/ProductContext';
import Image from 'next/image';
import { useState } from 'react'
import { useContext } from 'react';


function Add() 
{
    const {addProduct} = useContext(ProductContext);

    const { authTokens} = useContext(AuthContext);
    console.log("authToken s ", authTokens)

    const [title, setTitle] = useState();
    const [region, setRegion] = useState();
    const [color, setColor] = useState();
    const [price, setPrice] = useState();
    const [file, setFile] = useState();
    const [description, setDescription] = useState();
    const [displayFile, setDisplayFile] = useState();
     
    console.log("FIIILES ", file)
    const handleSubmit = e => 
    {    
  
      e.preventDefault();

      let formData = new FormData()
      formData.append("title", title);
      formData.append("color", color);
      formData.append("region", region);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", file);

      addProduct(formData);

      setTitle(""); setFile();  setDescription("");
    };
     

  return (
    <div className="containder-fluid mx-auto min-h-[70vh]">
    <h2 className='text-2xl font-bold mx-3 mt-10 text-center'>Sell Product</h2>
   
    <div className="h-fit px-5 font-sans">
            <form onSubmit={handleSubmit}  className='w-full shadow rounded-lg p-4'>                 
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                    <input type="text" value={title || ""}  onChange={(e) => setTitle(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" required />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Region</label>
                    <input type="text" value={region || ""}  onChange={(e) => setRegion(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Region" required />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Color</label>
                    <input type="text" value={color || ""}  onChange={(e) => setColor(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Color" required />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                    <input type="number" value={price || ""}  onChange={(e) => setPrice(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Price" required />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
                    <hr/>
                    <div className='flex'>
                      <Image width={10} height={10} className="h-16 object-cover" src={displayFile || ""  } alt="" />
                      <div className='flex items-center mx-5 p-3 bg-gray-100'>
                          <input type="file"  onChange={(e) => {setFile(e.target.files[0]); setDisplayFile(URL.createObjectURL(e.target.files[0])); }} className="rounded "/>
                      </div>
                    </div>
                </div>           
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <textarea value={description || ""}  onChange={(e) => setDescription(e.target.value)} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Product description..." required></textarea>
                </div>
                <div className='text-right'>
                  <button disabled={!authTokens} type="submit" className="text-white bg-sky-700 hover:red-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Save Item
                  </button>  
                </div>          

            </form>

    </div> 
    
    </div>
  )
}

export default Add
