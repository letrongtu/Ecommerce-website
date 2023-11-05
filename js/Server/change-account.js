function changeHandler(button, form){
    document.getElementById(button).addEventListener("click", function(e){
        e.preventDefault();

        const span = document.querySelector(form + ' span');
        const userIDBox = document.querySelector(form + ' input[name="userID"]');
        const userNameBox = document.querySelector(form + ' input[name="userName"]');
        const passwordBox = document.querySelector(form + ' input[name="userPassword"]');
        const gmailBox = document.querySelector(form + ' input[name="gmail"]');
        const addressBox = document.querySelector(form + ' input[name="address"]');
        const phoneBox = document.querySelector(form + ' input[name="phone"]');

        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'php/change-account.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                    const response = xhr.responseText;

                    span.textContent = response;
                    span.style.color = "red";

                    setTimeout(function() {
                        span.textContent = "Change Account";
                        span.style.color = "#F250A9";
                    }, 3000);

                    userIDBox.value = '';
                    userNameBox.value ='';
                    passwordBox.value = '';
                    gmailBox.value ='';
                    addressBox.value = '';
                    phoneBox.value ='';
            }
        };

        const userID = userIDBox.value;
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

changeHandler('change', '#change-account');
