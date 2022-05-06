

 class Person {
    //请求的基础地址

    problem1Url = 'http://localhost:3000/problem1';
    jiejieUrl = 'http://localhost:3000/jiejie';
    myCollectionUrl = 'http://localhost:3000/myCollection';

    constructor() {
        this.userName()
        this.eventOn()
        this.getData()
    }
    //添加事件方法
    eventOn(){
        //index图片点击事件
        Person.$$('.lsp').addEventListener('click',this.indeximageClick.bind(this))
        //发布点击事件
        Person.$$('#sub').addEventListener('click',this.releaseClick.bind(this))
        //四种分类点击事件
        Person.$$('#leibiao').addEventListener('click',this.classification.bind(this))
        //登录注册点击事件
        Person.$$('#rightTwo').addEventListener('click',this.regSI.bind(this))
        //图片点击删除事件
        Person.$$('.shoppingCar').addEventListener('click',this.imgClickdel.bind(this))
    }

    //获取数据方法
    async getData(){
        let shoppingCar = Person.$$('.shoppingCar')
        let { status, data } = await axios.get(this.myCollectionUrl)
        if (!status == 200) throw new Error('请求失败。。。')
        let html = ``
        //console.log(status, data);
        data.forEach(function(val){
            html +=`
                <img src="${val.img}" data-id=${val.id} alt="">
            `
        })
        shoppingCar.innerHTML = html
    }

    imgClickdel(eve){
       let target = eve.target
       console.log(target);
       let dataId = target.dataset.id
       axios.delete(this.myCollectionUrl + '/' + dataId)
            .then(({ status }) => {
                if (status == 200) target.remove()
            })
       
    }

    //index图片点击方法
    indeximageClick() {
        // console.log(111);
    }

    //发布点击方法
    releaseClick(){
         alert('还没弄')
    }

    ////四种分类点击事件(事件委托)
    async classification(eve){
        let target = eve.target
        //console.log(target);
        window.location.href = 'waterfallFlow.html'    
    }

    //登录注册点击方法
    regSI(eve){
        let target = eve.target
        if(target.innerHTML =='注册/登录'){
            window.location.href = 'login.html'  
        }
    }

    //用户名渲染
    userName(){
        let rightTwo = Person.$$('#rightTwo')
        let storage1 = localStorage.getItem('userName')
        //console.log(localStorage.getItem('userName'));
        let html1 = ``
        if(storage1){
            html1 = `
                <li><a href="index.html">首页</a></li>
                <li><a href="#">${storage1}</a></li>
            `
        }else{
            html1 = `
                <li><a href="index.html">首页</a></li>
                <li><a href="#">注册/登录</a></li>
            `
        }
        rightTwo.innerHTML = html1
    }

    //获取节点对象方法
    static $$(ele) {
        let res = document.querySelectorAll(ele);
        return res.length == 1 ? res[0] : res
    }
}
new Person;