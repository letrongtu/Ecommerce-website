function signupHandler(button, form){
    document.getElementById(button).addEventListener("click", function(e){
        e.preventDefault();

        const span = document.querySelector(form + ' span');
        const usernameBox = document.querySelector(form + ' input[name="userName"]');
        const passwordBox = document.querySelector(form + ' input[name="userPassword"]');

        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'php/signup-handler.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                    const response = xhr.responseText;

                    span.textContent = response;
                    span.style.color = "red";

                    setTimeout(function() {
                        if(button === 'signup-button'){
                            span.textContent = "or use your email for registration";
                            span.style.color = "black";
                        }
                        else{
                            span.textContent = "Create Account";
                            span.style.color = "#F250A9";
                        }

                    }, 3000);

                    usernameBox.value = '';
                    passwordBox.value ='';
            }
        };

        const username = usernameBox.value;
        const password = passwordBox.value;
        const select = document.querySelector(form + ' select');
        const userType = select.options[select.selectedIndex].value;
        const data = 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password) + '&userType=' + encodeURIComponent(userType);

        xhr.send(data);
    });
}

signupHandler('signup-button', '#signup-form');
signupHandler('add-button', '#add-account');
