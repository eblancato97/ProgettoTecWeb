<?php
require 'connection.php';





if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        die('You cannot access to the page');
} else {
    //controllo e assegno i dati passati 
    $username = filter_var($_POST['usernamer'], FILTER_UNSAFE_RAW);
    $password = $_POST['passwordr'];

    //ottengo la connessioe
    $connessione = new ConnectionMySql();
    $connessione = $connessione->getConnection();
 
    //richiediamo i dati con una query e verifichiamo che corrispondano
    $sql = "SELECT  username FROM utenti where username=?";
    $stmt = mysqli_prepare($connessione, $sql);
    mysqli_stmt_bind_param($stmt, 's', $_POST['usernamer']);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_bind_result($stmt, $result); 
    mysqli_stmt_fetch($stmt); 



 

    if (isset($result) && $result === $_POST['usernamer']) {
        echo 1; 
    } else {
        //inserimento utente 

        if(!empty($_FILES['imgProfilo']['name'])) {
          $file = "../".$_POST['usernamer'].".jpg"; 
          if (is_file($file)){
              unlink($file); 
          }
          move_uploaded_file($_FILES['imgProfilo']['tmp_name'], $file);
       
            
            $image = $connessione->real_escape_string(file_get_contents($file));

            $username = $_POST['usernamer'];
            $emailUtente = $_POST['emailr'];
            $password = $_POST['passwordr'];
            $passwordUtente = password_hash($password, PASSWORD_DEFAULT);

            $bio = $_POST['bio'];

            $sql = "INSERT INTO Utenti (username, emailUtente, passwordUtente, bio, imgProfilo) VALUES ('$username', '$emailUtente', '$passwordUtente', '$bio', '$image')";
            $connessione->query($sql);
        }else{
            $username = $_POST['usernamer'];
            $emailUtente = $_POST['emailr'];
            $password = $_POST['passwordr'];
            $passwordUtente = password_hash($password, PASSWORD_DEFAULT);
            $bio = $_POST['bio'];
            $image = $connessione->real_escape_string(file_get_contents("../resources/profiloVuoto.jpg"));

            $sql = "INSERT INTO Utenti (username, emailUtente, passwordUtente, bio, imgProfilo) VALUES ('$username', '$emailUtente', '$passwordUtente', '$bio', '$image')";
            $connessione->query($sql);

        }
        $connessione->close();

          

        echo 0;


    }
    
}


?>