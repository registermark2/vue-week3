let productModel = {};
let delProductModel ={};

const app = {
  //關注點分離
  data() {
    //function return
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      path:'tatw',
      tempProduct:{
        imgsUrlArr:[],
      },
      products:[],
      isNew:false,
      addImg:true,
    }
  },
  methods: {
    checkLogin() {
      // 確認是否登入
      axios.post(`${this.url}/api/user/check`)
        .then((res) => {
          this.getProductList();
        })
        .catch((error) => {
          alert('請重新登入');
          window.location = "index.html";
        })
    },

    getProductList() {
      axios.get(`${this.url}/api/${this.path}/admin/products`)
        .then((res) => {
          // console.log(res.data);
          let { products } = res.data
          this.products = products
        })
        .catch((error) => {
          alert(error);
        })
    },
    openModel(status,item){
      if(status==='open'){
        this.tempProduct={
          imgsUrlArr:[],
        };//清空暫存
        this.isNew=true;
        productModel.show();
      }else if (status==='close'){
        productModel.hide();
      }else if (status==='edit'){
        this.tempProduct={...item};
        this.isNew=false;
        productModel.show();
      }else if (status==='delete'){
        this.tempProduct = {...item}
        delProductModel.show();
      }
    },
    updateProduct(){
      let method='post';
      let url = `${this.url}/api/${this.path}/admin/product`;
      if(this.isNew==false){
        url=`${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`;
        method='put';
      }
      axios[method](url, {data:this.tempProduct})
        .then((res)=>{
          this.openModel('close');
          this.getProductList();
        })
    },
    deleteProduct(){
      const url = `${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`
      axios.delete(url, {data:this.tempProduct})
        .then((res)=>{
          delProductModel.hide();
          this.getProductList();
        })
    },
    addImgUrl(){
      this.addImg=false;
    }
    
  },
  created() {
    // 取得token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)tatw\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;
    this.checkLogin();
  },
  mounted() {
    const model = document.querySelector('#productModal');
    productModel = new bootstrap.Modal(model);
    const delmodel = document.querySelector('#delProductModal');
    delProductModel = new bootstrap.Modal(delmodel);
    this.getProductList();
  }
}
Vue.createApp(app).mount('#app');