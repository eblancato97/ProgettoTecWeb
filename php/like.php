<?php
    require 'connection.php';
    require 'globals.php';


    $connection = new ConnectionMySql();
    $connection = $connection->getConnection();

    $idPost = $_POST['idPost'];
    $operation = $_POST['operation'];
    $user = $_SESSION['username'];
    $dataOra = date('Y-m-d H:i:s');
    

    if ($operation == 'add'){

        $sql = "INSERT INTO Mette_like (username, idPost, dataOra) VALUES ('$user', '$idPost', '$dataOra')";
        $response = 0; 

    }else if ($_POST['operation']=='remove'){

        $sql = "DELETE FROM Mette_like WHERE idPost = '$idPost' AND username = '$user'";
        $response = 1; 

    }
    $connection->query($sql); 
    echo $response;

    $connection->close();
?>