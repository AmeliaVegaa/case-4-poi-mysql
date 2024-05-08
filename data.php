<?php
// Include the database connection file
include "koneksi.php";

// Query to retrieve data from the database
$sql = "SELECT * FROM data";
$result = mysqli_query($con, $sql);

// Check if the query was successful
if (mysqli_num_rows($result) > 0) {
    // Initialize an array to store the data
    $data = array();

    // Fetch each row of data and add it to the array
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }

    // Convert the array to JSON format and print it
    echo json_encode($data);
} else {
    // If no data is found, return a message
    echo json_encode(array('message' => 'Tidak ada data yang ditemukan.'));
}

// Close the database connection
mysqli_close($con);
