<?php

//session_set_cookie_params(1440);
//session_start();

require 'connection.php';
require_once('globals.php');


global $_SESSION;




if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    die('You cannot access to the page');
    
}else{
    $descrizione = $_POST['descrizione'];




    if (isset($_SESSION['logged']) && isset($_FILES)){
        $username = $_SESSION['username'];
        

        //correggere la data 
        $date = date('Y-m-d H:i:s');


        $connection = new ConnectionMySql();
        $connection = $connection->getConnection();

        //Inserimento di un post con utente corrente
        $sql = "INSERT INTO Post (descrizione, autore, dataOra) VALUES (?, ?, ?)";
        $stmt = mysqli_prepare($connection, $sql);
        mysqli_stmt_bind_param($stmt, 'sss', $descrizione, $username, $date);
        $stmt->execute();
        

        $idPost = $connection->insert_id;
        // recuperare l'idpost appena inserito 

        //prendere singolarmente



        if ($_FILES['immagini']['size']>0){

            
            $count =count($_FILES['immagini']['tmp_name']);
           
            for ($i = 0; $i < $count; $i++){


                $file = "../post".$i.".jpg"; 
               
                
               var_dump($count);
            
                move_uploaded_file($_FILES['immagini']['tmp_name'][$i], $file);
                             
                $image = $connection->real_escape_string(file_get_contents($file));
                
                $sql = "INSERT INTO Files (imgBinary, idPost) VALUES ('$image', '$idPost')";
                $connection->query($sql);

                //cancello i file temporanei per non confonderli con altri utenti
                if (is_file($file)){
                    unlink($file); 
                }

            }
        
            

            //in caso non vengano caricate le immagini cancellare il post precedente. 
        }else{
            echo 1;
        }
            
            
            
            echo 0;
    }else{
        echo 1; 
    }
    
        $connection->close();

}


?>
