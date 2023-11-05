
const productsContainer = document.querySelector('.products-container');

function showProducts(productType, colour, team){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/show-products.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let response = xhr.responseText;
            productsContainer.innerHTML = response;
        }
    }

    let data = '';

    if(productType === 'colour'){
        colour = document.querySelector('label.colour-active').id.replace(/-/g, ' ').toLowerCase();
        data = 'Colour=' + encodeURIComponent(colour);
    }
    else if(productType === 'colour-button'){
        data = 'Colour=' + encodeURIComponent(colour);
    }
    else if(productType === 'sport-button'){
        data = 'Team=' + encodeURIComponent(team);
    }
    else  {
        data = 'productType=' + encodeURIComponent(productType);
    }

    xhr.send(data);
}

function mainButtonsEvent(){
    const mainButtons = document.querySelectorAll('input[name="main-buttons[]"]');

    mainButtons.forEach(function (mainButton) {
        mainButton.addEventListener('change', function () {
            if (mainButton.checked) {
                let productType = mainButton.nextElementSibling.textContent.toLowerCase();
                showProducts(productType, '', '');
            }
        });
    });
}

function sportButtonEvent(){
    const footballButtons = document.querySelectorAll('input[name="football-buttons[]"]');

    footballButtons.forEach(function (footballButton) {
        footballButton.addEventListener('click', function () {
            const label = document.querySelector('label[for="' + footballButton.id + '"]');
            const team = label.textContent.toLowerCase();
            showProducts('sport-button', '', team);
        });
    });

    const basketballButtons = document.querySelectorAll('input[name="basketball-buttons[]"]');

    basketballButtons.forEach(function (basketballButton) {
        basketballButton.addEventListener('click', function () {
            const label = document.querySelector('label[for="' + basketballButton.id + '"]');
            const team = label.textContent.toLowerCase();
            showProducts('sport-button', '', team);
        });
    });
}

function colourButtonEvent(){
    const colourButtons = document.querySelectorAll('input[name="colour-buttons[]"]');

    colourButtons.forEach(function (colourButton) {
        colourButton.addEventListener('click', function () {
            const label = document.querySelector('label[for="' + colourButton.id + '"]');
            const colour = label.id.replace(/-/g, ' ').toLowerCase();
            showProducts('colour-button', colour, '');
        });
    });
}

showProducts("all products", '', '');
mainButtonsEvent();
colourButtonEvent();
sportButtonEvent();
