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


        $sql = "SELECT COUNT(*) AS count FROM Segue WHERE utenteSeguente = '$author'";
        $result = $connection->query($sql); 

        //per forza ritorna almeno una riga
        if (mysqli_num_rows($result)>0){
            $result = mysqli_fetch_assoc($result); 
            $seguiti = $result['count'];
        }

        $sql = "SELECT COUNT(*) AS count FROM Segue WHERE utenteSeguito = '$author'";
        $result = $connection->query($sql); 

        if (mysqli_num_rows($result)>0){
            $result = mysqli_fetch_assoc($result); 
            $follower = $result['count'];
        }



        $sql = "SELECT p.idPost, p.descrizione, p.autore, p.dataOra, u.imgProfilo  FROM Post as p JOIN Utenti as u ON p.autore = u.username
        WHERE autore = '$author' ";
        $result = $connection->query($sql);
    
        $nPost = mysqli_num_rows($result);
        if ( $nPost > 0) {
            // Ottieni tutte le righe come un array associativo
            $arrayResult = mysqli_fetch_all($result, MYSQLI_ASSOC);
            $siz = count($arrayResult); 
            for($k=0; $k<$siz; $k++){
              $arrayResult[$k]['imgProfilo'] = base64_encode($arrayResult[$k]['imgProfilo']);
            }
          
            // Stampa l'array dei risultati
            
            
        
            
        $cont = count($arrayResult); 

        for($i=0; $i<$cont; $i++){
          
            //ciclo i post
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

            //aggiungo i like 
            $sql = "SELECT * FROM Mette_like WHERE idPost = '$id'";
            $likeResult = $connection->query($sql);
            $likeCount = mysqli_num_rows($likeResult);
            if ($likeCount>0){
              $likeList = mysqli_fetch_all($likeResult, MYSQLI_ASSOC);
              $arrayResult[$i]['like'] = $likeList;
              $arrayResult[$i]['likeCount'] = $likeCount;
            }else{
              $arrayResult[$i]['like'] = null;
              $arrayResult[$i]['likeCount'] = $likeCount;

            }

     
            
          }

          $json = array(
            "seguiti" => $seguiti, 
            "follower" => $follower, 
            "nPost" => $nPost,
            "post" => $arrayResult,
          );
          
          
          echo json_encode($json); 
        } else {
          $json = array(
            "seguiti" => $seguiti,
            "follower" =>$follower,
            "nPost" => $nPost,
          );
          echo json_encode($json); 
        
        }
          
          $connection->close();
          
    }


   
?>