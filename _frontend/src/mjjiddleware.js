import { NextResponse } from "next/server";

export default function Middleware(req)
{
    // let verify = req.cookies.get("loggedin");
    const authTokens = (typeof window !== 'undefined') && sessionStorage.getItem("authTokens")? JSON.parse(sessionStorage.getItem("authTokens")): null;
    const router = useRouter()

    let url = req.url
    console.log("URL ",url)
    if(!authTokens  && url.includes('http://localhost:3000/')){
        return next.push("/auth/login")
        // NextResponse.redirect("http://localhost:3000/dashboard");
    }

    if (authTokens && authTokens.access && url === "http://localhost:3000/auth/login") {
      return ("http://localhost:3000/");
    }


}