<?php
include "koneksi.php";

// Query untuk mengambil semua data dari database
$sql = "SELECT * FROM data";
$result = mysqli_query($con, $sql);

// Mengecek apakah query berhasil dieksekusi
if (mysqli_num_rows($result) > 0) {
    // Menginisialisasi array kosong untuk menyimpan data
    $data = array();

    // Mengambil setiap baris data dan menyimpannya ke dalam array
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }

    // Mengonversi array data menjadi format JSON dan mencetaknya
    echo json_encode($data);
} else {
    // Jika tidak ada data yang ditemukan
    echo json_encode(array('message' => 'Tidak ada data yang ditemukan.'));
}

// Menutup koneksi database
mysqli_close($con);
?>
