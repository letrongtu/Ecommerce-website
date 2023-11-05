/* This js file will handle all events of the website */

// Nav Bar Trigger
const links = document.querySelectorAll('#nav-bar li a');

function clickLinks(){
    links.forEach((link) =>{
        link.addEventListener("click", function(){

            links.forEach((barLink) => {
                barLink.classList.remove("active");
            });

            link.classList.add("active");
        });
    });
}


clickLinks();

// Nav Bar Trigger

// Search Bar Event
const search = document.getElementById("search-section");
const foundProducts = document.getElementById("found-products");
const triggerSearch = document.getElementById("trigger-search");
const shoppingPage = document.querySelector('a[href="#shopping"]');
const searchIcon = document.getElementById('search');
const searchInput = document.getElementById('search-input');

function clickTriggerSearch(){

    triggerSearch.addEventListener("click", function(){
        if(shoppingPage.className === "active"){
            triggerSearch.style.display = "none";
            search.style.display = "block";
            search.scrollIntoView({ behavior: "smooth" });

            searchInput.addEventListener("focus", function(){
                foundProducts.style.display = "block";
            });
        }
    });

    document.addEventListener("click", function(event) {
        if (event.target !== searchInput && event.target !== foundProducts) {
            foundProducts.style.display = "none";
        }
    });

    searchIcon.addEventListener("dblclick", function(){
        triggerSearch.style.display = "block";
        search.style.display = "none";
    })
}

clickTriggerSearch();
// Search Bar Event

// Buttons Events

const mainButtons = document.querySelectorAll('input[name="main-buttons[]"]');
const footballButtons = document.querySelectorAll('input[name="football-buttons[]"]');
const basketballButtons = document.querySelectorAll('input[name="basketball-buttons[]"]');
const colourButtons = document.querySelectorAll('input[name="colour-buttons[]"]');
const header = document.getElementById("header");

function mainButtonEvent(){
    const buttonDivs = {
        football: document.querySelector(".football-button"),
        basketball: document.querySelector(".basketball-button"),
        colour: document.querySelector(".colour-button")
    }

    mainButtons.forEach((button) => {
        button.addEventListener("change", function(){
            if(button.checked){
                removeActiveClass(footballButtons);
                removeActiveClass(basketballButtons);
                removeActiveClass(mainButtons);

                button.nextElementSibling.classList.add("button-active");

                updateHeader(button);

                for(const div of Object.values(buttonDivs)){
                    div.style.display = "none";
                }
                buttonDivs[button.value].style.display = "flex";
            }
        });
    });
}

function updateHeader(mainButton){
    const mainButtonLabelContent = document.querySelector(`label[for="${mainButton.id}"]`).textContent;
    if(mainButton.value === "colour"){
        updateColourHeader();
    }
    else{
        header.textContent = `${mainButtonLabelContent}`;
    }
}

function removeActiveClass(buttons){
    buttons.forEach((button) => {
        button.nextElementSibling.classList.remove("button-active");
    });
}

function footballButtonEvent(){

    footballButtons.forEach((button) => {
        button.addEventListener("change", function(){
            if(button.checked){
                removeActiveClass(footballButtons);
                button.nextElementSibling.classList.add("button-active");

                const footballButton = document.querySelector('input[name="football-buttons[]"]:checked');
                updateAdditionalHeader(footballButton);
            }
        });
    });
}

function updateAdditionalHeader(additional){
    const mainButton = document.querySelector('input[name="main-buttons[]"]:checked');
    const mainLabelContent = document.querySelector(`label[for="${mainButton.id}"]`).textContent;

    const additionalLabelContent = document.querySelector(`label[for="${additional.id}"]`).textContent;

    header.textContent = `${mainLabelContent} >> ${additionalLabelContent}`;
}

function basketballButtonEvent(){

    basketballButtons.forEach((button) => {
        button.addEventListener("change", function(){
            if(button.checked){
                removeActiveClass(basketballButtons);
                button.nextElementSibling.classList.add("button-active");

                const basketballButton = document.querySelector('input[name="basketball-buttons[]"]:checked');
                updateAdditionalHeader(basketballButton);
            }
        });
    });
}

function colourButtonEvent(){

    colourButtons.forEach((button) => {
        button.addEventListener("change", function(){
            if(button.checked){
                colourButtons.forEach((colourButton) => {
                    colourButton.nextElementSibling.classList.remove("colour-active");
                });
                button.nextElementSibling.classList.add("colour-active");

                updateColourHeader();
            }
        });
    });
}

