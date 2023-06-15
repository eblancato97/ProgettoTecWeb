<?php
require 'globals.php';
require 'connection.php';

//codice di inserimento e cancellazione record di follow
//invio 3 parametri Utente seguito, Utente seguente, azione(follow, unfollow)
$connection = new ConnectionMySql();
$connection = $connection->getConnection();

$seguente = $_POST['seguente']; 
$seguito = $_POST['seguito'];
$dataOra = date('Y-m-d H:i:s');

if ($_POST['operation']=='add'){
    
    $sql = "INSERT INTO Segue (utenteSeguente, utenteSeguito, dataOra)  VALUES ('$seguente', '$seguito', '$dataOra')";

    if ($connection->query($sql) === TRUE){
        echo 0;
        //Inserimento nelle notifiche l'inizio del segui
        $notifica = $seguente." ha iniziato a seguirti.";
        $sql = "INSERT INTO Notifiche (notifica, dataOra, username, userNotifica) VALUES ('$notifica', '$dataOra', '$seguito', '$seguente')";
        $connection->query($sql);
    }else{
        echo 1;
    }
}else if($_POST['operation']=='remove'){

    $sql = "DELETE FROM Segue WHERE utenteSeguente = '$seguente' AND utenteSeguito = '$seguito'";

    if ($connection->query($sql) === TRUE){
        echo 0;

    }else{
        echo 1;
    }
}

$connection->close();

?>