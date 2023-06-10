<?php

// ini_set('session.use_only_cookies', 0);
// session_set_cookie_params(3600, "/", "localhost", true, true);
//setcookie("login");
session_start();


//inizializzo le variabili di sessione in modo da potervi accedere negli altri file php


if (!isset($_SESSION))
{
    $_SESSION['logged'] = false;
    $_SESSION['imgProfilo'] = null;
    $_SESSION['username'] = null;
    $_SESSION['password'] = null;
    $_SESSION['bio'] = null;
}










?>