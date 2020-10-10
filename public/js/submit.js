const form = document.querySelector('#form');
const errs = document.querySelector('.errors');
const suc = document.querySelector('.success');
const btn = document.querySelector('.contact-btn');
console.log('YOu in the form');
console.log(form);

btn.addEventListener('click', e => { 
    e.preventDefault();
let errors = [];
    const data = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        subject: form.subject.value,
        message: form.message.value
    };
    if(!data.email){
        errors.push({ msg: "please enter your email" });
    }
    if(!data.phone){
        errors.push({ msg: "please enter your phone" });
    }
    if(!data.name){
        errors.push({ msg: "please enter your name" });
    }
    if(!data.message){
        errors.push({ msg: "please enter your message" });
    }
    if(errors.length > 0) {
        errors.forEach(error => {
            const li = document.createElement('li');
            li.classList += 'alert alert-danger';
            li.textContent = error.msg;
            errs.appendChild(li);
        });
        setTimeout(() => {
            errs.innerHTML = '';
        }, 2200);
       
        console.log(errors);
        return errors;
    }
   
    $.ajax({
        method: 'POST',
        url: '/',
        data: data,
        success: function(data){
            const li = document.createElement('li');
            li.classList += 'alert alert-success';
            li.textContent = 'message sent successfully';
            suc.appendChild(li);
            console.log('All went write');
        },
        fail: function (err) { 
            console.error(err + " An error occured when sending");
         }
    });
    form.reset();
    console.log('YOu submit me');
}); 