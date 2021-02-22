<?php
$name = isset($_POST['name']) ? htmlentities($_POST['name'], ENT_QUOTES, 'UTF-8') : null;
$phone = isset($_POST['phone']) ? htmlentities($_POST['phone'], ENT_QUOTES, 'UTF-8')  : null;
$email = isset($_POST['email']) ? htmlentities($_POST['email'], ENT_QUOTES, 'UTF-8') : null;
$validData = ['name' => true, 'phone' => true, 'email'=> true];

if (preg_match("/[^а-я]/iu", $name) || empty($name)) {
    $validData['name'] = false;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $validData['email'] = false;
}

if (!preg_match('/^\+7\(\d{3}\)\d{3}\-\d{2}\-\d{2}$/', $phone)) {
    $validData['phone'] = false;
}

echo(json_encode($validData))
?>