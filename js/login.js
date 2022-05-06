class Person {
    //请求的基础地址

    problem1Url = 'http://localhost:3000/problem1';
    jiejieUrl = 'http://localhost:3000/jiejie';
    userInfoUrl = 'http://localhost:3000/userInfo';

    constructor() {
        this.register()
        this.eventOn()
    }
    //添加事件方法
    eventOn() {
        //登录注册点击事件（事件委托）
        Person.$$('#regSI').addEventListener('click', this.regSI.bind(this))
        //logo点击事件
        //Person.$$('.logo').addEventListener('click', this.logo.bind(this))
        //注册提交按钮事件
        //Person.$$('#res').addEventListener('click', this.resClick.bind(this))
        //登录提交按钮事件
        //Person.$$('#SignIn').addEventListener('click', this.SignInClick.bind(this))
    }

    //登录注册点击方法
    regSI(eve) {
        let target = eve.target
        console.log(target);
        if (target.innerHTML == '登录') this.SignIn()
        else if (target.innerHTML == '注册') this.register()
    }

    //登录
    SignIn() {
        let cont = Person.$$('.conter')
        let html = `
        <form action="">
            <div class="input-group input-group-lg" id="txt">
                <span class="input-group-addon" id="sizing-addon1">用户名</span>
                <input type="text" class="form-control" placeholder="请输入用户名" aria-describedby="sizing-addon1" id="userName">
            </div>
            <div class="input-group input-group-lg" id="txt">
                <span class="input-group-addon" id="sizing-addon1">密码</span>
                <input type="text" class="form-control" placeholder="请输入密码" aria-describedby="sizing-addon1" id="confirmPassword">
            </div>
            <div class="btn-group" role="group" aria-label="..." id="register">
                    <button type="button" class="btn btn-default" id="SignIn">登录</button>
                    <button type="button" class="btn btn-default" id="clear">清空</button>
            </div>
        </form>
        `
        cont.innerHTML = html
        Person.$$('#SignIn').addEventListener('click', this.SignInClick.bind(this))
    }

    //注册
    register() {
        let cont = Person.$$('.conter')
        let html = `
            <form action="">
                <div class="input-group input-group-lg" id="txt">
                    <span class="input-group-addon" id="sizing-addon1">用户名</span>
                    <input type="text" class="form-control" placeholder="请输入用户名" aria-describedby="sizing-addon1" id="userName">
                </div>
                <div class="input-group input-group-lg" id="txt">
                    <span class="input-group-addon" id="sizing-addon1">密码</span>
                    <input type="text" class="form-control" placeholder="请输入密码" aria-describedby="sizing-addon1" id="password">
                </div>
                <div class="input-group input-group-lg" id="txt">
                    <span class="input-group-addon" id="sizing-addon1">确认密码</span>
                    <input type="text" class="form-control" placeholder="请输入确认密码" aria-describedby="sizing-addon1" id="confirmPassword">
                </div>

                <div class="btn-group" role="group" aria-label="..." id="register">
                    <button type="button" class="btn btn-default" id="res">注册</button>
                    <button type="button" class="btn btn-default" id="clear">清空</button>
                </div>
            </form>
        `
        cont.innerHTML = html
        Person.$$('#res').addEventListener('click', this.resClick.bind(this))
    }

    //注册提交按钮方法
    resClick() {
        let formObj = document.forms[0]
        let { confirmPassword, password, userName } = formObj.elements
        if (!confirmPassword.value.trim() || !password.value.trim() || !userName.value.trim()) throw new Error('不能为空')
        if(!(password.value.trim() == confirmPassword.value.trim())){
            alert('俩次密码输入不一致')
            return
        } 
        axios.post(this.userInfoUrl, {
            user: userName.value.trim(),
            confirmPassword: confirmPassword.value.trim(),
        }).then(({ status }) => {
            //console.log(status);
            if (status == 201) {
                //window.location.href = 'index.html'
                this.SignIn()
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
    //登录提交按钮方法
    async SignInClick(){
        let formObj = document.forms[0]
        let { confirmPassword, userName } = formObj.elements
        
        if (!confirmPassword.value.trim() ||  !userName.value.trim()) throw new Error('不能为空')
        let { status, data } = await axios.get(this.userInfoUrl)
        if (!status == 200) throw new Error('请求失败。。。')
        data.forEach(function(val){
            //console.log(val);
            if(val.user == userName.value.trim() && val.confirmPassword == confirmPassword.value.trim()){
                localStorage.setItem('userName',userName.value.trim())
                window.location.href = 'index.html' 
            } 
            
        })
    }





    //获取节点对象方法
    static $$(ele) {
        let res = document.querySelectorAll(ele);
        return res.length == 1 ? res[0] : res
    }
}
new Person;