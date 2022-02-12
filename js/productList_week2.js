// import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";

const app = {
  //關注點分離
  data() {
    //function return
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      path:'tatw',
      temp:{},
      products:[],
    }
  },
  methods: {
    checkLogin() {
      // 確認是否登入
      axios.post(`${this.url}/api/user/check`)
        .then((res) => {
          // console.log(res.data);
          this.getProductList();
        })
        .catch((error) => {
          // console.dir(error);
          alert('請重新登入');
          window.location = "index.html";
        })
    },

    getProductList() {
      axios.get(`${this.url}/api/${this.path}/admin/products`)
        .then((res) => {
          console.log(res.data);
          let { products } = res.data
          this.products = products
        })
        .catch((error) => {
          alert(error);
        })
    }
  },
  created() {
    // 取得token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)tatw\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    // console.log(token);
    axios.defaults.headers.common['Authorization'] = token;
    this.checkLogin();
    // console.log("123");
  }
}
Vue.createApp(app).mount('#app');