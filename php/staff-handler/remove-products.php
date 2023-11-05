<?php
$host = "localhost";
$user = "X34360497";
$pw = "X34360497";
$dbname = "X34360497";

$productID = $_POST["productID"];

$mysqli = new mysqli($host, $user, $pw, $dbname);

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$query = "DELETE FROM Products WHERE productID = " . $productID;

if ($mysqli->query($query) === TRUE) {
    $response = "Product is successfully removed";
} else {
    $response = "Fail to remove the product: " . $mysqli->error;
}

$mysqli->close();
echo $response;

