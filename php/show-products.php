<?php
$host = "localhost";
$user = "X34360497";
$pw = "X34360497";
$dbname = "X34360497";

$productType = $_POST['productType'];
$colour = isset($_POST['Colour']) ? $_POST['Colour'] : '';
$team = isset($_POST['Team']) ? $_POST['Team'] : '';
$mysqli = new mysqli($host, $user, $pw, $dbname);

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

if($colour === ''){
    if($team === ''){
        if($productType === "all products"){
            $query = "SELECT * FROM Products";
        }
        else{
            $query = "SELECT * FROM Products WHERE productType = '$productType' ";
        }
    }
    else{
        $query = "SELECT * FROM Products WHERE Team = '$team'";
    }

}
else{
    $query = "SELECT * FROM Products WHERE colour = '$colour'";
}

$result = $mysqli->query($query);
$response = '';

if($result->num_rows >0){
    while($row = $result->fetch_assoc()){
        $images_array = explode(',', $row["images"]);

        $response .= '<div class="product">
                        <div class="product-information">
                            <img src="' . $images_array[0] . '" alt="' . $row["colour"] . '">
                            <div class="product-des">
                                <span class="brand">' . $row["brand"] . '</span>
                                <h5 class="'. $row["productID"] .'">' . $row["productTitle"] . '</h5>
                                <div class="star">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                </div>
                                <h4 class="price">$' . $row["productPrice"] . '</h4>
                            </div>
                        </div>
                        <i class="fa-solid fa-cart-shopping cart" id="' . $row["productID"] . '"></i>
                    </div>';
    }
}
else{
    $response .= "<p id='no-product'>No product found</p>";
}

$mysqli->close();
echo $response;

