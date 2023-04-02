import { AuthContext } from "@/context/AuthContext";
import Layout from "@/layout/Layout"
import Link from "next/link";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

export default function Register() 
{
  const [formdata, setFormdata] = useState({})

  const { register } = useContext(AuthContext);

  const handleChange = (e) =>
  {
    const name = e.target.name;
    const value = e.target.value;
    setFormdata(values => ({...values, [name]: value}))  
    
  }

  const handleSubmit = e => 
  {    
    e.preventDefault();

    if(formdata.password && formdata.password !== formdata.confirm_pass && formdata.confirm_pass)
    {
      toast.error("Password doesn't match");
    }
    else if(formdata.password!=undefined && formdata.password.length<5)
    {
      toast.error("Password should be atleast 5 characters!")
    }
    else{
    register(formdata.username,formdata.email, formdata.password)
    console.log(formdata)
    setFormdata({})
    }
    
  };
  return (
        <section className="flex items-center justify-center  min-h-[70vh] h-full">
          <div className="bg-white shadow-lg rounded-lg px-5 py-8 w-full sm:w-2/3 lg:w-1/3" > 
            <h1 className="font-bold text-lg text-center my-4">Register</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                <input type="text" name="username" value={formdata.username || ""} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" placeholder="Username" required />
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" name="email" value={formdata.email || ""} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" placeholder="kk@kkmarketplace.com" required />
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input type="password" name="password" value={formdata.password || ""} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" required />
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
                <input type="password" name="confirm_pass" value={formdata.confirm_pass || ""} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" required />
              </div>
              <div className="text-right">
                  <button type="submit" className="px-5 py-2 w-full sm:w-auto text-sm font-medium text-center text-white bg-sky-700 rounded-lg hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">
                    Signup
                  </button>
              </div>
              <div className="ml-2 my-5 text-center text-sm font-medium text-gray-900 dark:text-gray-300">
                Already registered? <Link className="hover:text-sky-700" href="/auth/login">Login</Link>
              </div>
              <div className="flex items-center justify-center">
                <button type="button" className="inline-flex px-5 py-2 text-sm font-medium text-center text-white bg-sky-700 rounded-lg hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">
                  <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                  Sign up with Google
                </button>
              </div>
              
            </form>
            </div>
        </section>
  )
}
