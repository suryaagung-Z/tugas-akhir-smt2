const policy = document.querySelector('#policy')
const btn_form_page_contact = document.querySelector('#btn-form-page-contact')

policy.addEventListener('change', (e)=>{
    if( policy.checked ){
        btn_form_page_contact.classList.add('btn-form-contact-after')
    }else{
        btn_form_page_contact.classList.remove('btn-form-contact-after')
    }
})