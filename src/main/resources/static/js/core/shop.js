
const time = 1000;
const spinner = document.querySelectorAll('#boxLoading');
const script = document.querySelectorAll('script');
const allBoxP = document.querySelectorAll('#box-product');

function funcSpinner(type){
    if( type == 'enable' ){
        for(let ld=0; ld<spinner.length; ld++){
            spinner[ld].classList.remove('boxLoading-hide');
        }
    }else if( type == 'disable' ){
        for(let ld=0; ld<spinner.length; ld++){
            spinner[ld].classList.add('boxLoading-hide');
        }
    }
}

//----------------------------------------------------------------------DIVISION OF NUMBERS
const priceNum = document.querySelectorAll('#priceNum')
for( let pn=0; pn<priceNum.length; pn++ ){
    priceNum[pn].innerText = funcNum(priceNum[pn].innerText);
}

//----------------------------------------------------------------------ANIM NO RESULT
const myAnim = document.getElementById("animNoResult");
if( (myAnim != null) || (myAnim != undefined) ){
    const anim = bodymovin.loadAnimation({
        container : myAnim,
        renderer : 'svg',
        loop : true,
        autoplay : true,
        path : `${myAnim.getAttribute('data-lnkAnim')}`
    });
}

//----------------------------------------------------------------------PRICE SLIDER
let myRange = document.getElementById('my-range');
noUiSlider.create(myRange, {
    start: [0, 10000000],
    step: 50000,
    behaviour: 'drag',
    connect: true,
    range: {
        'min': 0,
        'max': 10000000
    }
});

const low = document.getElementById('low');
const high = document.getElementById('high');
myRange.noUiSlider.on('update', (values)=> {
    const v1 = values[0].split('.');
    const v2 = values[1].split('.');
    v1.pop();
    v2.pop();
    low.innerText = funcNum(v1[0]);
    high.innerText = funcNum(v2[0]);
})
const urlGetSL = urlParams(null, null, 'price').get
if( urlGetSL != null ){
    const valUrlUi = decodeURI(urlGetSL).split('|');
    myRange.noUiSlider.set([valUrlUi[0], valUrlUi[1]]);
}

//----------------------------------------------------------------------FILTER CATEGORY
const filterCategory = document.querySelectorAll('#filterCategory');
const urlFC = 'ctg';
for( let val of filterCategory){
    val.onclick = (e)=>{
        e.preventDefault();

        const text = e.target.getAttribute("data-idbarang");
        const parseUrl = urlParams(urlFC, encodeURI(text));
        window.location.href = parseUrl.url;
    }
}

for( let val of filterCategory ){
    const urlGetFC = urlParams(null, null, urlFC);
    if(val.innerText.includes(decodeURI(urlGetFC.get))){
        val.classList.add('red-active');
        val.parentElement.classList.add('black-active');
    }
}

//----------------------------------------------------------------------PRICE FILTER
const priceFilter = document.querySelector('#priceFilter');

const contentShop = document.querySelector('.content-shop');
const animNoResult = document.querySelector('main.shop .box-animNoResult');
const valNoResult = document.querySelector('main.shop #valNoResult');

priceFilter.onclick = (e)=>{
    e.preventDefault();
    
    const val = myRange.noUiSlider.get();
    const v1 = val[0].split('.');
    const v2 = val[1].split('.');
    v1.pop();
    v2.pop();

    const parseUrl = urlParams('price', encodeURI(`${+v1}|${+v2}`));
    window.location.href = parseUrl.url;
}

//----------------------------------------------------------------------LIVE SEARCH
const inputSrc = document.querySelector('main.shop input#src-product');
const btnSrc = document.querySelector('.search-product #btnSrc');
const clssBoxDisable = 'box-product-disabled';
const urlSRC = 'src';

function src(){
    const srcValue = inputSrc.value;
    if(srcValue == '') return;
    const parseUrl = urlParams(urlSRC, srcValue);
    window.location.href = parseUrl.url;
}

btnSrc.onclick = ()=>{ src() }
inputSrc.onkeyup = (e)=>{ if( e.keyCode == 13 ) src() }

const urlGetSRC = urlParams(null, null, urlSRC);
inputSrc.value = urlGetSRC.get != null ? decodeURI(urlGetSRC.get) : "";

//----------------------------------------------------------------------SHOW FILTER ON MOBILE
const btnFilter = document.querySelector('#btn-filter');
const filterShop = document.querySelector('#filter-shop');
const xFilter = document.querySelector('.head-filter i');

//MOBILE
btnFilter.onclick = ()=>{
    filterShop.classList.add('show-filter-shop');
    btnFilter.classList.add('hide-btn-filter');
}

//MOBILE
xFilter.onclick = ()=>{
    filterShop.classList.remove('show-filter-shop');
    btnFilter.classList.remove('hide-btn-filter');
}

//MOBILE
window.onscroll = ()=>{
    if( window.scrollY+window.innerHeight < document.body.offsetHeight ) {
        btnFilter.classList.remove('hide-btn-filter');
    }else {
        btnFilter.classList.add('hide-btn-filter');
    }   
}

//----------------------------------------------------------------------SELECT FILTER
const filterSelect = document.querySelector('#sortir');
const strFS = 'fs';
filterSelect.onchange = ()=>{
    const val = filterSelect.value;

    const parseUrl = urlParams(strFS, encodeURI(val));
    window.location.href = parseUrl.url;
}

const urlGetFS = urlParams(null, null, strFS);
const allValueFS = filterSelect.querySelectorAll('option');
for( let val of allValueFS ){
    if(val.value.includes(decodeURI(urlGetFS.get))){
        filterSelect.value = decodeURI(urlGetFS.get);
    }
}

//----------------------------------------------------------------------CHANGES VALUES
