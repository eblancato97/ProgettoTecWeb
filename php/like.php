<?php
    require 'connection.php';
    require 'globals.php';
    global $_SESSION;


    $connection = new ConnectionMySql();
    $connection = $connection->getConnection();

    $idPost = $_POST['idPost'];
    $operation = $_POST['operation'];
    $user = $_SESSION['username'];
    $dataOra = date('Y-m-d H:i:s');
    

    if ($operation == 'add'){

        $sql = "INSERT INTO Mette_like (username, idPost, dataOra) VALUES ('$user', '$idPost', '$dataOra')";
        $connection->query($sql); 
        $response = 0; 
        $sql = "SELECT autore FROM Post WHERE idPost = '$idPost'"; 
        $result = $connection->query($sql);
        $authorResult = mysqli_fetch_assoc($result); 
        $autore = $authorResult['autore'];
        if ($autore != $user){
            $notifica = $user. " ha messo mi piace al tuo post.";
            $sql = "INSERT INTO Notifiche (notifica, dataOra, username, userNotifica) VALUES ('$notifica', '$dataOra', '$autore', '$user')";
            $connection->query($sql); 
        }
    }else if ($operation == 'remove'){

        $sql = "DELETE FROM Mette_like WHERE idPost = '$idPost' AND username = '$user'";
        $connection->query($sql); 
        $response = 1; 

    }

    echo $response;

    $connection->close();
?>