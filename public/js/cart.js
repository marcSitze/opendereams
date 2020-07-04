// // console.log(document.querySelector('.add-to-cart'));

// const card = document.querySelector('.card');

// card.addEventListener('click', e => {
//     // console.log(e.target);
//     if(e.target.classList.contains('add-to-cart')){
//         const id = e.target.getAttribute('data-id');
//         // console.log(e.target.getAttribute('data-id'));

//         addToCart(id);
//     }
// });


// const addToCart = async productId => { 
//     try {
//        let response = await fetch('/me/cart', {
//             method: 'POST',
//             body: JSON.stringify(productId)
//         });
//         const result = await response.json();
//         console.log(result);
//     } catch (error) {
//         console.error(error);
//     }

// }

$(function(){
    console.log('Cart is working well'); 
    $('.add-to-cart').click(function(event){
        console.log($(this).attr('data-id'));
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/me/cart',
            data: { 
                productId: $(this).attr('data-id'),
                userId: $(this).attr('user-id')
            },
            success: function(data) {
                console.log(data + " All went right");
            },
            fail: function(error) {
                console.error(error);
            }
        });
    });
});