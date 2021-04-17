import {request} from "@/network/index";

export const getData = (page)=>{
    return request({
        url:'/product/pagination',
        params:{
            page
        }
    })
}

