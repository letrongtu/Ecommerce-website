<?php
    $host = "localhost";
    $user = "X34851531";
    $pw = "X34851531";
    $dbname = "X34851531";

    $username = $_POST['username'];
    $password = $_POST['password'];
    $userType = $_POST['userType'];

    $mysqli = new mysqli($host, $user, $pw, $dbname);

    if ($mysqli->connect_error) {
        die("Connection failed: " . $mysqli->connect_error);
    }

    $checkQuery = "SELECT userName FROM Accounts WHERE userName = '$username'";
    $result = $mysqli->query($checkQuery);

    if ($result->num_rows > 0) {
        $response = "Username already exists in the system!";
    } else {
        $insertQuery = "INSERT INTO Accounts (userName, userPassword, userType, gmail, userAddress, phone)
                        VALUES ('$username', '$password', '$userType', 'Please update your gmail!',
                                 'Please update your address!', 'Please update your phone!')";

        if ($mysqli->query($insertQuery) === TRUE) {
            $response = "Account created successfully!";
        } else {
            $response = "Failed to create the account. Please try again later.";
        }
    }

    $mysqli->close();
    echo $response;
?>
