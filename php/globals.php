<?php


session_start();


//inizializzo le variabili di sessione in modo da potervi accedere negli altri file php


if (!isset($_SESSION))
{
    $_SESSION['logged'] = false;
    $_SESSION['imgProfilo'] = null;
    $_SESSION['password'] = null;
    $_SESSION['bio'] = null;
}










?>