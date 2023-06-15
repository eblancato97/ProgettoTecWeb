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

    if($connection->query($sql)== TRUE){
        $sql = "SELECT autore FROM Post WHERE idPost = '$idPost'"; 
        $result = $connection->query($sql);
        $authorResult = mysqli_fetch_all($result, MYSQLI_ASSOC); 
        $autore = $authorResult[0]['autore'];
        if ($autore != $user){
            $notifica = $user. " ha commentato il tuo post con: ".$commento;
            $sql = "INSERT INTO Notifiche (notifica, dataOra, username, userNotifica) VALUES ('$notifica', '$dataOra', '$autore', '$user')";
            $connection->query($sql); 
        }
        echo 0; 
    }else{
        echo 1; 
    }



?>