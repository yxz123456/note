// Promise特点
// 状态 pending => resolved, rejected,状态转换是单向, 携带结果数据
// Promise.prototype.then 返回Promise对象, 状态由回调函数的返回值决定
// 对应状态的处理函数，返回的是非Promise对象 N , 返回一个resolved状态的Promise对象，结果数据为 N
//                            Promise对象 P ,  新返回的Promise对象的状态由P决定


class MyPromise {
    constructor(fn) {
        //判断类型
        if (typeof fn !== 'function') {
            throw TypeError `MyPromise resolver ${fn} is not a function`
        } else {
            this.status = 'pending'
            this.resolveVal = null
            this.rejectVal = null
            this.resolveCB = []
            this.rejectCB = []
            //成功
            let resolve = suc => {
                if (this.status == 'pending') {
                    //与Promise保持一致,放入异步队列，同步执行完了再执行
                    setTimeout(() => {
                        this.status = 'resolved'
                        this.resolveVal = suc
                        this.resolveCB.forEach(cb => cb())
                    }, 0)
                }
            }
            //失败
            let reject = err => {
                if (this.status == 'pending') {
                    setTimeout(() => {
                        this.status = 'rejected'
                        this.rejectVal = err
                        this.rejectCB.forEach(cb => cb())
                    }, 0)
                }
            }
            fn(resolve, reject)
        }
    }
    //then 方法
    then(onResolved, onRejected) {
        if (this.status == 'resolved') {
            return new MyPromise((resolve, reject) => {
                //拿到回调函数的返回值
                let res = onResolved && onResolved(this.resolveVal)
                //如果返回的值是MyPromise对象
                if (res instanceof MyPromise) {
                    //返回的该MyPromise对象与then返回的MyPromise对象状态一致
                    res.then(resolve, reject)
                } else {
                    //让返回的MyPromise对象与上一个状态保持一致
                    resolve(res)
                }
            })
        } else if (this.status == 'rejected') {
            return new MyPromise((resolve, reject) => {
                let res = onRejected && onRejected(this.rejectVal)
                if (res instanceof MyPromise) {
                    res.then(resolve, reject)
                } else {
                    reject(res)
                }
            })
        } else if (this.status == 'pending') {
            // console.log('pending')
            return new MyPromise((resolve, reject) => {
                //异步的时候，把回调函数保存在CallBack队列里，然后等状态变化再执行
                //成功
                this.resolveCB.push(((onResolved) => {
                    return () => {
                        let res = onResolved && onResolved(this.resolveVal)
                        if (res instanceof MyPromise) {
                            res.then(resolve, reject)
                        } else {
                            resolve(res)
                        }
                    }
                })(onResolved))
                //失败
                this.rejectCB.push(((onRejected) => {
                    return () => {
                        let res = onRejected && onRejected(this.rejectVal)
                        if (res instanceof MyPromise) {
                            res.then(resolve, reject)
                        } else {
                            reject(res)
                        }
                    }
                })(onRejected))
            })
        }
    }
}

let p = new MyPromise(function (res, rej) {
    console.log(0)
    res(1)
    // setTimeout(() => {
    //     res(1)
    // }, 1000)
    // rej(0)
})

p.then(data => console.log(data))
console.log(2)
// p.then(suc => {
//         console.log(suc)
//         return new MyPromise(function (res, rej) {
//             setTimeout(() => {
//                 res(2)
//             }, 1000)
//         })
//     }, err => {
//         console.log(err)
//     })
//     .then(suc => {
//         console.log('suc',suc)
//     }, err => {
//         console.log('err', err)
//     })