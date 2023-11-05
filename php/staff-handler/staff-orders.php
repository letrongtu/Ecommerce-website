<?php
$host = "localhost";
$user = "X34851531";
$pw = "X34851531";
$dbname = "X34851531";

$mysqli = new mysqli($host, $user, $pw, $dbname);

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$query = "SELECT * FROM Orders";

$result = $mysqli->query($query);
$response = '<h2>Orders Table</h2>
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>User Names</th>
                        <th>Product Names</th>
                        <th>Colours</th>
                        <th>Sizes</th>
                        <th>Quantities</th>
                        <th>Total Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>';

if($result->num_rows >0){
    while($row = $result->fetch_assoc()){

        $product_names = explode(',', $row["product_names"]);
        $colours = explode(',', $row["colours"]);
        $sizes = explode(',', $row["sizes"]);
        $quantities = explode(',', $row["quantities"]);

        $nop = count($colours);
        for($index = 0; $index < $nop; $index++){
            if($index === 0){
                $response .= '<tr>
                                <td>'. $row["order_id"] .'</td>
                                <td>'. $row["user_name"] .'</td>
                                <td>'. $product_names[0] .'</td>
                                <td class="colour">'. $colours[0] .'</td>
                                <td>'. $sizes[0] .'</td>
                                <td>'. $quantities[0] .'</td>
                                <td>'. $row["total_price"] .'</td>
                                <td><i class="fa-solid fa-circle-xmark"></i></td>
                            </tr>';
            }
            else{
                $response .= '<tr>
                                <td></td>
                                <td></td>
                                <td>'. $product_names[$index] .'</td>
                                <td class="colour">'. $colours[$index] .'</td>
                                <td>'. $sizes[$index] .'</td>
                                <td>'. $quantities[$index] .'</td>
                                <td></td>
                                <td></td>
                            </tr>';
            }
        }
    }

    $response .= '      </tbody>
                    </table>';
}

$mysqli->close();
echo $response;