function updateColourHeader(){
    const mainButton = document.querySelector('input[name="main-buttons[]"]:checked');
    const mainLabelContent = document.querySelector(`label[for="${mainButton.id}"]`).textContent;

    const colourButton = document.querySelector('input[name="colour-buttons[]"]:checked');
    const colourLabelId = document.querySelector(`label[for="${colourButton.id}"]`).id;

    header.textContent = `${mainLabelContent} >> ${colourLabelId}`;
}

mainButtonEvent();
footballButtonEvent();
basketballButtonEvent();
colourButtonEvent();


// Buttons Events


// Account Section Events
function accountEvents(){
    const accountContainer = document.getElementById("account-container");
    const signupButton = document.getElementById("signup");
    const signinButton = document.getElementById("signin");

    signupButton.addEventListener('click', function(){
        accountContainer.classList.add("active");
    });

    signinButton.addEventListener('click', function(){
        accountContainer.classList.remove("active");
    });
}

accountEvents();

// JQuery

// Account Section Events

$(document).ready(function(){

    // Change Page Event
        $('nav ul li a').click(function(e){
                e.preventDefault();

                $('.page').hide();

                const targetPageId = $(this).attr('href');

                if(targetPageId === "#account"){
                    $(targetPageId).css("display", "flex");
                }
                $(targetPageId).show();

                window.scrollTo(0, $(targetPageId).offset().top);
            });
    // Change Page Event

    // Change Header Image Event
        $('.sub-images img').click(function(e){
            e.preventDefault();
            $('#header-image').attr('src', $(this).attr('src'));
            originalSrc = $('#header-image').attr('src');
        });

        let originalSrc;
        $('.sub-images img').hover(function(e){
            e.preventDefault();
            originalSrc = $('#header-image').attr('src');
            $('#header-image').attr('src', $(this).attr('src'));
        },
        function(){
            $('#header-image').attr('src', originalSrc);
        });
    // Change Header Image Event

    // Size choice Event
        $('.size-button label').click(function(e){
            e.preventDefault();
            $('.size-button label').each(function(){
                $(this).removeClass("size-active");
            });
            $(this).addClass("size-active");
        });
    // Size choice Event

    // Found Product Info Event

    $('.found-product').click(function(e){
        e.preventDefault();
        $('#product-information').css('display', 'block');
        $('nav').css('display', 'none');
        $('footer').css('display','none');
        $('body').css('overflow-y','hidden');
        $('.overlay').css('display','block');
    });

    // Found Product Info Event

    // Close Icon Info Event

    $('.product-container i').click(function(e){
        $('#product-information').css('display', 'none');
        $('nav').css('display', 'block');
        $('footer').css('display','flex');
        $('body').css('overflow-y','unset');
        $('.overlay').css('display','none');
    });

    // Close Icon Info Event

    // Shop Now Button Event
    $('#shop-now').click(function(e){
        e.preventDefault();
        $('.page').hide();
        $('#shopping').show();

        $('nav ul li a').each(function(){
            $(this).removeClass('active');
        })
        $('nav ul li a[href="#shopping"]').addClass('active');
    });
    // Shop Now Button Event

    // Login Now Button Event
    $('#login-now').click(function(e){
        e.preventDefault();
        $('.page').hide();
        $('#account').show();

        $('#account').css('display', 'flex');

        $('nav ul li a').each(function(){
            $(this).removeClass('active');
        })
        $('nav ul li a[href="#account"]').addClass('active');
    });
    // Login Now Button Event

    // Sign Up Now Button Event
    $('#sign-up-banner button').click(function(e){
        e.preventDefault();
        $('.page').hide();
        $('#account').show();

        $('#account').css('display', 'flex');

        $('nav ul li a').each(function(){
            $(this).removeClass('active');
        })
        $('nav ul li a[href="#account"]').addClass('active');
        $('#signup').click();
    });
    // Sign Up Now Button Event

    // Profile Box Event
    $('#profile-icon').click(function(e){
        e.preventDefault();
        $('#profile').css('display','block');
    });

    $('.content-box .fa-circle-xmark').click(function(e){
        e.preventDefault();
        $('#profile').css('display','none');
    });

    $('.content-box .fa-pen').click(function(e){
        e.preventDefault();
        $('.information-box').css('display','none');
        $('.change-form').css('display','block');
        $(this).css('display','none');
        $('.content-box .fa-circle-check').css('display','block')
    });

    $('.content-box .fa-circle-check').click(function(e){
        e.preventDefault();
        $('.information-box').css('display','flex');
        $('.change-form').css('display','none');
        $(this).css('display','none');
        $('.content-box .fa-pen').css('display','block')
    });
    // Profile Box Event

    });


// JQuery
