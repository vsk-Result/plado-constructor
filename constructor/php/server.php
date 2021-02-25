<?php

$token = 'your-token';

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

    $newHtml = clearHtmlFromConstructor(json_decode($request)->newHtml);

    file_put_contents('../output/index.php', $newHtml, FILE_USE_INCLUDE_PATH);

    response('Download done! See new index file in constructor/output directory!', 200);
}

function clearHtmlFromConstructor($html) {
    $html = str_replace('data-editable-type="image"', '', $html);
    $html = str_replace('data-editable-type="html"', '', $html);
    $html = str_replace('data-editable="text"', '', $html);
    $html = str_replace('data-editable="image"', '', $html);
    $html = str_replace('<link rel="stylesheet" href="constructor/css/plado-constructor.css">', '', $html);
    $html = str_replace('<script src="constructor/js/plado-constructor.js"></script>', '', $html);
    $html = str_replace(' <script src="constructor/js/constructor.js"></script>', '', $html);
    return $html;
}