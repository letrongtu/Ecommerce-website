<?php
$host = "localhost";
$user = "X34360497";
$pw = "X34360497";
$dbname = "X34360497";

$mysqli = new mysqli($host, $user, $pw, $dbname);

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$query = "SELECT * FROM Products";

$result = $mysqli->query($query);
$response = '<h2>Products Table</h2>
            <table>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Title</th>
                        <th>Product Price</th>
                        <th>Brand</th>
                        <th>Product Type</th>
                        <th>Colour</th>
                        <th>Team</th>
                        <th>Stock</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>';

if($result->num_rows >0){
    while($row = $result->fetch_assoc()){
        $response .= '  <tr>
                            <td>' . $row["productID"].'</td>
                            <td>'. $row["productTitle"] .'</td>
                            <td>'. $row["productPrice"] .'</td>
                            <td>'. $row["brand"] .'</td>
                            <td>'. $row["productType"] .'</td>
                            <td class="colour">'. $row["colour"] .'</td>
                            <td>'. $row["Team"] .'</td>
                            <td>'. $row["Stock"] .'</td>
                            <td><i class="fa-solid fa-circle-xmark"></i></td>
                        </tr>';
    }

    $response .= '      </tbody>
                    </table>';
}

$mysqli->close();
echo $response;

