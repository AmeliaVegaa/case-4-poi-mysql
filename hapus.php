<?php
include "koneksi.php";

if(isset($_POST['lat']) && isset($_POST['lng'])) {
    $lat = $_POST['lat'];
    $lng = $_POST['lng'];

    $sql = "DELETE FROM poi WHERE latitude = ? AND longitude = ?";

    $stmt = $con->prepare($sql);

    $stmt->bind_param("dd", $lat, $lng);

    if ($stmt->execute()) {
        $response = array('status' => 'success', 'message' => 'Data berhasil dihapus');
    } else {
        $response = array('status' => 'error', 'message' => 'Gagal menghapus data');
    }

    $stmt->close();
} else {
    $response = array('status' => 'error', 'message' => 'Latitude dan longitude tidak ditemukan');
}

echo json_encode($response);

mysqli_close($con);
?>
