const ham = document.querySelector('.hamburger');
const nav = document.querySelector('.navv');
const side = document.querySelector('.sidebar');

ham.addEventListener('click',function(){
    ham.classList.toggle('active');
    nav.classList.toggle('active');
    side.classList.toggle('activee')

})


    
