<?php
$host = "localhost";
$user = "X34851531";
$pw = "X34851531";
$dbname = "X34851531";

$mysqli = new mysqli($host, $user, $pw, $dbname);

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$query = "SELECT * FROM Accounts";

$result = $mysqli->query($query);
$response = '<h2>Accounts Table</h2>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>User Password</th>
                        <th>User Type</th>
                        <th>Gmail</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th></th>
                    </tr>
                </thead>
            <tbody>';

if($result->num_rows >0){
    while($row = $result->fetch_assoc()){
        $response .= '  <tr>
                            <td>' . $row["userID"] . '</td>
                            <td>'. $row["userName"] .'</td>
                            <td>'. $row["userPassword"] .'</td>
                            <td>'. $row["userType"] .'</td>
                            <td>'. $row["gmail"] .'</td>
                            <td>'. $row["userAddress"] .'</td>
                            <td>'. $row["phone"] .'</td>
                            <td><i class="fa-solid fa-circle-xmark"></i></td>
                        </tr>';
    }

    $response .= '      </tbody>
                    </table>';
}

$mysqli->close();
echo $response;

