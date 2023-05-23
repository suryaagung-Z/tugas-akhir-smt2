const imgP = document.querySelector('.header img')
window.onscroll = ()=>{
    let valScrl = window.scrollY
    imgP.style.top = `${valScrl * 0.5}px`
}

const eye = document.querySelectorAll('#eye')
const input_pass = document.querySelectorAll('input[type="password"]')

for( let ey=0; ey<eye.length; ey++ ){
    eye[ey].addEventListener('click', ()=>{
        if( input_pass[ey].type == "password" ){
            input_pass[ey].type = "text"
            eye[ey].className = 'far fa-eye'
        }else{
            input_pass[ey].type = "password"
            eye[ey].className = 'fas fa-eye-slash'
        }
    })
}