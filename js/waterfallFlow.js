
class Person1 {
    //请求的基础地址

    problem1Url = 'http://localhost:3000/problem1';
    jiejieUrl = 'http://localhost:3000/jiejie';
    userInfoUrl = 'http://localhost:3000/userInfo';
    myCollectionUrl = 'http://localhost:3000/myCollection'

    page = 1
    itemObj = ''

    constructor() {
        this.getData()
        this.eventOn()
        this.userName()
    }

    //添加事件方法
    eventOn() {
        Person1.$$('.btn11').addEventListener('click', this.clickLoad.bind(this))
        window.onscroll = this.LazyLoading.bind(this)
        Person1.$$('.box').addEventListener('click', this.shop.bind(this))
    }

    //获取数据&渲染
    async getData(pageXC) {
        const box = Person1.$$('.box')
        const btn = Person1.$$('.btn11')
        btn.innerHTML = '木木在哭QAQ'
        btn.classList.add('loading')
        let { status, data } = await axios.get(this.jiejieUrl)
        if (!status == 200) throw new Error('请求失败。。。')
        //console.log(data);


        let pageSize = 8
        let startpage = (this.page - 1) * pageSize
        let endpage = startpage + pageSize
        let showImagesDate = data.slice(startpage, endpage)
        //console.log(showImagesDate);
        let html = ``

        if (showImagesDate.length == 0) {
            btn.innerHTML = '木木没泪啦QAQ'
            btn.classList.remove('loading')
            return
        }
        setTimeout(function () {
            showImagesDate.forEach(function (val, index) {
                html += `
            <div class="item">
              <img src="${val.img}" width ="${val.width}" height="${val.height}"  alt="">
              <p>${val.text}</p>
              <div class="shopp">收藏</div>
            </div>
            `
            })

            box.innerHTML += html
            btn.innerHTML = '木木哭ba@。@'
            btn.classList.remove('loading')

            //页面排序方法
            // let itemObj = ''
            let paceing = 8;
            this.itemObj = document.querySelectorAll('.item')
            //console.log(itemObj);
            let columns = parseInt(box.offsetWidth / this.itemObj[0].offsetWidth)
            let heightArr = []
            this.itemObj.forEach(function (item, index) {
                if (index < columns) {
                    item.style.left = index * (item.offsetWidth + paceing) + 'px'
                    heightArr.push(item.offsetHeight)
                    // console.log(heightArr);
                } else {
                    let min = heightArr[0]
                    let minIndex = 0
                    heightArr.forEach(function (value, index) {
                        if (min > value) {
                            min = value
                            minIndex = index
                        }
                    })
                    item.style.top = min + paceing + 'px'
                    item.style.left = itemObj[minIndex].offsetLeft + 'px'
                    heightArr[minIndex] = heightArr[minIndex] + item.offsetHeight
                }
            })
            //console.log(Math.max(...heightArr));
            box.style.height = Math.max(...heightArr) + 'px'
            //

        }, 1000)

    }

    //点击加载事件
    clickLoad() {
        const btn = Person1.$$('.btn11')
        if (!btn.classList.contains('loading')) {
            this.getData(++this.page)
        }
    }

    //懒加载
    LazyLoading() {
        let wc = document.documentElement.clientHeight
        let st = document.documentElement.scrollTop
        if ((wc + st) > itemObj[itemObj.length - 1].offsetTop) {
            this.clickLoad()
        }
        //console.log(111);
    }

    //用户名渲染
    userName() {
        let rightTwo = Person1.$$('#rightTwo')
        let storage1 = localStorage.getItem('userName')
        //console.log(localStorage.getItem('userName'));
        let html1 = ``
        if (storage1) {
            html1 = `
                <li><a href="index.html">首页</a></li>
                <li><a href="shopping.html">收藏</a></li>
                <li><a href="#">${storage1}</a></li>
            `
        } else {
            html1 = `
                <li><a href="index.html">首页</a></li>
                <li><a href="shopping.html">收藏</a></li>
                <li ><a href="login.html">注册/登录</a></li>
            `
        }
        rightTwo.innerHTML = html1
    }

    //收藏
    async shop(eve) {
        // let { status, data } = await axios.get(this.myCollectionUrl)
        // if (!status == 200) throw new Error('请求失败。。。')
        //console.log(status, data);
        let target = eve.target
        //console.log(target);
        if (target.innerHTML == '收藏') {
            target.style.background = 'red'
            let img1 = target.previousElementSibling.previousElementSibling.src
            console.log(img1);
            axios.post(this.myCollectionUrl, {
                img: img1
            }).then(({ status }) => {
                //console.log(status);
                if (status == 201) {
                    
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    }






    //获取节点对象方法
    static $$(ele) {
        let res = document.querySelectorAll(ele);
        return res.length == 1 ? res[0] : res
    }
}
new Person1;