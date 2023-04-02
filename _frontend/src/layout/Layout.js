import ComplexNavbar from './Navbar'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify'

function Layout({children}) {
  return (
    <div className='bg-gray-100'>
    <ComplexNavbar />
    <ToastContainer position="top-right" theme="colored" />
    <main className='container mx-auto p-5 min-h-[70vh]'>
        {children}
    </main> 

    <Footer />
    </div>
  )
}

export default Layout