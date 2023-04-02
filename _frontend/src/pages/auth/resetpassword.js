import { AuthContext } from "@/context/AuthContext";
import Layout from "@/layout/Layout"
import Link from "next/link";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

export default function Resetpassword() 
{
  const [email, setEmail] = useState()
  const { sendPassword } = useContext(AuthContext);

  const handleSubmit = e => 
  {    
    e.preventDefault();
    sendPassword(email)
    setEmail("")

  };
  return (
        <section className="flex items-center justify-center  min-h-[70vh] h-full">
          <div className="bg-white shadow-lg rounded-lg px-5 py-8 w-full sm:w-2/3 lg:w-1/3" > 
            <h1 className="font-bold text-lg text-center my-4">Reset Password</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" name="email" value={email || ""} onChange={(e)=>setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" placeholder="kk@kkmarketplace.com" required />
              </div>
              
              <div className="text-right">
                  <button type="submit" className="px-5 py-2 w-full sm:w-auto text-sm font-medium text-center text-white bg-sky-700 rounded-lg hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">
                    Send Password
                  </button>
              </div>
              <div className="ml-2 my-5 text-sm text-center font-medium text-gray-900 dark:text-gray-300">
                <Link className="hover:text-sky-700" href="/auth/login">Login</Link>
              </div>
              
            </form>
            </div>
        </section>
  )
}
