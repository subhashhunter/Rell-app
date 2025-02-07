import { ConnectToDatabase } from "@/lib/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try{
        const{email,password}=await request.json();
        if(!email || !password)
        {
            return NextResponse.json({
                error:"enter your email and password"
            },{status:400})
        }

        await ConnectToDatabase();
        const existingUser= await User.findOne({email})
 
        if(existingUser)
        {
         return NextResponse.json({error:"email already register"},{status:400})
        }
 
       const user= await User.create({
         email,
         password
        })

        return NextResponse.json({message:"user Registered successfully"},{status:201})
    }
   catch (error) {
    console.log("failed")
        return NextResponse.json({error:"registraton of user failed"},{status:500})
    }
}