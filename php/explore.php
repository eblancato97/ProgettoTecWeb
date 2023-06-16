<?php
    require 'connection.php';
    require_once('globals.php');
    global $_SESSION; 

    if ($_POST['search']!= null){
        $user = $_POST['search'];
        $logged = $_SESSION['username'];
        

        // Connessione al database
        $connection = new ConnectionMySql();
        $connection = $connection->getConnection();
 
        $sql = "SELECT username, imgProfilo, bio FROM Utenti WHERE username!= '$logged' AND username LIKE '%".$user."%'";
        $result = $connection->query($sql);
        $arrayResult = mysqli_fetch_all($result, MYSQLI_ASSOC);

        $j = count($arrayResult); 

        for($i=0; $i<$j; $i++){
            $arrayResult[$i]['imgProfilo'] = base64_encode($arrayResult[$i]['imgProfilo']);
        }

        echo json_encode($arrayResult); 

        $connection->close();
 
    }




?>