<?php
require 'pdo_connect.php';

$pdo = pdo_connect();

$sql = "SELECT task FROM tasks";
$stmt = $pdo->query($sql);

$tasks = $stmt->fetchAll(PDO::FETCH_COLUMN);

echo json_encode($tasks);
