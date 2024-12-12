<?php
require 'pdo_connect.php';

$pdo = pdo_connect();

$input = json_decode(file_get_contents('php://input'), true);
$task = $input['task'];

$sql = "INSERT INTO tasks (task) VALUES (:task)";
$stmt = $pdo->prepare($sql);

if ($stmt->execute(['task' => $task])) {
    echo json_encode(["message" => "Task added successfully"]);
} else {
    echo json_encode(["error" => "Error adding task"]);
}
