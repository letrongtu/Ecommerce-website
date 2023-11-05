$(document).ready(function() {
    $("#search").click(function() {
        let query = $("#search-input").val().trim();

        if(query !== "") {
            $.ajax({
                type: "GET",
                url: 'php/search.php',
                data: { q: query },
                dataType: "json",
                success: function(data) {
                    $("#found-products").empty();

                    if(data.length === 0) {
                        $("#found-products").append('<p>No products found.</p>');
                        return;
                    }

                    $.each(data, function(index, product) {
                        let productHTML = `
                        <div class="found-product">
                            <img src="${product.image}" alt="${product.productTitle}">
                            <div class="product-des">
                                <span class="brand">${product.brand}</span>
                                <h5 class="${product.productID}">${product.productTitle}</h5>
                            </div>
                        </div>
                        `;

                        $(productHTML).appendTo("#found-products");
                    });
                },
                error: function() {
                    $("#found-products").html('<p>Error fetching results.</p>');
                }
            });
        } else {
            $("#found-products").html('<p>Please enter a keyword to search.</p>');
        }
    });

});

