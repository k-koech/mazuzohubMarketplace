import { AuthProvider } from '@/context/AuthContext';
import Layout from '@/layout/Layout';
import '@/styles/globals.css'
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
// import { AuthCheck } from './authCheck';
import Profile from './profile';
import Login from './auth/login';
import Register from './auth/register';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';
import { ProductProvider } from '@/context/ProductContext';


export default function App({ Component, pageProps }) 
{   
  const router = useRouter()
   console.log("yyy ",Component.name)
   const authTokens = (typeof window !== 'undefined') && sessionStorage.getItem("authTokens")? JSON.parse(sessionStorage.getItem("authTokens")): null;

   console.log(authTokens && authTokens.access)
  // if(authTokens && authTokens.access ){
  //   return router.push("/");
  // }

  return (
    <AuthProvider>
      <ProductProvider>
      {/* <AuthCheck> */}
        <Layout> 
          {/* {
          authTokens && authTokens.access?push("/"):"vvv"
          
          } */}
          <Component {...pageProps} />
        </Layout>
      {/* </AuthCheck> */}
      </ProductProvider>
    </AuthProvider>
  )
}

