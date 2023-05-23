const anim = bodymovin.loadAnimation({
    container : document.getElementById("anim-no-product"),
    renderer : 'svg',
    loop : true,
    autoplay : true,
    path : '../assets/js/animated/noProduct.json'
});

const imgP = document.querySelector('.header img')
window.onscroll = ()=>{
    let valScrl = window.scrollY
    imgP.style.top = `${valScrl * 0.5}px`
}

const mainCart = document.querySelector('main.cart')
const inputNumber = mainCart.querySelectorAll('#custom-number')
const plus = mainCart.querySelectorAll('#plus')
const min = mainCart.querySelectorAll('#min')
for( let jn=0; jn<inputNumber.length; jn++ ){
    if( inputNumber[jn].value == '' ){
        inputNumber[jn].value = 1
    }

    if( inputNumber[jn].value >= 20 ) {
        plus[jn].classList.add('this-disabled')
    }else if( inputNumber[jn].value <= 1 ){
        min[jn].classList.add('this-disabled')
    }

    plus[jn].onclick = ()=>{
        updateCart.classList.remove('btn-disabled')
        updateCart.disabled = false

        if( inputNumber[jn].value < 20 ) {
            inputNumber[jn].value = (parseInt(inputNumber[jn].value))+1
            plus[jn].classList.remove('this-disabled')
            min[jn].classList.remove('this-disabled')
        }

        if( inputNumber[jn].value >= 20 ){
            plus[jn].classList.add('this-disabled')
        }
    }
    min[jn].onclick = ()=>{
        updateCart.classList.remove('btn-disabled')
        updateCart.disabled = false

        if( inputNumber[jn].value > 1 ){
            inputNumber[jn].value = (parseInt(inputNumber[jn].value))-1
            plus[jn].classList.remove('this-disabled')
            min[jn].classList.remove('this-disabled')
        }

        if( inputNumber[jn].value <= 1 ){
            min[jn].classList.add('this-disabled')
        }
    }
}

const hideSubmit = document.querySelectorAll('#hide-submit')
const updateCart = document.querySelector('button#update-cart')
updateCart.disabled = true
for( let inc=0; inc<inputNumber.length; inc++ ){
    inputNumber[inc].onkeyup = ()=>{
        updateCart.classList.remove('btn-disabled')
        updateCart.disabled = false
    }
}

updateCart.onclick = ()=>{
    for( let hs2=0; hs2<hideSubmit.length; hs2++ ){
        hideSubmit[hs2].click()
    }
}