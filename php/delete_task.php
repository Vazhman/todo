<?php
require 'pdo_connect.php';

$pdo = pdo_connect();

$input = json_decode(file_get_contents('php://input'), true);
$task = $input['task'];

$sql = "DELETE FROM tasks WHERE task = :task LIMIT 1";
$stmt = $pdo->prepare($sql);

if ($stmt->execute(['task' => $task])) {
    echo json_encode(["message" => "Task deleted successfully"]);
} else {
    echo json_encode(["error" => "Error deleting task"]);
}
?>
