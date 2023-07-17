<?php


require 'connection.php';

require_once 'globals.php';
global $_SESSION;


//gestione dei valori del form ed invio tramite mysql
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    die('You cannot access to the page');
    
}else{
    //$username = filter_var($_POST['username'], FILTER_UNSAFE_RAW);
    $username = $_POST['username'];
    $password = $_POST['password'];
  

    $connection = new ConnectionMySql();
    $connection = $connection->getConnection();

    //richiediamo i dati con una query e verifichiamo che corrispondano
    $sql = "SELECT * FROM Utenti WHERE username = ?";
    $stmt = mysqli_prepare($connection, $sql);
    mysqli_stmt_bind_param($stmt, 's', $username);
    $stmt->execute();
    $res = $stmt->get_result();
    if (mysqli_num_rows($res)>0){

        $result = mysqli_fetch_assoc($res);
        

        //salvo l'immagine in una cartella locale e ne salvo il percorso nella variabili di sessione
        //per accederle più velocemente. 
        $hashedPassword = $result['passwordUtente'];
        if (isset($result) && password_verify($password, $hashedPassword)){
            
            //imposto la visuale dell'account tramite js
            
        
            //cancello il file temporaneo per l'immagine profilo
            $file = "../".$username.".jpg"; 
            if (is_file($file)){
                unlink($file); 
            }


            
            if (!is_null($result['imgProfilo']))
            {             
                
                $image = $result['imgProfilo'];
                file_put_contents($file, $image);
                $_SESSION['imgProfilo'] = $file;
            }
            
            $_SESSION['username'] = $_POST['username'];
            $_SESSION['bio'] = $result['bio'];
            $_SESSION['logged'] = true; 
        
        
        
            $json = array(
                "username" => $_POST['username'],
                "bio" => $result['bio'],
                "logged" => true,  
                "urlImage" => $file
            );
        
            echo json_encode($json);
        
        
        }else{  
            
            
            echo 1;
            
        }

        $connection->close();
    }else{
        echo 1; 
    }
}


?>

