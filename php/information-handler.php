<?php
$host = "localhost";
$user = "X34360497";
$pw = "X34360497";
$dbname = "X34360497";

$productID = $_POST['productID'];

$mysqli = new mysqli($host, $user, $pw, $dbname);

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$query = "SELECT productTitle, desTitle, desPara, productPrice, images, brand, colour FROM Products WHERE productID = ?";
$statement = $mysqli->prepare($query);
$statement->bind_param("s", $productID);
$statement->execute();
$statement->bind_result($productTitle, $desTitle, $desPara, $productPrice, $images, $brand, $colour);

$response = array();

if ($statement->fetch()) {
    $images_array = explode(',', $images);

    $response['productTitle'] = $productTitle;
    $response['desTitle'] = $desTitle;
    $response['desPara'] = $desPara;
    $response['productPrice'] = $productPrice;
    $response['headerImage'] = $images_array[0];
    $response['2ndImage'] = $images_array[1];
    $response['3rdImage'] = $images_array[2];
    $response['4thImage'] = $images_array[3];
    $response['brand'] = $brand;
    $response['colour'] = $colour;
}

$statement->close();
$mysqli->close();

echo json_encode($response);
?>
