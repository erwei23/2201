

class Person {
    //请求的基础地址
    baseUsrl = 'http://localhost:3000/problem1';
    constructor() {
        this.getData()
    }
    //获取数据方法
    async getData() {
        //获取数据 
        let { status, data } = await axios.get(this.baseUsrl)
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


        // //分类移入事件
        // Person.$$('#fenlei').addEventListener('mouseover',this.mouseoverFn.bind(this))
        // //分类点击事件
        // Person.$$('#leibiao').addEventListener('click',this.clickFn.bind(this))
        // //随便点击让列表消失
        // document.onclick = this.dcClickFn
        // //lsp图片点击事件
        // Person.$$('.lsp').addEventListener('click',this.lspClick.bind(this))
    }
    //分类移入事件方法
    mouseoverFn() {
        Person.$$('#leibiao').style.display = 'block';
    }
    //分类点击事件方法
    clickFn() {
        Person.$$('#leibiao').style.display = 'none';
    }
    //随便点击让列表消失
    dcClickFn() {
        Person.$$('#leibiao').style.display = 'none';
    }
    //lsp图片点击事件方法
    lspClick() {
        // console.log(111);

    }

    //获取节点对象方法
    static $$(ele) {
        let res = document.querySelectorAll(ele);
        return res.length == 1 ? res[0] : res
    }
}
new Person;