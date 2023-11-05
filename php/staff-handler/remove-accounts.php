<?php
$host = "localhost";
$user = "X34851531";
$pw = "X34851531";
$dbname = "X34851531";

$accountID = $_POST["accountID"];

$mysqli = new mysqli($host, $user, $pw, $dbname);

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$query = "DELETE FROM Accounts WHERE userID = " . $accountID;

if ($mysqli->query($query) === TRUE) {
    $response = "Account is successfully removed";
} else {
    $response = "Fail to remove the account: " . $mysqli->error;
}

$mysqli->close();
echo $response;

