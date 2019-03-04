let obj = {
    a: 1,
    b: 2,
    add(c, d) {
        console.log('原来')
        console.log(c+d)
    }
}

var a = 0
var b = 1

function add(c, d) {
    console.log('a+b',this.a + this.b)
    console.log(c)
    console.log(d)
}

Function.prototype.myCall = function (obj){
    //obj为null时，指向window
    let newObj = obj || window
    newObj.fn = this
    let args = []
    for(let i = 1; i < arguments.length; i++ ){
        //es6
        args.push(arguments[i])
        //es3
        // args.push('arguments[' + i + ']')
    }
    //es3
    // let result = eval('newObj.fn(' + arg + ')')
    //es6
    let result = newObj.fn(...args)
    delete newObj.fn
    return result
}

// console.log(add.myCall(obj, 3, 4))
// console.log(add.call(obj, 3, 4))

Function.prototype.myApply = function (obj,args){
    //obj为null时，指向window
    let newObj = obj || window
    newObj.fn = this
    let result
    if(!args){
        result = newObj.fn()
    }
    else{
        if (!(args instanceof Array)) throw new Error('params must be array');
        //es3
        result = eval('newObj.fn(' + args + ')')
        //es6
        //result = newObj.fn(...arg)
    }
    
    delete newObj.fn
    return result
}

// console.log(add.myApply(obj, [3, 4]))
// console.log(add.apply(obj, [3, 4]))

Function.prototype.myBind = function(obj){
    //其实是用apply执行self
    let self = this
    //bind函数的参数
    let args = [].slice.call(arguments,1)

    //中间的缓冲函数
    let temp = function () {}

    //返回的新函数
    let newF = function(){
        //新函数执行时的参数
        let _args = [].slice.call(arguments)
        //将参数合并并执行
        //若是用new操作符执行的，this就指向new出来的对象
        //constructor还是原来的函数
        self.apply(this instanceof temp ? this : obj, args.concat(_args));
    }

    temp.prototype = self.prototype
    newF.prototype = new temp()
    return newF
}


let newAdd1 = add.myBind(obj,3)
newAdd1(4)
console.log(new newAdd1().constructor)
let newAdd2 = add.bind(obj,3)
newAdd2(4)
console.log(new newAdd2().constructor)

// let arr = ['1','2']
// function A (a,b){
//     console.log(arguments)
//     console.log(a + b)
// }
//数组拼接字符串隐示调用toString方法  变成了eval('A('+'1,2'+')')
// eval('A('+ arr +')')


// console.log(arr.toString())
