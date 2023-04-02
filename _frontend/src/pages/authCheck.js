import { useRouter } from 'next/router'

export function AuthCheck({children})
{
  const router = useRouter()
//   const {authTokens} = useState(AuthContext)

  
//   if (typeof window !== 'undefined' && authTokens === null) router.push('/auth/login')

//   if(!authTokens) return <Spinner /> // a loading component that prevents the page from rendering
   
  return children
}