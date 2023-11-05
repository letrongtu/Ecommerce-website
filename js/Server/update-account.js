function changeHandler(button, form){
    document.getElementById(button).addEventListener("click", function(e){
        e.preventDefault();

        const span = document.querySelector(form + ' span');
        const userNameBox = document.querySelector(form + ' input[name="userName"]');
        const passwordBox = document.querySelector(form + ' input[name="userPassword"]');
        const gmailBox = document.querySelector(form + ' input[name="gmail"]');
        const addressBox = document.querySelector(form + ' input[name="address"]');
        const phoneBox = document.querySelector(form + ' input[name="phone"]');

        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'php/update-account.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                    const response = xhr.responseText;

                    span.textContent = response;
                    span.style.color = "red";

                    document.querySelector('.information-box h2 span').textContent = userName;
                    document.querySelector('.information-box h3 span').textContent = password;
                    document.querySelector('.information-box h4 span').textContent = gmail;
                    document.querySelector('.information-box h5 span').textContent = address;
                    document.querySelector('.information-box h6 span').textContent = phone;

                    setTimeout(function() {
                        span.textContent = "Update Details";
                    }, 3000);
            }
        };

        const userID = document.getElementById("promo-header").querySelector("span").className;
        const userName = userNameBox.value;
        const password = passwordBox.value;
        const gmail = gmailBox.value;
        const address = addressBox.value;
        const phone = phoneBox.value;

        const data = 'userID=' + encodeURIComponent(userID) + '&userName=' + encodeURIComponent(userName) +
                     '&password=' + encodeURIComponent(password)
                    + '&gmail=' + encodeURIComponent(gmail) + '&userAddress=' + encodeURIComponent(address)
                    + '&phone=' + encodeURIComponent(phone);

        xhr.send(data);
    });
}

changeHandler('user-change', '#user-form');
