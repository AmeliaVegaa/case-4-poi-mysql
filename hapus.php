<?php
include "koneksi.php";

// Marker ID received from the client-side
$id = $_POST['id'];

if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

$stmt = $con->prepare("DELETE FROM data WHERE id = ?");
$stmt->bind_param("i", $id);

// Execute the DELETE statement
if ($stmt->execute()) {
    echo "Record deleted successfully";
} else {
    echo "Error deleting record: " . $con->error;
}

// Close statement and connection
$stmt->close();
$con->close();
?>
