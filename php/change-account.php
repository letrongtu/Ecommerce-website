<?php
    $host = "localhost";
    $user = "X34851531";
    $pw = "X34851531";
    $dbname = "X34851531";

    $userID = $_POST['userID'];
    $userName = $_POST['userName'];
    $password = $_POST['password'];
    $gmail = $_POST['gmail'];
    $userAddress = $_POST['userAddress'];
    $phone = $_POST['phone'];


    $mysqli = new mysqli($host, $user, $pw, $dbname);

    if ($mysqli->connect_error) {
        die("Connection failed: " . $mysqli->connect_error);
    }

    $query = "UPDATE Accounts SET
                         userName = '$userName',
                         userPassword = '$password',
                         gmail = '$gmail',
                         userAddress = '$userAddress',
                         phone = '$phone'
                   WHERE userID = '$userID'";

    if ($mysqli->query($query) === TRUE) {
        $response = "Account changed successfully!";
    } else {
        $response = "Failed to change the account!";
    }

    $mysqli->close();
    echo $response;
?>
