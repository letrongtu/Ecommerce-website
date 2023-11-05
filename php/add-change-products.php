<?php
$host = "localhost";
$user = "X34360497";
$pw = "X34360497";
$dbname = "X34360497";

$productID = $_POST["productID"];
$productTitle = $_POST["productTitle"];
$desTitle = $_POST["desTitle"];
$desPara = $_POST["desPara"];
$productPrice = $_POST["productPrice"];
$images = $_POST["images"];
$brand = $_POST["brand"];
$productType = $_POST["productType"];
$colour = $_POST["colour"];
$team = $_POST["team"];
$stock = $_POST["stock"];

$mysqli = new mysqli($host, $user, $pw, $dbname);

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

if($productID === 'null'){
    $query = "INSERT INTO Products (productTitle, desTitle, desPara, productPrice, images, brand, productType, colour, Team, Stock)
    VALUES ('$productTitle', '$desTitle', '$desPara', '$productPrice', '$images', '$brand', '$productType', '$colour', '$team', '$stock')";
}
else{
    $query = "UPDATE Products SET
    productTitle = '$productTitle',
    desTitle = '$desTitle',
    desPara = '$desPara',
    productPrice = '$productPrice',
    images = '$images',
    brand = '$brand',
    productType = '$productType',
    colour = '$colour',
    Team = '$team',
    Stock = '$stock'
    WHERE productID = '$productID'";
}

if ($mysqli->query($query) === TRUE) {
    if($productID === 'null'){
        $response = "Product is successfully added";
    }
    else{
        $response = "Product is successfully changed";
    }
} else {
    $response = "There are some problems: " . $mysqli->error;
}

$mysqli->close();
echo $response;

