let cnt = document.getElementById('cnt')
let btn = document.getElementById('btn')

// function throttle(method, waitTime) {
//     let lastTime = 0
//     return function () {
//         let currentTime = new Date().getTime()
//         if (currentTime - lastTime >= waitTime){
//             method.apply(this, arguments)
//             lastTime = currentTime
//         }
//     }
// }

function add(e){
    cnt.innerText = parseInt(cnt.innerText) + 1
    console.log(e)
}

btn.onclick = throttle(add,500)


function throttle(method, waitTime){
    let lastTime = 0
    return function(){
        let currentTime = new Date().getTime()
        if(currentTime - lastTime >= waitTime){
            method.apply(this,arguments)
            lastTime = currentTime
        }
        
    }
}