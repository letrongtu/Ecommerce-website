document.addEventListener('DOMContentLoaded', function () {


    const orderedItems = document.getElementById('ordered-items');
    const totalPrice = document.getElementById('total-price');
    const deliveryPrice = document.getElementById('delivery-price');
    const itemPrice = document.getElementById('items-price');
    const numberItems = document.getElementById('number-of-items');
    const desH4 = document.querySelector('.product-description h4');

    document.body.addEventListener('click', function (e) {

      if (e.target.classList.contains('cart')) {
        e.preventDefault();
        printItems(e.target);

        addOrderedItems();
        let itemsCost = parseFloat(e.target.closest('.product').querySelector('.price').textContent.replace('$', ''));
        calculateTotal(itemsCost);

      }

      if (e.target.classList.contains('fa-circle-xmark')) {
        let orderProductBox = e.target.closest('.order-product');
        let removeQuantity = parseFloat(orderProductBox.querySelector('.product-des h4').textContent);
        let removeCost = parseFloat(orderProductBox.querySelector('.product-price').textContent.replace('$', ''));
        removeOrderedItems(removeQuantity);
        calculateTotal(-removeCost);
        orderProductBox.remove();
      }
    });

    const addToCartButton = document.getElementById('add-to-cart');
    addToCartButton.addEventListener('click', function (e) {
      e.preventDefault();
      buttonAddItems();

      addOrderedItems();
      let itemsCost = parseFloat(desH4.textContent.replace('$', ''));
      calculateTotal(itemsCost);

      addToCartButton.textContent = "Add product successfully!";
      setTimeout(function() {
        addToCartButton.textContent = "Add To Cart";
      }, 1000);

    });

    function removeOrderedItems(removeQuantity){
      let numberOfItems = parseFloat(orderedItems.textContent);
      numberOfItems = orderedItems.textContent;

      numberOfItems -= removeQuantity;

      orderedItems.textContent = numberOfItems;

      if (numberOfItems > 1) {
        numberItems.textContent = numberOfItems + ' items';
      } else {
        numberItems.textContent = numberOfItems + ' item';
      }
    }

    function addOrderedItems() {
      let numberOfItems = parseFloat(orderedItems.textContent);
      numberOfItems = orderedItems.textContent;

      numberOfItems++;
      orderedItems.textContent = numberOfItems;

      if (numberOfItems > 1) {
        numberItems.textContent = numberOfItems + ' items';
      } else {
        numberItems.textContent = numberOfItems + ' item';
      }
    }

    function retrieveDeliveryCost(totalItemsCost) {

      if (totalItemsCost > 500 || totalItemsCost === 0) {
        return 0;
      } else {
        return 10;
      }
    }

    function calculateTotal(itemsCost) {
      let total = parseFloat(totalPrice.textContent);
      let totalItemsCost = parseFloat(itemPrice.textContent);

      totalItemsCost += itemsCost;

      deliveryCost = retrieveDeliveryCost(totalItemsCost);

      total = totalItemsCost + deliveryCost;
      updateSummary(total, deliveryCost, totalItemsCost);
    }

    function updateSummary(total, deliveryCost, totalItemsCost) {
      totalPrice.textContent =  total.toFixed(2);
      deliveryPrice.textContent = deliveryCost.toFixed(2);
      itemPrice.textContent = totalItemsCost.toFixed(2);
    }

    function printItems(targetCart){
      let total = parseFloat(totalPrice.textContent);
      let product = targetCart.closest('.product');
      const productName = product.querySelector('.product-des h5').textContent;
      const productPrice = parseFloat(product.querySelector('.product-des h4.price').textContent.replace('$', '')).toFixed(2);
      const productSize = 'S';
      const imgSrc = product.querySelector('img').getAttribute("src");
      const productID = product.querySelector('.product-des h5').getAttribute("class");

      let existedProduct = false;

      if(total !== 0){
        existedProduct = checkProduct(productPrice, productSize, productName);
      }

      if(existedProduct === false){
        const orderProductsBox = document.querySelector(".order-products");
        orderProductsBox.innerHTML += '<div class="order-product">' +
                                      '<img src="' + imgSrc + '" alt="">' +
                                      '<div class="product-des">' +
                                      '<h1 class="'+ productID +'">' + productName + '</h1>' +
                                      '<h2>Colour: <span>' + product.querySelector('img').getAttribute("alt").toUpperCase() + '</span></h2>' +
                                      '<h3>Size: <span>' + productSize +'</span></h3>' +
                                      '<h4 class="quantity">1</h4>' +
                                      '</div>' +
                                      '<p class="product-price">$' + productPrice + '</p>' +
                                      '<i class="fa-regular fa-circle-xmark"></i>' +
                                      '</div>';
      }
    }

    function buttonAddItems(){
      let total = parseFloat(totalPrice.textContent);
      const productName = document.querySelector('#product-information .product-description h2').textContent;
      const productSize = document.querySelector('#product-information .product-description .size-button .size-active').textContent;
      const productPrice = parseFloat(document.querySelector('#product-information .product-description h4').textContent.replace('$', '')).toFixed(2);
      const productColour = document.querySelector('#product-information .product-description h6').textContent;
      const imgSrc = document.getElementById('header-image').getAttribute("src");
      const productID = document.querySelector('.product-description h2').getAttribute("class");

      let existedProduct = false;

      if(total !== 0){
        existedProduct = checkProduct(productPrice, productSize, productName);
      }

      if(existedProduct === false){
        const orderProductsBox = document.querySelector(".order-products");
        orderProductsBox.innerHTML += '<div class="order-product">' +
                                      '<img src="' + imgSrc + '" alt="">' +
                                      '<div class="product-des">' +
                                      '<h1 class="'+ productID +'">' + productName + '</h1>' +
                                      '<h2>Colour: <span>' + productColour.toUpperCase() + '</span></h2>' +
                                      '<h3>Size: <span>' +  productSize + '</span></h3>' +
                                      '<h4 class="quantity">1</h4>' +
                                      '</div>' +
                                      '<p class="product-price">$' + productPrice + '</p>' +
                                      '<i class="fa-regular fa-circle-xmark"></i>' +
                                      '</div>';
      }
    }

    function checkProduct(productPrice, productSize, productName){
      const orderProducts = document.querySelectorAll('.order-product');
      for(let orderProduct of orderProducts){
        let spanBox = orderProduct.querySelector('h3 span');
        let h1Box = orderProduct.querySelector('h1');
        if((spanBox.textContent === productSize) && (h1Box.textContent === productName)){
          let quantity = parseFloat(orderProduct.querySelector('.quantity').textContent) + 1;
          orderProduct.querySelector('h4').textContent = quantity;
          let totalOrderedPrice = quantity*productPrice;
          orderProduct.querySelector('.product-price').textContent = '$' + totalOrderedPrice.toFixed(2);
          return true;
        }
      }
      return false;
    }
  });
