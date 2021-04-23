import Vue from "vue";
Vue.filter('forMatPrice',price=>{
    price = +price
    if (!price) return
    return `￥${price.toFixed(2)}`;
})