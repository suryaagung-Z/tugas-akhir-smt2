const widthBox = document.querySelector('main.detail-product .right form')
const inputNumber = widthBox.querySelector('#custom-number')
const plus = widthBox.querySelector('#plus')
const min = widthBox.querySelector('#min')
if( inputNumber.value == '' ){
    inputNumber.value = 1
}

plus.onclick = ()=>{
    if( inputNumber.value < 20 ) inputNumber.value = (parseInt(inputNumber.value))+1
}
min.onclick = ()=>{
    if( inputNumber.value > 1 ) inputNumber.value = (parseInt(inputNumber.value))-1
}




const imgVW = document.querySelector('main.detail-product #imgVW')
const btnShow = document.querySelector('#detail-btnShow')
const closeDetail = document.querySelector('main.detail-product .left #detailCross')

function dataImgRL(){
    const imgRL = document.querySelector('main.detail-product #img-rl').getBoundingClientRect()
    let w = imgRL.width
    let h = imgRL.height
    let x = imgRL.top
    let y = imgRL.left

    const obj = {
        w : w,
        h : h,
        x : x,
        y : y
    }
    return obj;
}

function follow(){
    imgVW.style.width = `${dataImgRL().w}px`
    imgVW.style.height = `${dataImgRL().h}px`
    imgVW.style.top = `${dataImgRL().x}px`
    imgVW.style.left = `${dataImgRL().y}px`
}

follow()

window.onresize = ()=>{
    follow()
}

window.onscroll = ()=>{
    follow()
    imgVW.classList.remove('target-vw-show')
}

btnShow.onclick = ()=>{
    imgVW.classList.add('target-vw-show')
}

closeDetail.onclick = ()=>{
    imgVW.classList.remove('target-vw-show')
    if( document.fullscreenElement ){
        fullScreen.classList.remove('fa-compress')
        fullScreen.classList.add('fa-expand')
        document.exitFullscreen()
    }
}

const fullScreen = document.querySelector('#btnFullScreen')
fullScreen.onclick = ()=>{
    if( fullScreen.classList.contains('fa-expand') ){
        fullScreen.classList.remove('fa-expand')
        fullScreen.classList.add('fa-compress')
        imgVW.requestFullscreen()
    }else{
        fullScreen.classList.remove('fa-compress')
        fullScreen.classList.add('fa-expand')
        document.exitFullscreen()
    }
}

window.onclick = (e)=>{
    if( imgVW.classList.contains('target-vw-show') ){
        if( !e.target.matches('.not-close') ){
            if( document.fullscreenElement ){
                fullScreen.classList.remove('fa-compress')
                fullScreen.classList.add('fa-expand')
                document.exitFullscreen()
            }
            imgVW.classList.remove('target-vw-show')
        }
    }
}