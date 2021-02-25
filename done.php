<!DOCTYPE html>
<html lang="ru">
<html>
<head>
    <meta charset="UTF-8">
    <title>Спасибо</title>
</head>
<body>
<p style="text-align:center">&nbsp;</p>

<p style="text-align:center">&nbsp;</p>

<p style="text-align:center">&nbsp;</p>

<p style="text-align:center">&nbsp;</p>

<p style="text-align:center">&nbsp;</p>
<p style="text-align:center">&nbsp;</p>
<p style="text-align:center">&nbsp;</p>

<p style="text-align:center"><span style="font-size:48px"><span
                style="font-family:Trebuchet MS,Helvetica,sans-serif"><span style="color:#000000">Спасибо</span></span></span>
</p>

<p style="text-align:center"><span style="font-size:28px"><span
                style="font-family:Trebuchet MS,Helvetica,sans-serif"><span style="color:#000000"><span
                        style="color:#808080">Ваш заказ принят к обработке. Наш менеджер свяжется с вами в ближайшее время!</span></span></span></span>
</p>
</body>
</html>


<!-- Yandex.Metrika counter. Счетчик подставить свой -->
<!-- /Yandex.Metrika counter -->

<?php

$name = $_POST['name']; //Получаем имя юзера, заполненного на форме
$phone = $_POST['phone']; //Получаем телефон юзера, заполненного на форме 
$utm_source = $_POST['source']; //Получаем ютм метки с формы
$utm_campagin = $_POST['campagin']; //Получаем ютм метки с формы
$utm_medium = $_POST['medium']; //Получаем ютм метки с формы
$utm_term = $_POST['term']; //Получаем ютм метки с формы
$utm_content = $_POST['content']; //Получаем ютм метки с формы

$token = "YwLuwexO16njbZFrIh-zdXBXxOeGprYw";  // Ключ для  Testleadgen
$url = "http://api.plado.market/lead/create";

$offer_id = "133";
$lead_information = "";
$country = "tj";
$price = "319000";
$count = 1;

$ip = $_SERVER['REMOTE_ADDR'];


$data1 = "{
\"name\":\"$name\",
\"phone\":\"$phone\",
\"country\":\"$country\",
\"offer_id\":\"$offer_id\",
\"lead_information\":\"$lead_information\",
\"price\":\"$price\",
\"quantity\":\"$count\",
\"ipaddr\":\"$ip\",
\"utm_source\":\"$utm_source\",
\"utm_campagin\":\"$utm_campagin\",
\"utm_medium\":\"$utm_medium\",
\"utm_term\":\"$utm_term\",
\"utm_content\":\"$utm_content\",
\"business_model_id\":\"$business_model_id\",
\"partnership_id\":\"$partnership_id\"
}";


$process = curl_init();
curl_setopt($process, CURLOPT_HTTPHEADER, array("Content-type: application/json", "Authorization: Bearer " . $token));
curl_setopt($process, CURLOPT_USERAGENT, "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 1.0.3705; .NET CLR 1.1.4322; Media Center PC 4.0)");
curl_setopt($process, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($process, CURLOPT_FOLLOWLOCATION, 0);
curl_setopt($process, CURLOPT_TIMEOUT, 20);
curl_setopt($process, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($process, CURLOPT_POST, true);
curl_setopt($process, CURLOPT_POSTFIELDS, $data1);
curl_setopt($process, CURLOPT_URL, $url);

$return = curl_exec($process);
curl_close($process);

$url_reserve = "http://apireserve.plado.market/lead/create";

$process2 = curl_init();
curl_setopt($process2, CURLOPT_HTTPHEADER, array("Content-type: application/json", "Authorization: Bearer " . $token));
curl_setopt($process2, CURLOPT_USERAGENT, "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 1.0.3705; .NET CLR 1.1.4322; Media Center PC 4.0)");
curl_setopt($process2, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($process2, CURLOPT_FOLLOWLOCATION, 0);
curl_setopt($process2, CURLOPT_TIMEOUT, 20);
curl_setopt($process2, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($process2, CURLOPT_POST, true);
curl_setopt($process2, CURLOPT_POSTFIELDS, $data1);
curl_setopt($process2, CURLOPT_URL, $url_reserve);

$return = curl_exec($process2);
curl_close($process2);

$url_reserve2 = "185.189.13.160:9099/lead/create";

$process3 = curl_init();
curl_setopt($process3, CURLOPT_HTTPHEADER, array("Content-type: application/json", "Authorization: Bearer " . $token));
curl_setopt($process3, CURLOPT_USERAGENT, "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 1.0.3705; .NET CLR 1.1.4322; Media Center PC 4.0)");
curl_setopt($process3, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($process3, CURLOPT_FOLLOWLOCATION, 0);
curl_setopt($process3, CURLOPT_TIMEOUT, 20);
curl_setopt($process3, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($process3, CURLOPT_POST, true);
curl_setopt($process3, CURLOPT_POSTFIELDS, $data1);
curl_setopt($process3, CURLOPT_URL, $url_reserve2);

$return = curl_exec($process3);
curl_close($process3);
?>