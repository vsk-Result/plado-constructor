<?php

function response() {
    header('Location: ' . '/');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (!empty($_FILES)) {

        ini_set('error_reporting', E_ALL);
        ini_set('display_errors', 1);
        ini_set('display_startup_errors', 1);

        foreach ($_FILES['inputfile']['name'] as $index => $filename) {
            $destinationDir = '../../images/' . $filename;
            move_uploaded_file($_FILES['inputfile']['tmp_name'][$index], $destinationDir);
        }
    }

    response();
}