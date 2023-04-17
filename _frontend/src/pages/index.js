import Head from 'next/head'
import Image from 'next/image'
import Layout from '@/layout/Layout';
import Products from '@/components/Products';
import Categories from '@/components/Categories';

export default function home({categories}) 
{  
    // const items = []
    
  return (
    <>
      <h1>Categories</h1>
        <Categories/>
        <Products/>
    </>
  )
}


export async function getServerSideProps() {
  const data = await fetch("https://marketplace.developerske.com/api/categories").then(res=>res.json());
  return {
    props: {categories:data}, // will be passed to the page component as props
  }
}