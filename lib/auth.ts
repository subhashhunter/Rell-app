import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ConnectToDatabase } from "./db";
import User from "@/models/user";
import bcrypt from "bcryptjs"
export const authOptions:NextAuthOptions={
    providers:[
        CredentialsProvider({
            name:"Crdentials",
            credentials:{
                email:{label:"email",type:"string",placeholder:"email"},
                password:{label:"password",type:"password"}
            },
            async authorize(credentials)
            {
                if(!credentials?.email || !credentials.password)
                {
                    throw new Error("enter email and password")
                }
                await ConnectToDatabase();
                try {
                    const user=await User.findOne({
                        email:credentials?.email
                    })
                    if(!user)
                    {
                        throw new Error("no user found")
                    }
                    const isValid=await bcrypt.compare(credentials.password,user.password)
                    if(!isValid)
                    {
                        throw new Error("password is incorrect")
                    }
                    return{
                        id:user._id.toString(),
                        email:user.email
                    }

                } catch (error) {
                    throw error
                }
            }
        }),
    ],
    callbacks:{
        async jwt({token,user})
        {
            if(user)
            {
                token.id=user.id
            }
            return token
        },
        async session({session,token})
        {
            if(session.user)
            {
                session.user.id=token.id as string
            }
            return session;
        }
    },
    pages:{
        signIn:"/login",
        error:"/login"
    },
    session:{
        strategy:'jwt',
        maxAge:30*24*60*60
    },
    secret:process.env.NEXTAUTH_SECRET
}