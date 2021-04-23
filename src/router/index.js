import Vue from 'vue'
import VueRouter from 'vue-router'
const Home=()=>import('../views/Main')
const Cart=()=>import('../views/Cart')
const Me=()=>import('../views/Me')
const Detailinfo=()=>import('../views/Detailinfo')
const Login=()=>import('../views/Login')
const Myorder=()=>import('../views/Myorder')
const Mylike=()=>import('../views/Mylike')
const Myaddr=()=>import('../views/Myaddr')
const Setting=()=>import('../views/Setting')
const Changenickname=()=>import('../views/Changenickname')
const Uploadimg=()=>import('../views/Uploadimg')
const Newaddr=()=>import('../views/Newaddr')
const Orderconfirm=()=>import('../views/Orderconfirm')
const Changeloginpassword=()=>import('../views/Changeloginpassword')
const Changepaypassword=()=>import('../views/Changepaypassword')
const Orderinfo=()=>import('../views/Orderinfo')
const Paysuccess=()=>import('../views/Paysuccess')
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/home',
    component:Home,
    name:'Home'
  },
  {
    path: '/cart',
    component:Cart,
    name: 'cart',
    meta:{
      isLogin:true
    }
  },
  {
    path: '/me',
    component:Me,
    name: 'Me'
  },
  {
    path: '/info',
    component:Detailinfo,
    name: 'info'
  },
  {
    path: '/login',
    component:Login,
    name: 'login'
  },
  {
    path: '/myorder',
    component:Myorder,
    name: 'Myorder',
    meta: {
      isLogin: true
    }
  },
  {
    path: '/mylike',
    component:Mylike,
    name:'Mylike',
    meta: {
      isLogin: true
    }
  },
  {
    path: '/myaddr',
    component:Myaddr,
    name: 'Myaddr',
    meta: {
      isLogin: true
    }
  },
  {
    path: '/setting',
    component:Setting,
    name: 'Setting',
    meta: {
      isLogin: true
    }
  },
  {
    path: '/changenickname',
    component: Changenickname,
    name: 'Changenickname',
    meta: {
      isLogin: true
    }
  },
  {
    path: '/uploadimg',
    component: Uploadimg,
    name: 'U[lpadimg',
    meta: {
      isLogin: true
    }
  },
  {
    path: '/newaddr',
    component:Newaddr,
    name: 'Newaddr',
    meta: {
      isLogin: true
    }
  },
  {
    path: '/orderconfirm',
    component:Orderconfirm,
    name: 'Orderconfirm',
    meta: {
      isLogin: true
    }
  },
  {
    path: '/changeloginpassword',
    component:Changeloginpassword,
    name: 'Changeloginpassword',
    meta: {
      isLogin: true
    }
  },
  {
    path: '/changepaypassword',
    component:Changepaypassword,
    name: 'Changepaypassword',
    meta: {
      isLogin: true
    }
  },
  {
    path: '/orderinfo',
    component:Orderinfo,
    name:'Orderinfo',
    meta: {
      isLogin: true
    }
  },
  {
    path: '/paysuccess',
    component:Paysuccess,
    name: 'Paysuccess',
    meta: {
      isLogin: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.meta.isLogin){
    if(sessionStorage.getItem("token")){
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
