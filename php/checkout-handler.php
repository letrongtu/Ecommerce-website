<?php
$host = "localhost";
$user = "X34851531";
$pw = "X34851531";
$dbname = "X34851531";

$user2 = "X34360497";
$pw2 = "X34360497";
$dbname2 = "X34360497";

$user_name = $_POST['user_name'];
$product_names = $_POST['product_names'];
$colours = $_POST['colours'];
$sizes = $_POST['sizes'];
$quantities = $_POST['quantities'];
$total_price = $_POST['total_price'];
$product_IDs = $_POST['product_ids'];

$mysqli = new mysqli($host, $user, $pw, $dbname);
$mysqli2 = new mysqli($host, $user2, $pw2, $dbname2);

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

if ($mysqli2->connect_error) {
    die("Connection failed: " . $mysqli2->connect_error);
}


$response = "";

if($user_name === "Unregisted"){
    $response = "Please login to checkout!";
}
else if($total_price === "$0.00"){
    $response = "Please order at least 1 product!";
}
else{
    $productNamesArray = explode(',', $product_names);
    $productIDsArray = explode(',', $product_IDs);
    $quantitiesArray = explode(',', $quantities);

    for ($i = 0; $i < count($productNamesArray); $i++) {
        $productName = $productNamesArray[$i];
        $productID = $productIDsArray[$i];
        $quantity = (int)$quantitiesArray[$i];

        $query = "SELECT * FROM Products WHERE productID = '$productID' ";
        $result = $mysqli2->query($query);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $stock = (int)$row["Stock"];

            if ($stock <= 0) {
                $response .= "$productName: Out of stock!\n";
            } else if ($stock < $quantity) {
                $response .= "There are only $stock items of $productName!\n";
            }
            else{
                $newStock = $stock - $quantity;
                $secondQuery = "UPDATE Products SET Stock = '$newStock' WHERE productID = '$productID'";

                if ($mysqli2->query($secondQuery) === FALSE) {
                    $response .= "Error updating stock: " . $mysqli2->error;
                }
            }
        } else {
            $response .= "Product $productName not found in the database!";
        }
    }

    if (empty($response)) {
        $query = "INSERT INTO Orders (user_name, product_names, colours, sizes, quantities, total_price)
                    VALUES ('$user_name', '$product_names', '$colours', '$sizes', '$quantities', '$total_price')";

        if ($mysqli->query($query) === TRUE) {
            $response = "Successfully Ordered!";
        } else {
            $response = "Failed to order. Please try again";
        }
    }
}


$mysqli->close();
echo $response;
?>
