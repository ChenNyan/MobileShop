import {request} from "@/network/index";

export const baseImg="http://192.168.0.129:8360"

export const getData = page=>{
    return request({
        url:'/product/pagination',
        params:{
            page
        }
    })
}

export const getDetail = id=>{
    return request({
        url:'/product',
        params:{
            id
        }
    })
}

export const login=data=>{
    return request({
        url:'/user/signin',
        method:'post',
        data
    })
}

export const getUser=()=>{
    return request({
        url:'/user/info',
    })
}

export const addLike=product_id=>{
    return request({
        url:'/product_like/create',
        method:'post',
        data:{
            product_id
        }
    })
}

export const delLike=product_id=>{
    return request({
        url:'/product_like/delete',
        params:{
            product_id
        }
    })
}

export const getCart=()=>{
    return request({
        url:'/cart/all'
    })
}

export const updateCart=(data)=>{
    return request({
        url:'/cart/update',
        method:'post',
        data
    })
}

export const delCartItem=product_id=>{
    return request({
        url:'/cart/delete',
        params:{
            product_id
        }
    })
}

export const changeUserNickName=(nickname)=>{
    return request({
        url:'/user/setting',
        method:'post',
        data:{
            nickname
        }
    })
}

export const uploadimg=()=>{

}

export const addAddr=data=>{
    return request({
        url:'/user_address/create',
        method:'post',
        data
    })
}

export const updateAddr=(id,data)=>{
    return request({
        url:'/user_address/update?id='+id,
        method:'post',
        data
    })
}

export const deleteAddr=id=>{
    return request({
        url:'/user_address/delete',
        params:{
            id
        }
    })
}

export const changeloginpassword=(password,newPassword)=>{
    return request({
        url:'/user/updatePassword',
        method:'post',
        data:{
            password,
            newPassword
        }
    })
}

export const changepaypassword=(password,newPassword)=>{
    return request({
        url:'/user/updatePayPassword',
        method:'post',
        data:{
            password,
            newPassword
        }
    })
}

export const neworder=(orderProductList,user_address_id)=>{
    return request({
        url:'/order/create',
        method:'post',
        data:{
            orderProductList,
            user_address_id
        }
    })
}

export  const getorderinfo=id=>{
    return request({
        url:'/order',
        method:'get',
        params:{
            id
        }
    })
}

export const payorder=(order_id,pay_password)=>{
    return request({
        url:'/order/pay?order_id='+order_id,
        method:'post',
        data:{
            pay_password
        }
    })
}

export const getorderlist=page=>{
    return request({
        url:'/order/pagination',
        method:'get',
        params:{
            page
        }
    })
}