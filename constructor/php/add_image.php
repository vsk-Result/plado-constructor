<?php

function response() {
    header('Location: ' . '/');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $request = file_get_contents('php://input');

    try {
        $payload = json_decode($request, true);
    } catch (\Exception $e) {
        response('Invalid JSON payload', 422);
    }

    if (isset($_FILES)) {
        foreach ($_FILES['inputfile']['name'] as $index => $filename) {
            $destiationDir = '../../images/' . $filename;
            move_uploaded_file($_FILES['inputfile']['tmp_name'][$index], $destiationDir);
        }
    }

    response();
}