function checkoutHandler(){
    const checkOutButton = document.querySelector('.checkout-button');
    checkOutButton.addEventListener('click', function(e){
        e.preventDefault();
        let product_names = '';
        let colours = '';
        let sizes ='';
        let quantities='';
        let productIDs='';

        const orderProducts = document.querySelectorAll('.order-product');
        orderProducts.forEach((orderProduct, index)=>{
            product_names += orderProduct.querySelector('.product-des h1').textContent;
            colours += orderProduct.querySelector('.product-des h2 span').textContent.toLowerCase();
            sizes += orderProduct.querySelector('.product-des h3 span').textContent;
            quantities += orderProduct.querySelector('.product-des h4').textContent;
            productIDs += orderProduct.querySelector('.product-des h1').getAttribute("class");

            if (index < orderProducts.length - 1) {
                product_names += ',';
                colours += ',';
                sizes += ',';
                quantities += ',';
                productIDs += ',';
            }
        });

        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'php/checkout-handler.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let response = xhr.responseText;

                const notify = document.getElementById('notification');
                notify.textContent = response;
                notify.style.display = "block"
                notify.style.color = "red";
                notify.style.paddingBottom = "10px";
                notify.style.fontWeight = "500";

                setTimeout(function() {
                    notify.style.display = "none";
                }, 3000);

                if(response === "Successfully Ordered!"){
                    document.querySelector('.order-products').innerHTML = '';
                    document.getElementById('number-of-items').textContent = '0 item';
                    document.getElementById('items-price').textContent = '0.00';
                    document.getElementById('delivery-price').textContent = '0.00';
                    document.getElementById('total-price').textContent = '0.00';
                    document.getElementById('ordered-items').textContent = '0';
                }
            }
        }

        let total_price = document.getElementById('total-price').textContent;
        let user_name = document.querySelector('#promo-header span').textContent;

        const data = 'product_names=' + encodeURIComponent(product_names) + '&colours=' + encodeURIComponent(colours) +
                    '&sizes=' + encodeURIComponent(sizes) + '&quantities=' + encodeURIComponent(quantities) +
                    '&total_price=' + encodeURIComponent(total_price) + '&user_name=' + encodeURIComponent(user_name)
                    + '&product_ids=' + encodeURIComponent(productIDs);

        xhr.send(data);
    })
}

checkoutHandler();
