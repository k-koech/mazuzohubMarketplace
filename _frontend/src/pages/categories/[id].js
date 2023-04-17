import Layout from "@/layout/Layout";

export default function Id({category}) 
{
    // 
  if(category==undefined)  {
      return "Post not Found"
  }

  return (
    <Layout>
      <h1>Single Category</h1>
      <p>{category.name}</p>
    </Layout>
  )
}


export async function getServerSideProps(req, res) {
  const data = await fetch("https://marketplace.developerske.com/api/categories").then(res=>res.json());
  const {id} = req.query;

  if(id){
      const category = data.find(category => category.id == id)

      if(category==undefined){
        return {
          props: {category: null},
        }
      }
      else{
        return {
          props: {category: category},
        }
      }
        
   }
 
}
