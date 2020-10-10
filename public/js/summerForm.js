const form = document.querySelector('#summerForm');
const errs = document.querySelector('.errors');
const suc = document.querySelector('.success');
const btn = document.querySelector('.contact-btn');
console.log('YOu in the form');
console.log(form);

btn.addEventListener('click', e => { 
    e.preventDefault();
let errors = [];
    const data = {
        name1: form.name1.value,
        name2: form.name2.value,
        email: form.email.value,
        address1: form.address1.value,
        address2: form.address2.value,
        city: form.city.value,
        region: form.region.value,
        code: form.code.value,
        area: form.area.value,
        phone: form.phone.value,
        question1: form.question1.value,
        question2: form.question2.value,
        series: form.series.value,
        question3: form.question3.value,
        question4: form.question4.value,
        question5: form.question5.value,
        question6: form.question6.value,
        question7: form.question7.value,
        question8: form.question8.value,
        question9: form.question9.value,
        question10: form.question10.value,
        message1: form.message1.value,
        message2: form.message2.value,
        message3: form.message3.value,
        message4: form.message4.value,
        message5: form.message5.value
    };
    if(!data.name1){
        errors.push({ msg: "please enter your name" });
    }
    if(!data.email){
        errors.push({ msg: "please enter your email" });
    }
    if(!data.address1){
        errors.push({ msg: "please enter your address" });
    }
    if(!data.question2){
        errors.push({ msg: "please answer the question about your current school" });
    }
    if(!data.question3){
        errors.push({ msg: "please answer the question about O/A Level" });
    }
    if(!data.question8){
        errors.push({ msg: "please answer the question about clubs on campus" });
    }
    if(!data.question9){
        errors.push({ msg: "please enter the position and mandate period" });
    }
    if(!data.message3){
        errors.push({ msg: "please enter your message" });
    }
    if(!data.message4){
        errors.push({ msg: "please enter your message" });
    }
    if(!data.message5){
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
        }, 10200);
       
        console.log(errors);
        return errors;
    }
   
    $.ajax({
        method: 'POST',
        url: '/summer',
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