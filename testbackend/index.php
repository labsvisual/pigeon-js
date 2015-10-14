<?php

    header("Access-Control-Allow-Origin: http://127.0.0.1:8080");

    die(json_encode(array(
        "message" => "Hello World!",
        "status_code" => "200"
    )));

?>
