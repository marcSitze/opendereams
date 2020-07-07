// $(function(){
//     console.log('Cart is working well'); 
//     $('.add-to-cart').click(function(event){
//         console.log($(this).attr('data-id'));
//         event.preventDefault();
//         $.ajax({
//             type: 'POST',
//             url: '/me/cart',
//             data: { 
//                 productId: $(this).attr('data-id'),
//                 userId: $(this).attr('user-id')
//             },
//             success: function(data) {
//                 console.log(data + " All went right");
//             },
//             fail: function(error) {
//                 console.error(error);
//             }
//         });
//     });
// });


const container = document.querySelector('#portfolio-wrapper');

container.addEventListener('click', e => {
    // get the current product
    let product = e.target.classList.contains('add-to-cart');
    
    if(product) {
    product = {
        id: e.target.getAttribute('data-id'),
        name: e.target.parentElement.parentElement.querySelector('.product-name').textContent,
        price: e.target.parentElement.parentElement.querySelector('.product-price').textContent,
        image: e.target.parentElement.parentElement.querySelector('.product-image').getAttribute('src')
    }
    console.log(product);
        // check if product product is already in cart
            // if yes increment the number in cart
            // else add to cart

    // add the product to cart
    addProduct(product);
    // save the product to localstorage
    }
        
});

// Add product to the dom
const addProduct = product => {
    const tbody = document.querySelector('tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `<td><img src="${product.image}" width="100px" /></td>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td><form><input type="number" value="1" min="1" style="width: 50px; text-align: center;"/></form></td>
                    <td>X</td>`;

    tbody.appendChild(tr);
    // Save product to localstorage
    addProductLS(product);
};

// Get all products from the localstorage
const getProductsLS = () => {
    console.log('all products saved');
    let products;

    if(!localStorage.getItem('products')){
        products = [];
    }else{
        products = JSON.parse(localStorage.getItem('products'));
    }
    console.log(products);
    return products;
};

// save product the localStorage
const addProductLS = product => {
   let products = getProductsLS();
    products.push(product);
   console.log(products);
   localStorage.setItem('products', JSON.stringify(products));
};
getProductsLS();

// Display products saved in cart
const displayProductsLS = () => {
    const products = getProductsLS();
    let html;
    const tbody = document.querySelector('tbody');
    products.forEach(product => {
        let tr = document.createElement('tr');
        html = `<td><img src="${product.image}" width="100px" /></td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td><form><input type="number" value="1" min="1" style="width: 50px; text-align: center;"/></form></td>
                <td>X</td>`;
        tr.innerHTML = html;
        tbody.appendChild(tr);
    });
};
displayProductsLS();