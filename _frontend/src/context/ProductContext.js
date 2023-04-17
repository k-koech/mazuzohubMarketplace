import { useRouter } from "next/router";
import config from "../../config.json";
import { createContext,useState, useEffect, useContext } from "react";
import {toast} from "react-toastify"
import { AuthContext } from "./AuthContext";
export const ProductContext = createContext();
const  SERVER_URL = config.SERVER_URL;


export const ProductProvider = ({ children }) => 
{
  const {logout} = useContext(AuthContext)
  const {push} = useRouter();
  const [onDataChange, setOnDataChange] = useState(true)
  const [loading, setLoading] = useState(false);

  const authTokens = JSON.parse(sessionStorage.getItem("authTokens"));
  const [posts, setPosts] = useState([]);


    // Add Product
    const addProduct = (formData) => {
      fetch(`${SERVER_URL}/products/addproduct`, {
        method: "POST",
        headers: {
            // "Content-Type": "application/json", 
            Authorization: `Bearer ${authTokens.access}`,
        },
        body:formData ,
        })
      .then((r)=> r.json())
      .then((response)=>{

        if (response.success) 
        {
          setOnDataChange(!onDataChange);
          setPosts(response);
          push("/");
        
          toast.success(response.success, { theme: "colored" })
        } 
        else if (response.error) 
        {
          toast.error(response.error, { theme: "colored" })
        }
        else if(response.detail)
        {
          setTimeout(() =>  toast.warning("Session expired!", { theme: "colored" }), 1000) 
          logout()
        }
        else
        {
          toast.error("Something went wrong!", { theme: "colored" })
        }
      })
        
    };

           // Update Product
           const updateProduct = (id, formData) => {
            console.log("data ", formData.title)
            fetch(`${SERVER_URL}/products/update/${id}`, {
              method: "PATCH",
              headers: {
                  Authorization: `Bearer ${authTokens.access}`
              },
              body: formData,
              })
              .then((response)=>response.json())
              .then((response) =>{
                console.log("res ", response)
                if (response.success) 
                {
                  setOnDataChange(!onDataChange);
                  push("/");
                  // window.location.reload(true);
                  toast.success(response.success, { theme: "colored" })
                } 
                
                else if(response.error)
                {
                  toast.error(response.error, { theme: "colored" })
                }
                else if(response.detail)
                {
                  setTimeout(() =>  toast.warning("Session expired!", { theme: "colored" }), 1000) 
                  // logout()
                }
                else{
                  toast.error("Something went wrong!", { theme: "colored" })
        
                }
            })
              
          };
    
        // Get single blog
        // const getSingleBlog = (blog_id) => {
        //   return fetch(`${SERVER_URL}/blogs/${blog_id}`, {
        //     method: 'GET',
        //      headers: {
        //        Accept: 'application/json',
        //      },
        //    })
        //    .then((response)=> response.json())

        //    }


    // Delete Product
    const deleteProduct = (id) => {
      fetch(`${SERVER_URL}/products/${id}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
      }
      })
      .then(response => response.json())
      .then((response) => {
          if(response.success) 
          {
            setOnDataChange(!onDataChange);
            push("/")
            toast.success(response.success, { theme: "colored" })
          } 
          else if(response.error)
          {
            toast.error(response.error, { theme: "colored" })
          }
          else if(response.detail)
          {
            setTimeout(() =>  toast.warning("Session expired!", { theme: "colored" }), 1000) 
            logout()
          }
          else
          {
            toast.error("Something went wrong!", { theme: "colored" })
          }
      })
      
  };

    // GET POSTS
  //  useEffect(()=>{
  //     fetch(`${SERVER_URL}/products`, {
  //       method: 'GET',
  //        headers: {
  //          Accept: 'application/json',
  //        },
  //      })
  //      .then((response)=> response.json())
  //      .then((data)=>{
  //         setPosts(data)
  //     })

  //     setLoading(false);
  //   }, [])
      // setLoading(false);



    // CONTEXT DATA
    const contextData = 
    {
        addProduct,
        // posts,
        updateProduct,
        deleteProduct
    };


    return (
      <ProductContext.Provider value={contextData}>
            {loading ? null : children}
      </ProductContext.Provider>
    )

}