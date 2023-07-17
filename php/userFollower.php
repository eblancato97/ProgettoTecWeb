<?php
require 'connection.php';

$connection = new ConnectionMySql(); 
$connection = $connection->getConnection();

$user = $_POST['userFollower'];

$sql = "SELECT s.utenteSeguente, u.imgProfilo, u.bio FROM Segue AS s JOIN Utenti AS u ON s.utenteSeguente = u.username WHERE utenteSeguito = '$user'"; 
$result = $connection->query($sql); 

$resultCount = mysqli_num_rows($result); 
if ($resultCount>0){
    $followerList = mysqli_fetch_all($result, MYSQLI_ASSOC); 
    for ($i=0; $i<$resultCount; $i++){
        $followerList[$i]['imgProfilo'] = base64_encode($followerList[$i]['imgProfilo']);
    }

}else{
    $followerList = 0; 
}

$json = array(
    "follower" => $followerList
);

echo json_encode($json); 
$connection->close();




?>