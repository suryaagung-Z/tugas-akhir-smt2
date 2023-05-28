const imgP = document.querySelector('.header img')
window.onscroll = ()=>{
    let valScrl = window.scrollY
    imgP.style.top = `${valScrl * 0.5}px`
}

const btn_wajib = document.querySelectorAll('#btn_move')
const attrContentMove = document.querySelectorAll(`[data-contentMove]`)

for( let b=0; b<btn_wajib.length; b++ ){
    btn_wajib[b].onclick = (e)=>{
        e.preventDefault()

        for( let bb=0; bb<btn_wajib.length; bb++ ){
            btn_wajib[bb].classList.remove('move-link-bg')
        }
        
        // manage btnMove
        const attrBtnMove = e.target.getAttribute('data-btnMove')
        const btnMove = document.querySelector(`[data-btnMove="${attrBtnMove}"]`)
        btnMove.classList.add('move-link-bg')

        // manage contentMove
        const contentMove = document.querySelector(`[data-contentMove="${attrBtnMove}"]`)
        for( let c=0; c<attrContentMove.length; c++ ){
            attrContentMove[c].classList.add('move-hide')
        }
        contentMove.classList.remove('move-hide')
    }
}

//----------------------------------------------------------------------CHECK POPUP
lnkChck[0].onclick = (e)=>{
    e.preventDefault()

    const href = lnkChck[0].getAttribute('href')
    const text = lnkChck[0].getAttribute('data-textPC')

    boxPC.classList.add('box-popup-chck-enable')
    PC.classList.add('popup-chck-enable')
    textPC.innerHTML = text

    btnPC[1].onclick = ()=>{
        location.href = `${href}`
    }

    btnPC[0].onclick = ()=>{
        removeCPC()
    }

    crossPC.onclick = ()=>{
        removeCPC()
    }

    window.onclick = (e)=>{
        const closestPC = e.target.closest('#popup-chck')
        const cross = e.target.closest('.lnk-chck')
        if( !(closestPC) && !(cross) ){
            removeCPC()
        }
    }
}

//----------------------------------------------------------------------SAVE PERSONAL DATA
const formPersonalData = document.querySelector('#personalData')
const btnPersonalData = formPersonalData.querySelector('#btnPersonalData')
btnPersonalData.disabled = true
const valPersonalData = formPersonalData.querySelectorAll('input')

btnPersonalData.onclick = (e)=>{
    e.preventDefault()
    
    const url = formPersonalData.getAttribute('data-url')
    const data = {};
    for( let vpd=0; vpd<valPersonalData.length; vpd++ ){
        const name = valPersonalData[vpd].getAttribute('name')
        const value = valPersonalData[vpd].value
        data[`${name}`] = `${value}`
    }
    
    const personalData = new XMLHttpRequest()
    personalData.open('POST', `${url}`, true)
    personalData.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    personalData.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    personalData.send(`data=${JSON.stringify(data)}`)
    personalData.onreadystatechange = ()=>{
        if( (personalData.readyState == 4) && (personalData.status == 200) ){
            const result = JSON.parse(personalData.responseText)

            if( result.redirect !== undefined ){
                window.location.replace(`${result.redirect}`)
                return
            }

            popup(result.message, result.bg)
            btnPersonalData.classList.add('bdpd')
            btnPersonalData.disabled = true
        }
    }
}

//----------------------------------------------------------------------IF INPUT CHANGES
for( let cvd=0; cvd<valPersonalData.length; cvd++ ){
    valPersonalData[cvd].onkeyup = ()=>{
        btnPersonalData.classList.remove('bdpd')
        btnPersonalData.disabled = false
    }
}