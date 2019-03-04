let inp = document.getElementById('inp')

function deBounce (handle,delay){
    let timer = null
    return function(){
        clearTimeout(timer)
        timer = setTimeout(() => {
            handle.apply(this,arguments)
        },delay)
    }
}

function ajax(e){
    console.log(this.value)
    console.log(e)
}

inp.oninput = deBounce(ajax,1000)


