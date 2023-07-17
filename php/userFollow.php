<?php
require 'connection.php';

$connection = new ConnectionMySql(); 
$connection = $connection->getConnection();

$user = $_POST['userFollow'];

$sql = "SELECT s.utenteSeguito, u.imgProfilo, u.bio FROM Segue AS s JOIN Utenti AS u ON s.utenteSeguito = u.username WHERE utenteSeguente = '$user'"; 
$result = $connection->query($sql); 

$resultCount = mysqli_num_rows($result); 
if ($resultCount>0){
    $followList = mysqli_fetch_all($result, MYSQLI_ASSOC); 
    for ($i=0; $i<$resultCount; $i++){
        $followList[$i]['imgProfilo'] = base64_encode($followList[$i]['imgProfilo']);
    }

}else{
    $followList = 0; 
}

$json = array(
    "follow" => $followList
);

echo json_encode($json); 
$connection->close();




?>