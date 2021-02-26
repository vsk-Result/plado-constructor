<?php

function response() {
    header('Location: ' . '/');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (!empty($_FILES)) {
        foreach ($_FILES['inputfile']['name'] as $index => $filename) {
            $destinationDir = '../../images/' . $filename;
            move_uploaded_file($_FILES['inputfile']['tmp_name'][$index], $destinationDir);
        }
    }

    response();
}