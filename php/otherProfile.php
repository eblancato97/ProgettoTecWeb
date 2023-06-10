<?php
    require 'connection.php';
    require 'globals.php';
    global $_SESSION; 


    //richiediamo i dati con una query e verifichiamo che corrispondano
    if ($_POST['parametro']!=null){
        //RACCOGLIERE I DATI DA CARICARE NEL HEADER DEL PROFILO. 
        $author = $_POST['parametro'];


        // Connessione al database
        $connection = new ConnectionMySql();
        $connection = $connection->getConnection();

        $utenteLoggato = $_SESSION['username'];
        $seguito = false; 

        //QUì DA SOSTITUIRE CON UNA SELECT E LE RELATIVE COUNT 
        $sql= "SELECT * FROM Segue WHERE utenteSeguito = '$author' AND utenteSeguente = '$utenteLoggato'"; 
        $result = $connection->query($sql); 

        // echo $result;

        if (mysqli_num_rows($result)>0){
            $result = mysqli_fetch_assoc($result); 
            $seguito = true; 
        }


        $sql = "SELECT COUNT(*) AS count FROM Segue WHERE utenteSeguente = '$author'";
        $result = $connection->query($sql); 

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







        //DECOMMENTARE IL CODICE SOTTO E CARICARE I POST SE CI SONO 

        $sql = "SELECT p.idPost, p.descrizione, p.autore, p.dataOra, u.imgProfilo  FROM Post as p JOIN Utenti as u ON p.autore = u.username
        WHERE autore = '$author' ";
        $result = $connection->query($sql);
    
        $nPost= mysqli_num_rows($result); 
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
                if (mysqli_num_rows($likeResult)>0){
                $likeList = mysqli_fetch_all($likeResult, MYSQLI_ASSOC);
                $arrayResult[$i]['like'] = $likeList;
                }else{
                $arrayResult[$i]['like'] = null;
                }

                //aggiungo i commenti
                $sql = "SELECT * FROM Commenta WHERE idPost = '$id'";
                $commentResult = $connection->query($sql);
                if (mysqli_num_rows($commentResult)>0){
                $commentList = mysqli_fetch_all($commentResult, MYSQLI_ASSOC);
                $arrayResult[$i]['comment'] = $commentList;
                }else{
                $arrayResult[$i]['comment'] = null;
                }
                    
            }

            $json= array(
                "seguiti" => $seguiti,
                "follower" => $follower,
                "nPost" => $nPost,
                "seguito" => $seguito,
                "post" => $arrayResult,                
            );
            
            
            echo json_encode($json); 
            
        } else {
            $json= array(
                "seguiti" => $seguiti,
                "follower" => $follower,
                "nPost" => $nPost,
                "seguito" => $seguito          
            );
            
            echo json_encode($json);
           //questo ritorno di errore non ci sarà e il codice del caricamento dei post verrà
           //fatto solo se il numero di post trovati sarà superiore a 0
        }
        $connection->close();
    
    }


   
?>