<?php

class ConnectionMySql{
    private $hostName = "localhost";
    private $username = "root";
    private $password = "";
    private $database = "tecwebdb"; //sostituire con il nome del database

    
    //salvo la connessione nell'oggetto per gestirla nella creazione e nella chiusura. 
    //verificare la necessita di un metodo getConnection()
    private $connection;


    public function __construct()
    {
        if (!$this->connection) {
            $this->connection = mysqli_connect($this->hostName, $this->username, $this->password, $this->database);
        }
    }

    public function getConnection(){
        if ($this->connection!==null){
           
            return $this->connection; 
        }else{
            $this->connection =  mysqli_connect($this->hostName, $this->username, $this->password, $this->database);
            if ($this->connection ===null) {
                die('Connection failed: ' . mysqli_connect_error()); 
            }
            return $this->connection;
        }
    }


}


?>