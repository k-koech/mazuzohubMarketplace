import { useRouter } from "next/router";
import config from "../../config.json";
import { createContext,useState, useEffect, useContext } from "react";
import {toast} from "react-toastify"
import { AuthContext } from "./AuthContext";
export const ProductContext = createContext();
const  SERVER_URL = config.SERVER_URL;


export const ProductProvider = ({ children }) => 
{
  const {logoutUser} = useContext(AuthContext)
  const {push} = useRouter();
  const [onDataChange, setOnDataChange] = useState(true)
  const [loading, setLoading] = useState(true);

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
          logoutUser()
        }
        else
        {
          toast.error("Something went wrong!", { theme: "colored" })
        }
      })
        
    };

           // Update Blog
           const updateBlog = (id, formData) => {
            fetch(`${SERVER_URL}/blogs/${id}`, {
              method: "PATCH",
              headers: {
                  // "Content-Type": "application/json",
                  Authorization: `Bearer ${authTokens.access}`
              },
              body: formData,
              })
              .then((response)=>response.json())
              .then((response) =>{
                if (response.success) 
                {
                  setOnDataChange(!onDataChange);
                  navigate("/admin/blogs");
                  window.location.reload(true);
                  toast.success(response.success, { theme: "colored" })
                } 
                
                else if(response.error)
                {
                  toast.error(response.error, { theme: "colored" })
                }
                else if(response.detail)
                {
                  setTimeout(() =>  toast.warning("Session expired!", { theme: "colored" }), 1000) 
                  logoutUser()
                }
                else{
                  toast.error("Something went wrong!", { theme: "colored" })
        
                }
            })
              
          };
    
        // Get single blog
        const getSingleBlog = (blog_id) => {
          return fetch(`${SERVER_URL}/blogs/${blog_id}`, {
            method: 'GET',
             headers: {
               Accept: 'application/json',
             },
           })
           .then((response)=> response.json())

           }


    // Delete Blog
    const deleteBlog = (id) => {
      fetch(`${SERVER_URL}/blogs/${id}`, {
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
            toast.success(response.success, { theme: "colored" })
          } 
          else if(response.error)
          {
            toast.error(response.error, { theme: "colored" })
          }
          else if(response.detail)
          {
            setTimeout(() =>  toast.warning("Session expired!", { theme: "colored" }), 1000) 
            logoutUser()
          }
          else
          {
            toast.error("Something went wrong!", { theme: "colored" })
          }
      })
      
  };

    // GET POSTS
   useEffect(()=>{
      fetch(`${SERVER_URL}/blogs`, {
        method: 'GET',
         headers: {
           Accept: 'application/json',
         },
       })
       .then((response)=> response.json())
       .then((data)=>{
          setPosts(data)
      })

      setLoading(false);
    }, [onDataChange])



    // CONTEXT DATA
    const contextData = 
    {
        addProduct,
        posts,
        updateBlog,
        getSingleBlog,
        deleteBlog
    };


    return (
      <ProductContext.Provider value={contextData}>
            {loading ? null : children}
      </ProductContext.Provider>
    )

}