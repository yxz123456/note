//遍历对象for(var prop in obj)
//1.判断是不是原始值，typeof
//2.判断是数组还是对象 instanceof toString constuctor
//3.建立相应的数组或者对象
//递归
let obj = {
    name: 'yxz',
    frends: ['pch', 'ld'],
    dad: {
        name: 'yww',
        wife: 'lcx'
    },
    add() {
        console.log('add')
    }
}
let obj1 = {}

function deepClone(origin, target) {
    target = target || {}
    for (let prop in origin) {
        //判断是不是原型上的东西 (不拷贝原型上的东西)
        if (origin.hasOwnProperty(prop)) {
            //如果origin[prop]不是引用类型
            if (origin[prop] !== null && typeof origin[prop] == 'object') {
                //如果origin[prop]是引用类型
                if (Object.prototype.toString.call(origin[prop]) == '[object Array]') {
                    target[prop] = []
                } else if (Object.prototype.toString.call(origin[prop]) == '[object Object]') {
                    target[prop] = {}
                }
                deepClone(origin[prop], target[prop])
            } else {
                target[prop] = origin[prop]
            }
        }
    }
}
deepClone(obj, obj1)
console.log(obj1)
console.log(obj)