<?php
    require 'connection.php';
 

    $connection = new ConnectionMySql(); 
    $connection = $connection->getConnection(); 

    $id = $_POST['idPost']; 

    $sql = "SELECT c.commento, c.username, u.imgProfilo FROM Commenta as c JOIN Utenti as u ON u.username = c.username WHERE idPost = '$id'";
    $result = $connection->query($sql); 
    $commentCount = mysqli_num_rows($result);

    if ($commentCount>0){
        $commentResult = mysqli_fetch_all($result, MYSQLI_ASSOC);
        for ($i=0; $i<$commentCount; $i++){
            $commentResult[$i]['imgProfilo'] = base64_encode($commentResult[$i]['imgProfilo']);
        }
        
    }else{
        $commentResult = null;
    }

    $json = array(
        'comment' => $commentResult,
        'commentCount' =>$commentCount,
        
    );

    echo json_encode($json); 

    $connection->close(); 


?>