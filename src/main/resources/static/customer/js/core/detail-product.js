const widthBox = document.querySelector('main.detail-product .right .ac')
const inputNumber = widthBox.querySelector('#custom-number')
const plus = widthBox.querySelector('#plus')
const min = widthBox.querySelector('#min')
if( inputNumber.value == '' ){
    inputNumber.value = 1
}

if( inputNumber.value >= 20 ) {
    plus.classList.add('btnCustomNumber-disabled')
}else if( inputNumber.value <= 1 ){
    min.classList.add('btnCustomNumber-disabled')
}

inputNumber.onkeyup = ()=>{
    btnAdd.setAttribute('data-quantity', `${inputNumber.value}`)
    btnAdd.disabled = false

    if( inputNumber.value.charAt(0) == '0' ){
        inputNumber.value = 1
    }

    if( inputNumber.value > 20 ){
        inputNumber.value = 20
    }
    
    if( !isNumeric(inputNumber.value) ){
        inputNumber.value = 1
    }
}

plus.onclick = ()=>{
    if( inputNumber.value < 20 ) {
        inputNumber.value = (parseInt(inputNumber.value))+1
        plus.classList.remove('btnCustomNumber-disabled')
        min.classList.remove('btnCustomNumber-disabled')
    }
    
    if( inputNumber.value >= 20 ){
        plus.classList.add('btnCustomNumber-disabled')
    }
    btnAdd.setAttribute('data-quantity', `${inputNumber.value}`)
}

min.onclick = ()=>{
    if( inputNumber.value > 1 ){
        inputNumber.value = (parseInt(inputNumber.value))-1
        plus.classList.remove('btnCustomNumber-disabled')
        min.classList.remove('btnCustomNumber-disabled')
    }
    
    if( inputNumber.value <= 1 ){
        min.classList.add('btnCustomNumber-disabled')
    }
    btnAdd.setAttribute('data-quantity', `${inputNumber.value}`)
}

//----------------------------------------------------------------------IMAGE SHOW
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

//----------------------------------------------------------------------DIVISION OF NUMBERS
const priceNum = document.querySelectorAll('#priceNum')
for( let pn=0; pn<priceNum.length; pn++ ){
    priceNum[pn].innerText = funcNum(priceNum[pn].innerText)
}

//----------------------------------------------------------------------AJAX ADD TO CART
const btnAdd = document.querySelector('#addToCart')
if( !(btnAdd == null) ){
    btnAdd.onclick = (e)=>{
        e.preventDefault()
        
        if( inputNumber.value == '' ){
            inputNumber.value = 1
        }
        
        const dataIp = btnAdd.getAttribute('data-ip')
        const dataQt = btnAdd.getAttribute('data-quantity')
        const url = btnAdd.getAttribute('data-url')
        const text = btnAdd.getAttribute('data-textPC')
        
        if( (dataIp == null) || (url == null) || (dataQt == '') ){
            popup('🙂 Maaf', 'popup-r')
            return
        }
        
        // CONFIRM ADD TO CART
        addCPC(text)
        
        btnPC[1].onclick = ()=>{
            const addCart = new XMLHttpRequest()
            addCart.open('POST', `${url}`, true)
            addCart.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            addCart.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
            const data = {
                idP      : dataIp,
                quantity : dataQt
            }
            addCart.send(`data=${JSON.stringify(data)}`)
            addCart.onreadystatechange = ()=>{
                if( (addCart.readyState == 4) && (addCart.status == 200) ){
                    const result = JSON.parse(addCart.responseText)

                    if( result.redirect !== undefined ){
                        window.location.replace(`${result.redirect}`)
                        return
                    }
                    
                    if( result.message !== undefined ){
                        popup(`${result.message}`, `${result.bg}`)
                    }
                    
                    if( result.status ){
                        btnAdd.innerHTML = 'sudah di keranjang <i class="fas fa-check"></i>'
                        btnAdd.setAttribute('id', 'addtocart-disable')
                        btnAdd.removeAttribute('data-ip')
                        btnAdd.removeAttribute('data-url')
                        btnAdd.disabled = true
                        document.querySelector('.custom-number').classList.add('btnCustomNumber-disabled')
                    }
                }
            }
            removeCPC()
        }
        btnRemoveCPC()
    }
}

//----------------------------------------------------------------------AJAX ADD TO CART
const elmCopyUrl = document.querySelectorAll('#copyUrl')
for( let cu=0; cu<elmCopyUrl.length; cu++ ){
    elmCopyUrl[cu].onclick = (e)=>{
        e.preventDefault()
        const url = window.location.href
        navigator.clipboard.writeText(url)
        popup('✔️ Berhasil copy url', 'popup-g')
    }
}

//----------------------------------------------------------------------CATEGORY LINK
const categorylink = document.querySelector('#categoryLink')
categorylink.onclick = (e)=>{
    e.preventDefault()
    const text = categorylink.innerText
    const url = encodeURI(categorylink.getAttribute('data-url'))
    window.location.href = `${url}?ctg=${text}`
}