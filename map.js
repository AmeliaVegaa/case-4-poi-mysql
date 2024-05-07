// JavaScript code to initialize the map
var map = L.map('map').setView([-8.2431531, 112.7007252], 9);

// Add OpenStreetMap tile layer to the map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Variable to store reference to the popup
var popup;

function onMapClick(e) {
    // HTML form for POI information
    var formContent = '<form method="POST" id="form" class="custom-popup-content">' +
        '<label for="nama">Nama Sekolah:</label><br>' +
        '<input type="text" id="nama" name="nama" required><br>' +
        '<label for="id">ID Sekolah:</label><br>' +
        '<input type="text" id="id" name="id" required><br>' +
        '<label for="kepala_sekolah">Nama Kepala Sekolah:</label><br>' +
        '<input type="text" id="kepala_sekolah" name="kepala_sekolah" required><br>' +
        '<label for="jumlah_guru">Jumlah Guru:</label><br>' +
        '<input type="number" id="jumlah_guru" name="jumlah_guru" required><br>' +
        '<label for="jumlah_murid">Jumlah Murid:</label><br>' +
        '<input type="number" id="jumlah_murid" name="jumlah_murid" required><br>' +
        '<label for="keterangan">Keterangan:</label><br>' +
        '<textarea id="keterangan" name="keterangan" required></textarea><br>' +
        '<label for="atitude">Latitude:</label><br>' +
        '<input type="text" id="latitude" name="latitude" required><br>' +
        '<label for="longitude">Longitude:</label><br>' +
        '<input type="text" id="longitude" name="longitude" required><br><br>' +
        '<input type="submit" value="Simpan">' +
        '</form>';

    // Create a new popup and set its content
    var popup = L.popup().setLatLng(e.latlng).setContent(formContent).openOn(map);

    // Handle form submission
    document.getElementById("form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Get form data
        var formData = new FormData(this);

        // Send POI information to the server to save to the database using AJAX
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "save.php", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    // If data is saved successfully
                    var poiData = JSON.parse(xhr.responseText);
                    var marker = L.marker([poiData.latitude, poiData.longitude]).addTo(map);
                    marker.bindPopup("Nama Sekolah: " + poiData.nama + "<br>ID Sekolah: " + poiData.id + "<br>Kepala Sekolah: " + poiData.kepala_sekolah + "<br>Jumlah Guru: " + poiData.jumlah_guru + "<br>Jumlah Murid: " + poiData.jumlah_murid + "<br>Keterangan: " + poiData.keterangan).openPopup();

                    // Close the popup form after adding the marker
                    map.closePopup(popup);
                } else {
                    // If there is an error while saving data
                    console.error('Failed to save data.');
                }
            }
        };
        xhr.send(formData);
    });
}

// Add event listener for map clicks
map.on('click', onMapClick);        