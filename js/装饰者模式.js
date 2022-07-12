// 装饰者模式
// 面向切面编程 AOP
const AOP = {}
AOP.before = function (fn, before) {
    return function () {
        before.apply(this, arguments)
        fn.apply(this, arguments)
    }
}
function submit() {
    console.log(this)
    console.log('提交数据')
}
function check() {
    console.log(this)
    console.log('先进行校验')
}
submit = AOP.before(submit, check)

/*********************************/

// ES7 运行代码需要babel支持或者ts，把js模式调整到ES6/babel
const logWrapper = targetClass => {
    let originRender = targetClass.prototype.render
    targetClass.prototype.render = function () {
        console.log('before render')
        originRender.apply(this)
        console.log('after render')
    }
}
//不使用装饰器的方式，要执行如下代码
// App = logWrapper(App)


// 使用decorator修饰符，修改class
@logWrapper // 装饰器语法
class App {
    constructor() {
        this.title = '首页'
    }
    render() {
        console.log('渲染页面' + this.title)
    }
}

/******* */
// 使用decorator 修饰符，修改原型属性
function logWrapper2(target, name, descriptor) {
    console.log(arguments)
    let originRender = descriptor.value
    descriptor.value = function () {
        console.log('before render')
        originRender.bind(this)()
        console.log('after render')
    }
    console.log('after render');
}

class App2 {
    constructor() {
        this.title = 'xxx'
    }
    @logWrapper2
    render() {
        console.log('渲染页面' + this.title);
    }
}
new App2().render()




