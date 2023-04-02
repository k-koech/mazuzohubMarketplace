import { AuthContext } from '@/context/AuthContext';
import { useContext, useState } from 'react'
import {RiLockPasswordFill} from 'react-icons/ri'
import { toast } from 'react-toastify';

export default function Update_password() 
{
    const [formdata, setFormdata] = useState({})

    const { updatePassword } = useContext(AuthContext);
  
    const handleChange = (e) =>
    {
      const name = e.target.name;
      const value = e.target.value;
      setFormdata(values => ({...values, [name]: value}))  
    }
  
    const handleSubmit = e => 
    {    
      e.preventDefault();
  
      if(formdata.password && formdata.password !== formdata.confirmpassword && formdata.confirmpassword)
      {
        toast.error("Password doesn't match");
      }
      else if(formdata.password!=undefined && formdata.password.length<5)
      {
        toast.error("Password should be atleast 5 characters!")
      }
      else{
       updatePassword(formdata.oldpassword, formdata.password)
       setFormdata({})
      }
      
    }

  return (
    <>
        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
            <span clas="text-green-500">
                <RiLockPasswordFill />
            </span>
            <span className="tracking-wide">Update Password</span>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                <input type="text" name="oldpassword" value={formdata.oldpassword || ""} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" placeholder="Old Password" required />
            </div>
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input type="password" name="password" value={formdata.password || ""} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" required />
            </div>
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
                <input type="password" name="confirmpassword" value={formdata.confirmpassword || ""} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" required />
            </div>
            <div className="text-right">
                <button type="submit" className="px-5 py-2 w-full sm:w-auto text-sm font-medium text-center text-white bg-sky-700 rounded-lg hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">
                    Update password
                </button>
            </div>              
        </form>
    </>
  )
}

