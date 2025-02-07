import mongoose, { model, models, Schema } from "mongoose";

export  const VIDEO_DIMENSION={
    width:1080,
   height:1920
}as const

export interface IVideo{
    _id?:mongoose.Types.ObjectId
    title:string
    description:string
    videoUrl:string
    ThumbnailUrl:string
    control?:boolean
    createdAt?:Date
    updatedAt?:Date
    Transformation:{
        height:number
        width:number
        quality?:number
    }
}

const videoSchema=new Schema<IVideo>({
    title:{type:String,required:true},
    description:{type:String,required:true},
    videoUrl:{type:String,required:true},
    ThumbnailUrl:{type:String,required:true},
    control:{type:Boolean,default:true},
    Transformation:{
        height:{type:Number,default:VIDEO_DIMENSION.height},
        width:{type:Number,default:VIDEO_DIMENSION.width},
        quality:{type:Number,min:1,max:100}
    }
},{timestamps:true})

const Video=models?.Video || model<IVideo>("Video",videoSchema)
export default Video