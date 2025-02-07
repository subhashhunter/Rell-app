import { authOptions } from "@/lib/auth";
import { ConnectToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/models/video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try {
        await ConnectToDatabase();
        const videos=await Video.find({}).sort({createdAt:-1}).lean()
        if(!videos || videos.length==0)
        {
            return NextResponse.json([],{status:200})
        }
        return NextResponse.json(videos)
    } catch (error) {
        return NextResponse.json({error:"failed to fetch videos"},{status:500})
    }

}

export async function POST(request:NextRequest){
    try {
    const session=await getServerSession(authOptions)
    console.log("chutiya")
    if(!session?.user.id)
    {
        
        return NextResponse.json({message:"not authorised"},{status:401})
       
    }
        await ConnectToDatabase();
        const body:IVideo=await request.json();
        if(
            !body.ThumbnailUrl ||
            !body.title ||
            !body.description ||
            !body.videoUrl
        )
        {
            return NextResponse.json({error:"missing required fields"},{status:401})
        }
        const videoData={
            ...body,
            control:body.control ??true,
            transformation:{
                height:1920,
                width:1080,
                quality:body.Transformation.quality ??100
            }
        }
       const newVideo= await Video.create(videoData)
       return NextResponse.json(newVideo)
    } catch (error) {
        return NextResponse.json({error:"failed to post video"},{status:500})
    }
}