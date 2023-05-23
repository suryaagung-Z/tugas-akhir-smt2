

//----------------------------------------------------------------------NAVBAR
const link = document.querySelectorAll('nav #link')
const hamburger = document.querySelector('#hamburger')
const nav_bottom = document.querySelector('nav #bottom')
const navbar = document.querySelector('.navbar')
const link_dropdown = document.querySelectorAll('.dropdown a')

const to_top = document.querySelector('#to-top')
const jumbotron = document.querySelector('#jumbotron')
const bottom_best_s = document.querySelector('#best-seller')

hamburger.addEventListener('click', () => {
    navbar.classList.toggle('navbar-toggle')
})

for (let LINK = 0; LINK < link.length; LINK++) {

    //----------------------------------------------CLICK
    link[LINK].addEventListener('click', (e) => {

        let data_target = e.target.getAttribute('data-btnNav')
        if (data_target) {
            e.preventDefault()
            let data_goal = document.querySelector(`[data-target="${data_target}"]`)
            data_goal.classList.toggle('dropdown-click')

            for (let ld = 0; ld < link_dropdown.length; ld++) {
                link_dropdown[ld].addEventListener('click', () => {
                    data_goal.classList.remove('dropdown-click')
                })
            }
        }

    })
    //----------------------------------------------END CLICK
}


//----------------------------------------------HOVER
window.addEventListener('mouseover', (e) => {

    let data_target = e.target.getAttribute('data-btnNav')
    if (data_target) {
        let data_goal = document.querySelector(`[data-target="${data_target}"]`)
        data_goal.classList.add('dropdown-hover')
    }

})

window.addEventListener('mouseout', (e) => {

    let data_target = e.target.getAttribute('data-btnNav')
    if (data_target) {
        let data_goal = document.querySelector(`[data-target="${data_target}"]`)
        data_goal.classList.remove('dropdown-hover')
        data_goal.addEventListener('mouseover', () => {
            data_goal.classList.add('dropdown-hover')
        })
        data_goal.addEventListener('mouseout', () => {
            data_goal.classList.remove('dropdown-hover')
        })
    }

})
//----------------------------------------------END HOVER

window.addEventListener('click', (e) => {
    const closest = e.target.closest('nav')
    if (!closest) {
        navbar.classList.remove('navbar-toggle')
    }
})

window.addEventListener('scroll', () => {
    const navper2 = (nav_bottom.offsetHeight + navbar.offsetHeight) / 2
    const navper3 = navper2 / 2

    if (navbar.matches('.navbar-toggle')) {
        if (window.scrollY >= (navper2 + navper3)) {
            navbar.classList.remove('navbar-toggle')
        }
    }

    const limit = 520;

    if (window.scrollY >= limit) {
        to_top.classList.add('to-top-show')
        to_top.onclick = () => {
            window.scrollTo(0, 0)
        }
    } else {
        to_top.classList.remove('to-top-show')
    }

})

//----------------------------------------------POPUP
const contentPopup = document.querySelector('#box-popup');

const popup = function (text_p) {
    const popup = document.createElement('div');
    popup.classList.add('popup')
    popup.appendChild(document.createTextNode(text_p));
    contentPopup.appendChild(popup);

    setTimeout(() => {
        popup.remove();
        contentPopup.classList.remove('box-popup-bg');
    }, 30000)
}

//----------------------------------------------CHECK POPUP
const lnkChck = document.querySelectorAll('#lnk-chck')
const crossPC = document.querySelector('#cross-popup-chck')
const btnPC = document.querySelectorAll('#btn-popup-chck')

const boxPC = document.querySelector('#box-popup-chck')
const PC = document.querySelector('#popup-chck')

function removeCPC() {
    boxPC.classList.remove('box-popup-chck-enable')
    PC.classList.remove('popup-chck-enable')
}

for (let lc = 0; lc < lnkChck.length; lc++) {
    lnkChck[lc].onclick = (e) => {
        e.preventDefault()
        const href = lnkChck[lc].getAttribute('href')

        boxPC.classList.add('box-popup-chck-enable')
        PC.classList.add('popup-chck-enable')


        crossPC.onclick = () => {
            removeCPC()
        }

        btnPC[0].onclick = () => {
            removeCPC()
        }

        btnPC[1].onclick = () => {
            location.href = href
        }

        window.onclick = (e) => {
            if (boxPC.classList.contains('box-popup-chck-enable')) {
                const closestPC = e.target.closest('#popup-chck')
                const cross = e.target.closest('#lnk-chck')
                if (!(closestPC) && !(cross)) {
                    removeCPC()
                }
            }
        }
    }
}