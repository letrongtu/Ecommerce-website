<?php
$host = "localhost";
$user = "X34851531";
$pw = "X34851531";
$dbname = "X34851531";

$username = $_POST['username'];
$password = $_POST['password'];

$mysqli = new mysqli($host, $user, $pw, $dbname);

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$query = "SELECT userID, userName, userPassword, userType, gmail, userAddress, phone FROM Accounts WHERE userName = ?";
$statement = $mysqli->prepare($query);
$statement->bind_param("s", $username);
$statement->execute();
$statement->bind_result($userID, $userName, $userPassword, $userType, $gmail, $address, $phone);

$response = array();

if ($statement->fetch()) {
    if($userPassword === $password){
        $response['userID'] = $userID;
        $response['userName'] = $userName;
        $response['userPassword'] = $userPassword;
        $response['userType'] = $userType;
        $response['gmail'] = $gmail;
        $response['address'] = $address;
        $response['phone'] = $phone;
    }
    else{
        $response['userType'] = 'Incorrect Password';
    }

}

$statement->close();
$mysqli->close();

echo json_encode($response);
?>
