$(document).on('click', '.product-information', function(e){
    e.preventDefault();
    $('nav').css('display', 'none');
    $('footer').css('display','none');
    $('body').css('overflow-y','hidden');
    $('.overlay').css('display','block');
    $('#product-information').css('display', 'block');

    let productID = $(this).next().attr('id');
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/information-handler.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);

            $('.header-image img').attr('src', response['headerImage']);
            $('.sub-images img:eq(0)').attr('src', response['headerImage']);
            $('.sub-images img:eq(1)').attr('src', response['2ndImage']);
            $('.sub-images img:eq(2)').attr('src', response['3rdImage']);
            $('.sub-images img:eq(3)').attr('src', response['4thImage']);

            $('.product-description h2').attr('class', productID);
            $('.product-description h2').text(response['productTitle']);
            $('.product-description h6').text(response['colour']);
            $('.product-description p').text(response['brand']);
            $('.product-description .description p').text(response['desPara']);
            $('.product-description .description p').prepend('<span></span>');
            $('.product-description .description p span').text(response['desTitle'] + ' ');
            $('.product-description h4').text('$' + response['productPrice']);
        }
    }

    const data = 'productID=' + encodeURIComponent(productID);
    xhr.send(data);
});

$(document).on('click', '.found-product', function(e){
    e.preventDefault();
    $('nav').css('display', 'none');
    $('footer').css('display','none');
    $('body').css('overflow-y','hidden');
    $('.overlay').css('display','block');
    $('#product-information').css('display', 'block');

    let productID = $(this).find('h5').attr('class');

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/information-handler.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);

            $('.header-image img').attr('src', response['headerImage']);
            $('.sub-images img:eq(0)').attr('src', response['headerImage']);
            $('.sub-images img:eq(1)').attr('src', response['2ndImage']);
            $('.sub-images img:eq(2)').attr('src', response['3rdImage']);
            $('.sub-images img:eq(3)').attr('src', response['4thImage']);

            $('.product-description h2').attr('class', productID);
            $('.product-description h2').text(response['productTitle']);
            $('.product-description h6').text(response['colour']);
            $('.product-description p').text(response['brand']);
            $('.product-description .description p').text(response['desPara']);
            $('.product-description .description p').prepend('<span></span>');
            $('.product-description .description p span').text(response['desTitle'] + ' ');
            $('.product-description h4').text('$' + response['productPrice']);
        }
    }

    const data = 'productID=' + encodeURIComponent(productID);
    xhr.send(data);
});

