<?php

require 'connection.php';
require 'globals.php'; 
global $_SESSION; 

$connection = new ConnectionMySql(); 
$connection = $connection->getConnection(); 

$username = $_SESSION['username'];

$sql = "SELECT * FROM Notifiche WHERE username = '$username' ORDER BY dataOra DESC";
$result = $connection->query($sql); 

$notificheCont = mysqli_num_rows($result); 

if ($notificheCont>0){
    $notifiche = mysqli_fetch_all($result, MYSQLI_ASSOC); 
    for($i=0; $i<$notificheCont; $i++){
        $userTmp = $notifiche[$i]['userNotifica'];
        $sql = "SELECT imgProfilo FROM Utenti WHERE username = '$userTmp'"; 
        $result = $connection->query($sql); 
        $immagine = mysqli_fetch_column($result); 
        $notifiche[$i]['imgProfilo'] = base64_encode($immagine);
    
    }
    
    $json = array(
        'notifiche' => $notifiche
    );

}else{
    $json = array(
        'notifiche' => null
    );
}

echo json_encode($json); 


?>