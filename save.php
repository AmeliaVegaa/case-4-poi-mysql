<?php
// Include the database connection file
include "koneksi.php";

// Get the data sent from the HTML page
$nama_sekolah = $_POST['nama'];
$id_sekolah = $_POST['id'];
$nama_kepsek = $_POST['kepala_sekolah'];
$jumlah_guru = $_POST['jumlah_guru'];
$jumlah_murid = $_POST['jumlah_murid'];
$keterangan = $_POST['keterangan'];
$latitude = $_POST['latitude'];
$longitude = $_POST['longitude'];

// SQL query to insert data into the database
$sql = "INSERT INTO data (nama, id, kepala_sekolah, jumlah_guru, jumlah_murid, keterangan, latitude, longitude) VALUES ('$nama_sekolah', '$id_sekolah', '$nama_kepsek', '$jumlah_guru', '$jumlah_murid', '$keterangan', '$latitude', '$longitude')";

// Execute the query
if (mysqli_query($con, $sql)) {
    echo "Data inserted successfully.";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($con);
}

// Close the database connection
mysqli_close($con);
?>
