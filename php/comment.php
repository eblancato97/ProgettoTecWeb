<?php
    require 'connection.php'; 
    require 'globals.php'; 


    $connection = new ConnectionMySql(); 
    $connection = $connection->getConnection(); 


    $idPost = $_POST['idPost'];
    $user = $_SESSION['username']; 
    $dataOra = date('Y-m-d H:i:s');
    $commento = $_POST['commento'];

    $sql = "INSERT INTO Commenta (username, idPost, dataOra, commento) VALUES ('$user', '$idPost', 
    '$dataOra', '$commento')";

    if($connection->query($sql)== true){
        echo 0; 
    }else{
        echo 1; 
    }



?>