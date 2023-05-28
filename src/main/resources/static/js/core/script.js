//----------------------------------------------------------------------URL PARAMS
function urlParams(_var, _val, _get=null){
    const urlCurrent = window.location.href;
    const urlParams = new URL(urlCurrent);
    const src_params = urlParams.searchParams;
    src_params.set(`${_var}`, `${_val}`);
    urlParams.search = src_params.toString();

    return {url : urlParams.toString(), get : src_params.get(_get)};
}

//----------------------------------------------------------------------NAVBAR
const link = document.querySelectorAll('nav #link');
const hamburger = document.querySelector('#hamburger');
const nav_bottom = document.querySelector('nav #bottom');
const navbar = document.querySelector('.navbar');
const link_dropdown = document.querySelectorAll('.dropdown a');

const to_top = document.querySelector('#to-top');
const jumbotron = document.querySelector('#jumbotron');
const bottom_best_s = document.querySelector('#best-seller');

hamburger.addEventListener('click', ()=>{
    navbar.classList.toggle('navbar-toggle');
})

for( let LINK=0; LINK<link.length; LINK++ ){

    //----------------------------------------------CLICK
    link[LINK].addEventListener('click', (e)=>{
        
        let data_target = e.target.getAttribute('data-btnNav');
        if( data_target ){
            e.preventDefault();
            let data_goal = document.querySelector(`[data-target="${data_target}"]`);
                data_goal.classList.toggle('dropdown-click');

            for( let ld=0; ld<link_dropdown.length; ld++ ){
                link_dropdown[ld].addEventListener('click', ()=>{
                    data_goal.classList.remove('dropdown-click');
                })
            }
        }
        
    })
    //----------------------------------------------END CLICK
}


//----------------------------------------------HOVER
window.addEventListener('mouseover', (e)=>{

    let data_target = e.target.getAttribute('data-btnNav')
    if( data_target ){
        let data_goal = document.querySelector(`[data-target="${data_target}"]`);
            data_goal.classList.add('dropdown-hover');
    }
    
})

window.addEventListener('mouseout', (e)=>{

    let data_target = e.target.getAttribute('data-btnNav');
    if( data_target ){
        let data_goal = document.querySelector(`[data-target="${data_target}"]`);
            data_goal.classList.remove('dropdown-hover');
            data_goal.addEventListener('mouseover', ()=>{
                data_goal.classList.add('dropdown-hover');
            })
            data_goal.addEventListener('mouseout', ()=>{
                data_goal.classList.remove('dropdown-hover');
            })
    }

})
//----------------------------------------------END HOVER

window.addEventListener('click', (e)=>{
    const closest = e.target.closest('nav');
    if( !closest ){
        navbar.classList.remove('navbar-toggle');
    }
})

window.addEventListener('scroll', ()=>{
    const navper2 = (nav_bottom.offsetHeight + navbar.offsetHeight) / 2;
    const navper3 = navper2 / 2;
    
    if( navbar.matches('.navbar-toggle') ){
        if( window.scrollY >= ( navper2 + navper3 ) ){
            navbar.classList.remove('navbar-toggle');
        }
    }

    const limit = 520;

    if( window.scrollY >= limit ){
        to_top.classList.add('to-top-show')
        to_top.onclick = ()=>{
            window.scrollTo(0,0);
        }
    }else{
        to_top.classList.remove('to-top-show');
    }

})

//----------------------------------------------------------------------POPUP
const contentPopup = document.querySelector('#box-popup');

const popup = function(text_p, bg){
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.classList.add(bg);
    popup.appendChild(document.createTextNode(text_p));
    contentPopup.appendChild(popup);
    
        setTimeout(()=>{
            popup.remove();
            contentPopup.classList.remove('box-popup-bg');
        }, 5000);
}

//----------------------------------------------------------------------BTN DISABLED
const addcartdisable = document.querySelectorAll('#addtocart-disable');
for( let acd=0; acd<addcartdisable.length; acd++ ){
    addcartdisable[acd].onclick = (e)=>{
        e.preventDefault();
    }
}

//----------------------------------------------DIVISION OF NUMBERS
const funcNum = (val)=>{
    let value = String(val);

    const slice = 3;
    if( value.length <= slice ) return value;

    const result_mdls = value.length % slice;

    if( result_mdls == 0 ) {
        firstNum = value.slice(0, slice);
        afterFirst = value.slice(slice);
    }else{
        firstNum = value.slice(0, result_mdls);
        afterFirst = value.slice(result_mdls);
    }

    const xc = afterFirst.split( /(?<=^(?:.{3})+)/ );
    xc.forEach( (item, index, arr) => {
        arr[index] = `.${item}`;
    })
    
    return firstNum.concat(xc).replaceAll(',', '');
}

//----------------------------------------------ASSETS GET POPUP CHECK
const lnkChck = document.querySelectorAll('.lnk-chck');
const crossPC = document.querySelector('#cross-popup-chck');
const btnPC = document.querySelectorAll('#btn-popup-chck');

const boxPC = document.querySelector('#box-popup-chck');
const PC = document.querySelector('#popup-chck');
const textPC = boxPC.querySelector('.text');

function addCPC(text){
    boxPC.classList.add('box-popup-chck-enable');
    PC.classList.add('popup-chck-enable');
    textPC.innerHTML = text;
}

function removeCPC(){
    boxPC.classList.remove('box-popup-chck-enable');
    PC.classList.remove('popup-chck-enable');
}

function btnRemoveCPC(){
    crossPC.onclick = ()=>{
        removeCPC();
    }
    
    btnPC[0].onclick = ()=>{
        removeCPC();
    }

    window.onclick = (e)=>{
        if( boxPC.classList.contains('box-popup-chck-enable') ){
            const closestPC = e.target.closest('#popup-chck');
            const cross = e.target.closest('.lnk-chck');
            if( !(closestPC) && !(cross) ){
                removeCPC();
            }
        }
    }
}

//----------------------------------------------STRING NUMERIC
function isNumeric(val) {
    return /^-?\d+$/.test(val);
}