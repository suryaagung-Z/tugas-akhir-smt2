const category = document.querySelector('#category')

let swiper = new Swiper('.swiper', {
    spaceBetween: 20,
    loop: true,
    speed: 500,
    loopFillGroupWithBlank: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        0: {
            slidesPerView: 2
        },
        768: {
            slidesPerView: 3
        },
        980: {
            slidesPerView: 4
        }
    }
});

window.addEventListener('scroll', ()=>{

    const limit = 520;

    if( window.scrollY <= limit ){
        swiper.autoplay.stop()
    }else if( window.scrollY >= limit ){
        swiper.autoplay.start()
    }
})

//----------------------------------------------------------------------DIVISION OF NUMBERS
const pirceNum = document.querySelectorAll('#priceNum')
for( let pn=0; pn<pirceNum.length; pn++ ){
    pirceNum[pn].innerText = funcNum(pirceNum[pn].innerText)
}