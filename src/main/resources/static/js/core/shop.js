const funcNum = (value)=>{
    const slice = 3
    if( value.length <= slice ) return value

    const result_mdls = value.length % slice
    
    if( result_mdls == 0 ) {
        firstNum = value.slice(0, slice)
        afterFirst = value.slice(slice)
    }else{
        firstNum = value.slice(0, result_mdls)
        afterFirst = value.slice(result_mdls)
    }

    const xc = afterFirst.split( /(?<=^(?:.{3})+)/ )
    xc.forEach( (item, index, arr) => {
        arr[index] = `.${item}`
    });
    
    return firstNum.concat(xc).replaceAll(',', '')
}

var myRange = document.getElementById('my-range')

noUiSlider.create(myRange, {
    start: [0, 5000000],
    step: 100000,
    behaviour: 'drag',
    connect: true,
    range: {
        'min': 0,
        'max': 5000000
    }
})

const low = document.getElementById('low')
const high = document.getElementById('high')

myRange.noUiSlider.on('update', (values)=> {
    let v1 = values[0].split('.')
    let v2 = values[1].split('.')
    v1.pop()
    v2.pop()

    String(v1)
    String(v2)

    low.innerText = funcNum(v1[0])
    high.innerText = funcNum(v2[0])

})

const btnFilter = document.querySelector('#btn-filter')
const filterShop = document.querySelector('#filter-shop')
const xFilter = document.querySelector('.head-filter i')
btnFilter.onclick = ()=>{
    filterShop.classList.add('show-filter-shop')
    btnFilter.classList.add('hide-btn-filter')
}

xFilter.onclick = ()=>{
    filterShop.classList.remove('show-filter-shop')
    btnFilter.classList.remove('hide-btn-filter')
}

window.onscroll = ()=>{
    if( window.scrollY+window.innerHeight < document.body.offsetHeight ) {
        btnFilter.classList.remove('hide-btn-filter')
    }else {
        btnFilter.classList.add('hide-btn-filter')
    }
    
}