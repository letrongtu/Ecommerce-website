function processProduct(button, form){
    document.getElementById(button).addEventListener("click", function(e){
        e.preventDefault();
        let productID = 'null';

        if(form === '#change-product'){
            productID = document.querySelector(form + ' input[name="productID"]').value;
        }

        let span = document.querySelector(form + ' span');
        let productTitle = document.querySelector(form + ' input[name="productTitle"]').value;
        let desTitle = document.querySelector(form + ' input[name="desTitle"]').value;
        let desPara = document.querySelector(form + ' input[name="desPara"]').value;
        let productPrice = document.querySelector(form + ' input[name="productPrice"]').value;
        let images = document.querySelector(form + ' input[name="images"]').value;
        let brand = document.querySelector(form + ' input[name="brand"]').value;

        let select = document.querySelector(form + ' select');
        let productType = select.options[select.selectedIndex].value;

        let colour = document.querySelector(form + ' input[name="colour"]').value;
        let team = document.querySelector(form + ' input[name="team"]').value;
        let stock = document.querySelector(form + ' input[name="stock"]').value;


        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'php/add-change-products.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                    const response = xhr.responseText;

                    span.textContent = response;
                    span.style.color = "red";

                    setTimeout(function() {
                        if(button === 'more-button'){
                            span.textContent = "Add";
                            span.style.color = "#F250A9";
                        }
                        else{
                            span.textContent = "Change";
                            span.style.color = "#F250A9";
                        }
                    }, 3000);
            }
        };

        const data = 'productID=' + encodeURIComponent(productID) +'&productTitle=' + encodeURIComponent(productTitle)
                    + '&desTitle=' + encodeURIComponent(desTitle)
                    + '&desPara=' + encodeURIComponent(desPara) + '&productPrice=' + encodeURIComponent(productPrice)
                    + '&images=' + encodeURIComponent(images) + '&brand=' + encodeURIComponent(brand)
                    + '&productType=' + encodeURIComponent(productType) + '&colour=' + encodeURIComponent(colour)
                    + '&team=' + encodeURIComponent(team) + '&stock=' + encodeURIComponent(stock);

        xhr.send(data);
    });
}

processProduct('change-button', '#change-product');
processProduct('more-button', '#add-product');

