
//----------------------------------------------------------------------ANIM
const myAnim = document.getElementById("anim-no-product")
const anim = bodymovin.loadAnimation({
    container : myAnim,
    renderer : 'svg',
    loop : true,
    autoplay : true,
    path : `${myAnim.getAttribute('data-lnkAnim')}`
});

const imgP = document.querySelector('.header img')
window.onscroll = ()=>{
    let valScrl = window.scrollY
    imgP.style.top = `${valScrl * 0.5}px`
}

//----------------------------------------------------------------------CUSTOM INPUT NUMBER
const mainCart = document.querySelector('main.cart')
const inputNumber = mainCart.querySelectorAll('#custom-number')
const plus = mainCart.querySelectorAll('#plus')
const min = mainCart.querySelectorAll('#min')

for( let jn=0; jn<inputNumber.length; jn++ ){
    if( inputNumber[jn].value == '' ){
        inputNumber[jn].value = 1
    }

    if( inputNumber[jn].value >= 20 ) {
        plus[jn].classList.add('btnCustomNumber-disabled')
    }else if( inputNumber[jn].value <= 1 ){
        min[jn].classList.add('btnCustomNumber-disabled')
    }

    plus[jn].onclick = ()=>{
        updateCart.classList.remove('btn-disabled')
        updateCart.disabled = false

        if( inputNumber[jn].value < 20 ) {
            inputNumber[jn].value = (parseInt(inputNumber[jn].value))+1
            plus[jn].classList.remove('btnCustomNumber-disabled')
            min[jn].classList.remove('btnCustomNumber-disabled')
        }

        if( inputNumber[jn].value >= 20 ){
            plus[jn].classList.add('btnCustomNumber-disabled')
        }
    }

    min[jn].onclick = ()=>{
        updateCart.classList.remove('btn-disabled')
        updateCart.disabled = false

        if( inputNumber[jn].value > 1 ){
            inputNumber[jn].value = (parseInt(inputNumber[jn].value))-1
            plus[jn].classList.remove('btnCustomNumber-disabled')
            min[jn].classList.remove('btnCustomNumber-disabled')
        }

        if( inputNumber[jn].value <= 1 ){
            min[jn].classList.add('btnCustomNumber-disabled')
        }
    }

    inputNumber[jn].onkeyup = ()=>{
        updateCart.classList.remove('btn-disabled')
        updateCart.disabled = false

        if( inputNumber[jn].value.charAt(0) == '0' ){
            inputNumber[jn].value = 1
        }

        if( inputNumber[jn].value > 20 ){
            inputNumber[jn].value = 20
        }
    
        if( !isNumeric(inputNumber[jn].value) ){
            inputNumber[jn].value = 1
        }
    }
}

//----------------------------------------------------------------------UPDATE MULTIPLE
const updateCart = document.querySelector('button#update-cart')
if(updateCart != null) updateCart.disabled = true
if(updateCart != null) updateCart.onclick = ()=>{
                            for( let inc=0; inc<inputNumber.length; inc++ ){
                                if(inputNumber[inc].value == ''){
                                    inputNumber[inc].value = 1
                                }
                            }

                            const getProduct = document.querySelectorAll('#product')
                            const url = document.querySelector('.content table').getAttribute('data-urlUpdate')
                            const data = []
                            for( let gp=0; gp<getProduct.length; gp++ ){
                                const idP = getProduct[gp].getAttribute('data-idP')
                                const quantity = getProduct[gp].querySelector('#custom-number').value
                                data.push({
                                    idP      : idP,
                                    quantity : quantity
                                })
                            }
                            
                            const upm = new XMLHttpRequest()
                            upm.open('POST', `${url}`, true)
                            upm.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
                            upm.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
                            upm.send(`data=${JSON.stringify(data)}`)
                            upm.onreadystatechange = ()=>{
                                if( (upm.readyState == 4) && (upm.status  == 200) ){
                                    const result = JSON.parse(upm.responseText)

                                    if( result.redirect !== undefined ){
                                        window.location.replace(`${result.redirect}`)
                                        return
                                    }

                                    if( result.message !== undefined ){
                                        popup(`${result.message}`, `${result.bg}`)
                                        if((result.die !== undefined) && (result.die === true)) return
                                    }

                                    for( let p=0; p<result.popup.length; p++ ){
                                        if( p > 0 ){
                                            setTimeout(()=>{
                                                popup(`${result.popup[p].text}`, `${result.popup[p].bg}`)
                                            }, 500)
                                        }else{
                                            popup(`${result.popup[p].text}`, `${result.popup[p].bg}`)
                                        }
                                    }

                                    for( let du=0; du<result.dataUpdate.length; du++ ){
                                        const getElm = document.querySelector(`.content #product[data-idP="${result.dataUpdate[du].id_product}"]`)
                                        const getSub = getElm.querySelector('#subtotal #priceNum')
                                        getSub.innerHTML = `${funcNum(result.dataUpdate[du].subtotal)}`
                                    }

                                    const getTotal = document.querySelectorAll('.bottom .box-right #priceNum')
                                    getTotal[0].innerHTML = `${funcNum(result.total)}`
                                    getTotal[1].innerHTML = `${funcNum(result.total)}`

                                    updateCart.classList.add('btn-disabled')
                                    updateCart.disabled = true
                                }
                            }
                        }


//----------------------------------------------------------------------PRICE NUM
const pirceNum = document.querySelectorAll('#priceNum')
for( let pn=0; pn<pirceNum.length; pn++ ){
    pirceNum[pn].innerText = funcNum(pirceNum[pn].innerText)
}

//----------------------------------------------------------------------CHECK POPUP

//ASSETS AJAX
const boxContent = document.querySelector('main.cart .content')
const subtotal = document.querySelector('main.cart .subtotal')
const total = document.querySelector('main.cart .total')
const boxAnim = document.querySelector('main.cart .ifNotContent')
//===

for( let lc=0; lc<lnkChck.length; lc++ ){
    lnkChck[lc].onclick = (e)=>{
        e.preventDefault()

        const href = lnkChck[lc].getAttribute('href')
        const text = lnkChck[lc].getAttribute('data-textPC')
        const getParent = lnkChck[lc].closest('#product')
        if(getParent) id = getParent.getAttribute('data-idP')
        // console.log(href)
        // return

        addCPC(text)
                
        btnPC[1].onclick = ()=>{
            const dltItem = new XMLHttpRequest()
            dltItem.open('POST', `${href}`, true)
            dltItem.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
            dltItem.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
            let data = { idP : id }
            dltItem.send(`data=${JSON.stringify(data)}`)
            dltItem.onreadystatechange = ()=>{
                if( (dltItem.readyState == 4) && (dltItem.status == 200) ){
                    const result = JSON.parse(dltItem.responseText)
                    
                    if( result.redirect !== undefined ){
                        window.location.replace(`${result.redirect}`)
                        return
                    }

                    if( result.message !== undefined ){
                        popup(result.message, result.bg)
                        if((result.die !== undefined) && (result.die === true)) return
                    }

                    if( result.status == true ){
                        const product = lnkChck[lc].parentNode.parentNode
                        product.remove()
                        if( !(result.subtotal == null) ){
                            subtotal.innerHTML = funcNum(result.subtotal)
                            total.innerHTML = funcNum(result.subtotal)
                        }else{
                            boxContent.remove()
                            boxAnim.classList.remove('ifNotContent-disable')
                        }
                    }
                }
            }
            removeCPC()
        }

        btnRemoveCPC()
    }
}