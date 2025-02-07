import { IVideo } from "@/models/video"
export type VideoFormData=Omit<IVideo ,"_id">
type FetchOptions={
    method?:"POST" |"PUT" | "DELETE" | "GET"
    body?:any
    headers?:Record<string,string>
}
class ApiClient{
    private async fetch<T>(
        endpoint:string,
        options:FetchOptions={}
    ):Promise<T>{
        const {method="GET",body ,headers={}}=options
        const defaultHeaders={
            "Content-Type":"application/json",
            ...headers
        }
      const response=  await fetch(`/api${endpoint}`,{
            method,
            headers:defaultHeaders,
            body:body? JSON.stringify(body) :undefined
        })
        if(!response.ok)
        {
            throw new Error(await response.text())
        }
        return response.json();
    }
    async getvideos(){
       return this.fetch<IVideo[]>('/videos')
    }
    async getAVideo(id:string){
        return this.fetch('/videos')
    }
    async createVideo(videoData:VideoFormData)
    {
        return this.fetch('/videos',{
            method:"POST",
            body:videoData
            
        })
    }
}
export const apiClient=new ApiClient()