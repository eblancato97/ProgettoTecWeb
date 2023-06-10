<?php
    require 'connection.php';
    require 'globals.php';
    global $_SESSION; 

 

    //richiediamo i dati con una query e verifichiamo che corrispondano
   
    if ($_SESSION['logged']){
        //RACCOGLIERE I DATI DA CARICARE NEL HEADER DEL PROFILO. 

        $author = $_SESSION['username'];

        // Connessione al database
        $connection = new ConnectionMySql();
        $connection = $connection->getConnection();



        $sql = "SELECT p.idPost, p.descrizione, p.autore, p.dataOra, u.imgProfilo  FROM Post as p JOIN Utenti as u ON p.autore = u.username WHERE p.autore <> '$author'";
        $result = $connection->query($sql);
    
        
        if (mysqli_num_rows($result) > 0) {
            // Ottieni tutte le righe come un array associativo
            $arrayResult = mysqli_fetch_all($result, MYSQLI_ASSOC);
            $siz = count($arrayResult); 
            for($k=0; $k<$siz; $k++){
              $arrayResult[$k]['imgProfilo'] = base64_encode($arrayResult[$k]['imgProfilo']);
            }
          
            $cont = count($arrayResult); 

            for($i=0; $i<$cont; $i++){          
                $id = $arrayResult[$i]['idPost'];

                //carico i file per ogni post e li inserisco nell'array che passerò tramite json
                $sql2 = "SELECT imgBinary FROM Files WHERE idPost = '$id'"; 
                $fileResult = $connection->query($sql2);
                $arrayimg = mysqli_fetch_all($fileResult, MYSQLI_ASSOC);
                $col = array_column($arrayimg, 'imgBinary'); 
                $tmp = count($col); 
                for ($j=0; $j<$tmp; $j++){
                  $col[$j] = base64_encode($col[$j]);
                
                }
                $arrayResult[$i]['immagini']= $col;
                // $res['immagini'] = $arrayimg;
            }

            echo json_encode($arrayResult);
        } else {
          echo 0;
        }
            
        

        $connection->close();
    
    }


   
?>