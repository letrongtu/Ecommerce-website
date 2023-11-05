function generateProductsTable(){
    const productsTable = document.querySelector('.products-table');
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/staff-handler/staff-products.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let response = xhr.responseText;
            productsTable.innerHTML = response;
        }
    }

    xhr.send();
}

generateProductsTable();

function generateAccountsTable(){
    const accountsTable = document.querySelector('.accounts-table');
    let xhr1 = new XMLHttpRequest();
    xhr1.open('POST', 'php/staff-handler/staff-accounts.php', true);
    xhr1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr1.onreadystatechange = function () {
        if (xhr1.readyState === 4 && xhr1.status === 200) {
            let response = xhr1.responseText;
            accountsTable.innerHTML = response;
        }
    }

    xhr1.send();
}

generateAccountsTable();

function generateOrdersTable(){
    const ordersTable = document.querySelector('.orders-table');
    let xhr2 = new XMLHttpRequest();
    xhr2.open('POST', 'php/staff-handler/staff-orders.php', true);
    xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr2.onreadystatechange = function () {
        if (xhr2.readyState === 4 && xhr2.status === 200) {
            let response = xhr2.responseText;
            ordersTable.innerHTML = response;
        }
    }

    xhr2.send();
}

generateOrdersTable();

function removeProducts(){
    const productsTable = document.querySelector('.products-table');
    productsTable.addEventListener('click', function (e) {
        if (e.target.classList.contains('fa-circle-xmark')) {
            e.preventDefault();
            let xhr3 = new XMLHttpRequest();
            xhr3.open('POST', 'php/staff-handler/remove-products.php', true);
            xhr3.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            xhr3.onreadystatechange = function () {
                if (xhr3.readyState === 4 && xhr3.status === 200) {
                    alert(xhr3.responseText);
                    generateProductsTable();
                }
            }

            const firstTd = e.target.closest('tr').querySelector('td:first-child').textContent;
            console.log("product id " + firstTd);
            const data = 'productID=' + encodeURIComponent(firstTd);
            xhr3.send(data);
        }
    });

}

removeProducts();

function removeAccounts(){
    const accountsTable = document.querySelector('.accounts-table');
    accountsTable.addEventListener('click', function (e) {
        if (e.target.classList.contains('fa-circle-xmark')) {
            e.preventDefault();
            let xhr4 = new XMLHttpRequest();
            xhr4.open('POST', 'php/staff-handler/remove-accounts.php', true);
            xhr4.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            xhr4.onreadystatechange = function () {
                if (xhr4.readyState === 4 && xhr4.status === 200) {
                    alert(xhr4.responseText);
                    generateAccountsTable();
                }
            }

            const firstTd = e.target.closest('tr').querySelector('td:first-child').textContent;
            console.log("account id " + firstTd);
            const data = 'accountID=' + encodeURIComponent(firstTd);
            xhr4.send(data);
        }
    });

}

removeAccounts();

function removeOrders(){
    const ordersTable = document.querySelector('.orders-table');
    ordersTable.addEventListener('click', function (e) {
        if (e.target.classList.contains('fa-circle-xmark')) {
            e.preventDefault();
            let xhr5 = new XMLHttpRequest();
            xhr5.open('POST', 'php/staff-handler/remove-orders.php', true);
            xhr5.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            xhr5.onreadystatechange = function () {
                if (xhr5.readyState === 4 && xhr5.status === 200) {
                    alert(xhr5.responseText);
                    generateOrdersTable();
                }
            }

            const firstTd = e.target.closest('tr').querySelector('td:first-child').textContent;
            console.log("order id " + firstTd);
            const data = 'orderID=' + encodeURIComponent(firstTd);
            xhr5.send(data);
        }
    });

}

removeOrders();


function reload(){
    const logoImg = document.getElementById('logo-img');

    logoImg.addEventListener("click", function (e) {
        e.preventDefault();
        generateProductsTable();
        generateAccountsTable();
        generateOrdersTable();
        alert('All tables reloaded!');
    });
}
reload();
