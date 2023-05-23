const category = document.querySelector('#category')

var swiper = new Swiper('.swiper', {
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
})

window.addEventListener('scroll', ()=>{

    const limit = 520;

    if( window.scrollY <= limit ){
        swiper.autoplay.stop()
    }else if( window.scrollY >= limit ){
        swiper.autoplay.start()
    }
})

var typed = new Typed('#my-typing', {
    strings: [
        'furniture',
        'design'
    ],
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000,
    loop: true
})