function logoutEvent(){
    document.getElementById('logout-icon').addEventListener("click", function(){
        document.querySelectorAll('.page').forEach((page)=>{
            page.style.display = "none";
        });

        document.getElementById('account').style.display = "flex";

        document.getElementById('account-icon').style.display = "block";
        document.getElementById('home-icon').style.display = "block";
        document.getElementById('about-icon').style.display = "block";
        document.getElementById('contact-icon').style.display = "block";
        document.getElementById('help-icon').style.display = "block";

        document.getElementById('login-now').style.display = "block";
        document.getElementById('profile-icon').style.display = "none";
        document.getElementById('staff-icon').style.display = "none";
        document.getElementById('logout-icon').style.display = "none";

        document.getElementById('promo-header').innerHTML = "ENJOY SHOPPING AND LOGIN NOW!";
        document.getElementById('account').scrollIntoView({ behavior: "smooth" });

        document.querySelectorAll('nav ul li a').forEach((link) =>{
            link.classList.remove('active');
        });
        document.querySelector('nav ul li a[href="#shopping"]').classList.add('active');

        document.querySelectorAll('#login-form input').forEach(inputBox => {
            inputBox.value = '';
        });
    });
}

logoutEvent();

