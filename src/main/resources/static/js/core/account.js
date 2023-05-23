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