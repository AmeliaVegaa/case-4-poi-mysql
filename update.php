<?php
// Include the database connection file
include "koneksi.php";

// Check connection
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

// Check if form data is received
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $id = $_POST['id'];
    $nama = $_POST['nama'];
    $kepala_sekolah = $_POST['kepala_sekolah'];
    $jumlah_guru = $_POST['jumlah_guru'];
    $jumlah_murid = $_POST['jumlah_murid'];
    $keterangan = $_POST['keterangan'];
    $latitude = $_POST['latitude'];
    $longitude = $_POST['longitude'];

    // Prepare SQL statement to update the record
    $sql = "UPDATE data SET 
            nama = '$nama', 
            kepala_sekolah = '$kepala_sekolah', 
            jumlah_guru = '$jumlah_guru', 
            jumlah_murid = '$jumlah_murid', 
            keterangan = '$keterangan', 
            latitude = '$latitude', 
            longitude = '$longitude' 
            WHERE id = $id";

    // Execute the SQL statement
    if ($con->query($sql) === TRUE) {
        // Return success message
        echo "Record updated successfully";
    } else {
        // Return error message
        echo "Error updating record: " . $con->error;
    }
}

// Close database connection
$con->close();
?>
