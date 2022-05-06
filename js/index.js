

 class Person {
    //请求的基础地址

    problem1Url = 'http://localhost:3000/problem1';
    jiejieUrl = 'http://localhost:3000/jiejie';
    oldWindUrl = 'http://localhost:3000/oldWind';
    animationUrl = 'http://localhost:3000/animation';
    PetsUrl = 'http://localhost:3000/Pets';

    constructor() {
        this.userName()
        this.getData()
        this.eventOn()
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
    }

    //获取数据方法
    async getData() {
        //获取数据 
        let { status, data } = await axios.get(this.problem1Url)
        //console.log(data);
        // console.log(status,data);
        //判断返回值状态
        if (!status == 200) throw new Error('请求失败。。。')
        //console.log(data);
        //将数据遍历追加到页面中
        let conter = '';
        data.forEach(ele => {
            conter += `
            <div class="conter">
            <!--内容 -->
            <div class="box">
                <!-- 版心 -->
                <div class="boxbx">
                    <!--用户 -->
                    <div>
                        <div class="yuan">
                            <img src="${ele.headP}" alt="..." class="img-circle">
                        </div>
                        <div class="nameLy">
                            <a href="#noen">${ele.name}</a>
                            <p>${ele.source}</p>
                        </div>
                        <p class="yi">${ele.userText}</p>
                        <br>
                        <br>
                        <div class="imagethree">
                            <a href="#none"><img src="${ele.image[0]}" alt="..." class="img-thumbnail"></a>
                            <a href="#none"><img src="${ele.image[1]}" alt="..." class="img-thumbnail"></a>
                            <a href="#none"><img src="${ele.image[2]}" alt="..." class="img-thumbnail"></a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 点赞收藏更多 -->
            <div class="btn-group btn-group-justified" role="group" aria-label="..." id="butTherr">
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-default">
                        <span class="iconfont icon-dianzan">${ele.fabulous}</span>
                    </button>
                </div>
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-default">
                        <span class="iconfont icon-shoucang">${ele.Collection}</span>
                    </button>
                </div>
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-default">
                        <span class="iconfont icon-gengduo3">更多</span>
                    </button>
                </div>
            </div>
        </div>
            `
        })
        //console.log(conter);
        Person.$$('.container').innerHTML += conter;
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
                <li><a href="shopping.html">收藏</a></li>
                <li><a href="#">${storage1}</a></li>
            `
        }else{
            html1 = `
                <li><a href="shopping.html">收藏</a></li>
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