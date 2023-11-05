<?php
$host = "localhost";
$user = "X34360497";
$pw = "X34360497";
$dbname = "X34360497";

$mysqli = new mysqli($host, $user, $pw, $dbname);

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

if(isset($_GET['q'])) {
    $query = $_GET['q'];

    $results = [];
    $stmt = $mysqli->prepare("SELECT productID, productTitle, images, brand FROM Products WHERE productTitle LIKE ? LIMIT 5");
    $likeQuery = "%" . $query . "%";
    $stmt->bind_param('s', $likeQuery);
    $stmt->execute();
    $stmt->bind_result($productID, $productTitle, $images, $brand);

    while($stmt->fetch()) {
        $imageArray = explode(',', $images);
        $results[] = ['productID' => $productID, 'productTitle' => $productTitle, 'image' => $imageArray[0], 'brand' => $brand];
    }

    $stmt->close();
    echo json_encode($results);
}
?>
