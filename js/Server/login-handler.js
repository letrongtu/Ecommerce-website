    function loginEvent(){
        document.getElementById('login-button').addEventListener('click', function (e) {
            e.preventDefault();

            let xhr = new XMLHttpRequest();
            xhr.open('POST', 'php/login-handler.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        if(response.userType === 'staff'){
                            staffAccountEvent(username, response.userID);
                            retrieveUserInfo(response);
                        }
                        else if(response.userType === 'user'){
                            userAccountEvent(username, response.userID);
                            retrieveUserInfo(response);
                        }
                        else if(response.userType === 'Incorrect Password'){
                            let spanText = document.querySelector('#login-form span');
                            spanText.textContent = "Incorrect Password!";
                            spanText.style.color = "red";

                            setTimeout(function() {
                                spanText.textContent = "or use your account to sign in";
                                spanText.style.color = "black";
                            }, 3000);

                            passwordBox.value = '';
                        }
                        else {
                            let spanText = document.querySelector('#login-form span');
                            spanText.textContent = "Account doesn't exist in the system!";
                            spanText.style.color = "red";

                            setTimeout(function() {
                                spanText.textContent = "or use your account to sign in";
                                spanText.style.color = "black";
                            }, 3000);

                            usernameBox.value = '';
                            passwordBox.value = '';
                        }
                }
            };

            const usernameBox = document.querySelector('input[name="username"]');
            const passwordBox = document.querySelector('input[name="password"]');

            const username = usernameBox.value;
            const password = passwordBox.value;
            const data = 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password);

            xhr.send(data);
        });
    }

    function staffAccountEvent(username, userID){
        document.getElementById('account-icon').style.display = "none";
        document.getElementById('logout-icon').style.display = "block";
        document.getElementById('login-now').style.display = "none";
        document.getElementById('profile-icon').style.display = "block";

        const staffIcon = document.getElementById('staff-icon');
        staffIcon.style.display = "block";

        document.getElementById('promo-header').innerHTML = 'WELCOME BACK, <span class="'+ userID +'">' + username + '</span>! <br>ENJOY SHOPPING WITH US!';
        document.querySelector('#promo-header span').style.display = "contents";

        document.querySelectorAll('nav ul li a').forEach((link) =>{
            link.classList.remove('active');
        });
        document.querySelector('nav ul li a[href="#staff"]').classList.add('active');

        document.querySelectorAll('.page').forEach((page)=>{
            page.style.display = "none";
        });
        document.getElementById('staff').style.display = "flex";
        document.getElementById('staff').scrollIntoView({ behavior: "smooth" });

        document.querySelector('#staff h1 span').textContent = username;

    }

    function userAccountEvent(username, userID){
        document.querySelectorAll('.page').forEach((page)=>{
            page.style.display = "none";
        });
        document.getElementById('shopping').style.display = "block";
        document.getElementById('account-icon').style.display = "none";
        document.getElementById('login-now').style.display = "none";
        document.getElementById('logout-icon').style.display = "block";
        document.getElementById('profile-icon').style.display = "block";

        document.getElementById('promo-header').innerHTML = 'WELCOME BACK, <span class="'+ userID +'">' + username + '</span>! <br>ENJOY SHOPPING WITH US!';
        document.querySelector('#promo-header span').style.display = "contents";

        document.getElementById('promotion').scrollIntoView({ behavior: "smooth" });
        document.querySelectorAll('nav ul li a').forEach((link) =>{
            link.classList.remove('active');
        });
        document.querySelector('nav ul li a[href="#shopping"]').classList.add('active');
    }


    loginEvent();


    function retrieveUserInfo(response){

        const userNameInput = document.querySelector('#user-form input[name="userName"]');
        const userPasswordInput = document.querySelector('#user-form input[name="userPassword"]');
        const gmailInput = document.querySelector('#user-form input[name="gmail"]');
        const addressInput = document.querySelector('#user-form input[name="address"]');
        const phoneInput = document.querySelector('#user-form input[name="phone"]');

        userNameInput.value = response.userName;
        userPasswordInput.value = response.userPassword;
        gmailInput.value = response.gmail;
        addressInput.value = response.address;
        phoneInput.value = response.phone;

        document.querySelector('.information-box h2 span').textContent = userNameInput.value;
        document.querySelector('.information-box h3 span').textContent = userPasswordInput.value;
        document.querySelector('.information-box h4 span').textContent = gmailInput.value;
        document.querySelector('.information-box h5 span').textContent = addressInput.value;
        document.querySelector('.information-box h6 span').textContent = phoneInput.value;
    }

