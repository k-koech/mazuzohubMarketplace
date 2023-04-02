import { createContext,useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import config from "../../config.json";
import { useRouter } from "next/router";
import {toast} from "react-toastify"
import Swal from "sweetalert2";

export const AuthContext = createContext();
const  SERVER_URL = config.SERVER_URL;

export const AuthProvider = ({ children }) => 
{
    const router = useRouter();
    
    const [onDataChange, setOnDataChange]=useState();
    const [usersData, setUsersData]  = useState();

  
    const [authenticatedUser, setAuthenticatedUser]  = useState(null);

    // const [tokenUser, setTokenUser] = useState()
        // () => sessionStorage.getItem("authTokens")? jwt_decode(sessionStorage.getItem("authTokens")): null );
    const [authTokens, setAuthTokens] = useState(() => (typeof window !== 'undefined') && sessionStorage.getItem("authTokens")? JSON.parse(sessionStorage.getItem("authTokens")): null );
    const accessToken = authTokens && jwt_decode(authTokens.access)

    const [loading, setLoading] = useState(true);

    // Send Message from unauthenticated users
     const userMessage = (subject,message, email, name) => {
      toast.loading("Please wait as you message is being processed!")
      fetch(`${SERVER_URL}/sendemail`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          subject,message, email, name
        })
        })
        .then((res)=> res.json())
        .then((response)=>{
          if (response.success) {
              toast.dismiss();
              toast.success("Message sent successfully!!");
              setOnDataChange(!onDataChange);
          }

          else if(response.error){
            toast.dismiss();
            toast.error(response.error)
          } 
   
          else {
            toast.dismiss();
            toast.error("Something went wrong!");
          }
        })
      }

      // USER REGISTRATION
      const register = (username,email, password) => {
        toast.loading("Creating user! Please wait!")
        fetch(`${SERVER_URL}/users/adduser`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              username,email, password
          })
          })
          .then((res)=> res.json())
          .then((response)=>{

            if (response.success) {
                toast.dismiss();
                toast.success("Saved Successfuly!! Confirm your email!");
                router.push("/auth/login");
                setOnDataChange(!onDataChange);
            }
            else if(response.email_error){
              toast.dismiss();
              toast.error(response.email_error)
            } 
            else if(response.username_error){
              toast.dismiss();
              toast.error(response.username_error)
            } 
            else if(response.error){
              toast.dismiss();
              toast.error(response.error)
            } 
            else if(response.detail)
            {
              toast.dismiss();
              setTimeout(() =>  toast.warning("Session expired!"), 1000)           
              logout()
            }
            else {
              toast.dismiss();
              toast.error("Something went wrong!");
            }
          })
        }
    
    // LOGIN USER
    const login = async (email, password) => {
      toast.loading("Logging you in!")
        const response = await fetch(`${SERVER_URL}/token/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email,password })
        });
        const data = await response.json();

        if (response.status === 200) 
        {
          
            toast.dismiss();
            setAuthTokens(data);
            sessionStorage.setItem("authTokens", JSON.stringify(data));
            setOnDataChange(!onDataChange);

            router.push("/");
            setTimeout(() =>  Swal.fire({'icon':'success','timer':3000,'text':'Loggedin Successfully!',"confirmButtonColor": '#088F8F',
            'title':"Success", }), 800)    
        } 
        
        else
        {
          toast.dismiss();
          toast.error("Wrong Password!")
        }

       
    };

   // Delete User
   const deleteUser = (id) => {
        fetch(`${SERVER_URL}/users/${id}`, {
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
            } 
            else if(response.error)
            {
              toast.error(response.error)
            }
            else if(response.detail)
            {
              setTimeout(() =>  toast.warning("Session expired!"), 1000)           
              logout()
            }
            else
            {
              toast.error("Something went wrong!")
            }
        })
        
      };


    // RESET PASSWORD USER
    const sendPassword = (email) => {
      toast.loading("Loading!")

      fetch(`${SERVER_URL}/users/sendpassword`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
        },
      body: JSON.stringify({email})
      })
      .then((response)=> response.json() )
      .then((response)=>{
           if(response.success) 
            {
              toast.dismiss();
              router.push("/admin");
              toast.success(response.success)
            }
            else if(response.email_error) 
            {
              toast.dismiss();
              toast.error(response.email_error)
            }
            else if(response.error) 
            {
              toast.dismiss();
              toast.error(response.error)
            }
            else{
               toast.dismiss();
               toast.error("Something went wrong!!")
            }
        })
      .catch(()=>
        {
          toast.dismiss();
          toast.error("Something went wrong!!")
        })
    }


    // UPDATE PASSWORD from Profile section
    const updatePassword = (oldpassword, newpassword) => {
  
      fetch(`${SERVER_URL}/users/updatepassword`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      body: JSON.stringify({oldpassword, newpassword})
      })
      .then((response)=> response.json() )
      .then((response)=>{
           if(response.success) 
            {              
              setTimeout(() => toast.success(response.success + " Login again to access your account"), 1000);
              logout()   
            }
            else if(response.email_error) 
            {
              toast.error(response.email_error)
            }
            else if(response.password_error) 
            {
              toast.error(response.password_error)
            }
            else if(response.detail)
            {
              setTimeout(() =>  toast.warning("Session expired!"), 1000)           
              logout()
            }
            else{
               toast.error("Something went wrong!!")
            }
        })
      .catch(()=>
        {
          toast.error("Something went wrong!!")
        })
    }

     // UPDATE USERNAME from Profile section
     const updateUsername = (username) => {
  
      fetch(`${SERVER_URL}/user/updateusername`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`
        },
      body: JSON.stringify({username})
      })
      .then((response)=> response.json() )
      .then((response)=>{
           if(response.success) 
            {        
              setOnDataChange(!onDataChange)      
              setTimeout(() => toast.success(response.success), 1000);
            }
            else if(response.error) 
            {
              toast.error(response.error)
            }
            else if(response.detail)
            {
              setTimeout(() =>  toast.warning("Session expired!"), 1000)           
              logout()
            }
            else{
               toast.error("Something went wrong!!")
            }
        })
      .catch(()=>
        {
          toast.error("Something went wrong!!")
        })
    }


    // LOGOUT USER
    const logout = () => 
    {
        setAuthTokens(null);
        // setTokenUser(null);
        setUsersData(null)

        setAuthenticatedUser(null)
        sessionStorage.removeItem("authTokens");
        router.push("/");
    };

    // GET AUTHENTICATED USER
      useEffect(()=>
      {
        if(authTokens)
       {
        fetch(`${SERVER_URL}/users/current_user`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${authTokens.access}`
            }
        })
        .then((response)=> response.json() )
        .then((response)=>{
             if(response.detail) 
              {
                setTimeout(() =>  toast.warning("Session expired!"), 1000)           
                logout();
              }
              else{
                setAuthenticatedUser(response)
              }
          })
        .catch(()=>
          {
            toast("Something went wrong!!")
          })
        }
        
    }, [authTokens,loading,onDataChange])

    
    // GET USERS
    useEffect(()=>{
      if(authTokens)
      {
        fetch(`${SERVER_URL}/users`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${authTokens.access}`
          },
        })
        .then((response)=> response.json())
        .then((data)=>{
            setAuthenticatedUser(data)
        })
      }
      else{
        (()=> logout()());
      }

      setLoading(false);
    }, [onDataChange])

    
    // CONTEXT DATA
    const contextData = 
    {
        // tokenUser,
        // setTokenUser,
        authenticatedUser,
        setAuthenticatedUser,
        usersData,
        deleteUser,
        authTokens,
        setAuthTokens,
        register,
        login,
        sendPassword,
        updatePassword,
        updateUsername,
        logout,

        userMessage 
    };  
    
  

    // useEffect(() => 
    // {
    //   if (authTokens) 
    //   {
    //     setTokenUser(jwt_decode(authTokens.access));
    //   }

    //   setLoading(false);

    // }, [authTokens, loading]);
    


    return (
      <>
      <AuthContext.Provider value={contextData}>
        {loading ? null : children}
      </AuthContext.Provider>
      </>
    )

}