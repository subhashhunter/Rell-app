"use client"

import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

function Login(){
    const[email,setEmail]=useState("")
    const[password,setpassword]=useState("")
    const[error,setError]=useState("")
    const router=useRouter()
    const handlesubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        
        try {
            const result= await signIn('credentials',{
                redirect:false,
                email:email,
                password:password
            })
            if(!result?.ok){
                setError("registration failed")
            }
            router.push("/upload-video")

        } catch (error) {
            return Response.json({error:"registration failed"},{status:500})
        }

    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="max-w-md w-full space-y-8 bg-white rounded-lg shadow-md p-6">
            <div className="text-center">
              <h1 className="text-xl font-semibold">Signup to upload Reels</h1>
            </div>
            <form onSubmit={handlesubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full"
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setpassword(e.target.value)}
                className="input input-bordered w-full"
              />
              <button type="submit" className="btn w-full bg-blue-600 text-white hover:bg-blue-700">
                Sign In
              </button>
              <p>do not  have an account <Link href={'/register'} className="text-blue-600">Signup</Link></p>
            </form>
          </div>
        </div>
      );
    }
    export default Login      