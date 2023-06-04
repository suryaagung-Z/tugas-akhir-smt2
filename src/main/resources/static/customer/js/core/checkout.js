//----------------------------------------------------------------------PARALLAX
const imgP = document.querySelector('.header img')
window.onscroll = ()=>{
    let valScrl = window.scrollY
    imgP.style.top = `${valScrl * 0.5}px`
}

//----------------------------------------------------------------------SLIDER FADED
const mainBox = document.querySelector('#main-box')
const myPrevNext = document.querySelectorAll('#myprevnext')
function fade(elmn, type){
    let nextElmn, prevElmn
    if( type == 'next' ){
        if( !(elmn == null) ){
            elmn.classList.add('each-form-hide')
            elmn.classList.remove('current')
            nextElmn = elmn.nextElementSibling
            if( !(nextElmn == null) ){
                nextElmn.classList.remove('each-form-hide')
                nextElmn.classList.add('current')
            }else { return }

            if( elmn.nextElementSibling.nextElementSibling == null ){
                myPrevNext[1].classList.add('pnDisabled')
            }
            myPrevNext[0].classList.remove('pnDisabled')
            
        }else { return }
        
    }else if( type == 'prev' ){
        if( !(elmn == null) ){
            elmn.classList.add('each-form-hide')
            elmn.classList.remove('current')
            prevElmn = elmn.previousElementSibling
            if( !(prevElmn == null) ){
                prevElmn.classList.remove('each-form-hide')
                prevElmn.classList.add('current')
            }else { return }

            if( elmn.previousElementSibling.previousElementSibling == null ){
                myPrevNext[0].classList.add('pnDisabled')
            }
            myPrevNext[1].classList.remove('pnDisabled')
        }else { return }
    }
}

function elm(){
    return document.querySelector('.core-box .current')
}

myPrevNext[0].onclick = ()=>{
    window.scrollTo(0, (mainBox.offsetTop))
    fade( elm(), 'prev' )
}

myPrevNext[1].onclick = ()=>{
    window.scrollTo(0, (mainBox.offsetTop))
    fade( elm(), 'next' )
}

//----------------------------------------------------------------------CHOOSE COURIER
const inputAll = document.querySelectorAll('.ir')
const slct = document.querySelector('#type-courier')
const chooseT = document.querySelectorAll('.sharing-box3 .choose-t')

slct.onchange = ()=>{
    const val = slct.value
    for( let ct=0; ct<chooseT.length; ct++ ){
        chooseT[ct].classList.add('tfc-hide')
    }
    document.querySelector(`[data-tfc="${val}"]`).classList.remove('tfc-hide')
}

//----------------------------------------------------------------------FUNC NUM PRICE
const priceNum = document.querySelectorAll('#numPrice')
for( let pn=0; pn<priceNum.length; pn++ ){
    const text = priceNum[pn].innerText
    priceNum[pn].innerHTML = funcNum(text)
}