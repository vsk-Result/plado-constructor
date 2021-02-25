<?php

function response($data, int $http_code = 200) {
    http_response_code($http_code);
    header('Content-Type: application/json');
    header("Cache-Control: no-cache, must-revalidate");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");

    echo json_encode($data);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $request = file_get_contents('php://input');

    try {
        $payload = json_decode($request, true);
    } catch (\Exception $e) {
        response('Invalid JSON payload', 422);
    }

    $images = getImagesFromDir(json_decode($request)->path);
    response(json_encode($images, JSON_UNESCAPED_SLASHES), 200);
}

function getImagesFromDir($dir) {
    $path = '../..' . $dir;
    $imagesArray = [];
    $images = scandir($path);
    if ($images !== false) {
        $images = preg_grep("/\.(?:png|gif|jpe?g)$/i", $images);
        if (is_array($images)) {
            foreach ($images as $image) {
                $imagesArray[] = $dir . urlencode($image);
            }
        }
    }

    return $imagesArray;
}