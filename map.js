// JavaScript code to initialize the map
var map = L.map('map').setView([-8.2431531, 112.7007252], 9);

// Add OpenStreetMap tile layer to the map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Function to create markers for each data point
function createMarkers(data) {
    data.forEach(place => {
        const marker = L.marker([place.latitude, place.longitude], { draggable: true }).addTo(map);
        const popupContent = `
            <b>${place.nama}</b><br>
            ID Sekolah: ${place.id}<br>
            Kepala Sekolah: ${place.kepala_sekolah}<br>
            Jumlah Guru: ${place.jumlah_guru}<br>
            Jumlah Murid: ${place.jumlah_murid}<br>
            Keterangan: ${place.keterangan}
        `;
        marker.bindPopup(popupContent);
        marker.on('dragend', function(event) {
            const marker = event.target;
            const position = marker.getLatLng();
            const lat = position.lat;
            const lng = position.lng;

            // Show update popup
            showUpdatePopup(place, lat, lng);
        });
    });
}

// Function to handle map clicks
function handleMapClick(e) {
    // If there is an active updatePopup, close it
    if (updatePopup) {
        map.closePopup(updatePopup);
        updatePopup = null;
        return; // Prevent further execution
    }

    // HTML form for POI information
    var formContent = '<form method="POST" id="form" class="custom-popup-content">' +
        '<label for="nama">Nama Sekolah:</label><br>' +
        '<input type="text" id="nama" name="nama"  required><br>' +
        '<label for="id">ID Sekolah:</label><br>' +
        '<input type="text" id="id" name="id" pattern="[0-9]*" required><br>' +
        '<label for="kepala_sekolah">Nama Kepala Sekolah:</label><br>' +
        '<input type="text" id="kepala_sekolah" name="kepala_sekolah" required><br>' +
        '<label for="jumlah_guru">Jumlah Guru:</label><br>' +
        '<input type="text" id="jumlah_guru" name="jumlah_guru" required><br>' +
        '<label for="jumlah_murid">Jumlah Murid:</label><br>' +
        '<input type="text" id="jumlah_murid" name="jumlah_murid" required><br>' +
        '<label for="keterangan">Keterangan:</label><br>' +
        '<textarea id="keterangan" name="keterangan" required></textarea><br>' +
        '<label for="latitude">Latitude:</label><br>' +
        '<input type="text" id="latitude" name="latitude" required value="' + e.latlng.lat + '"><br>' +
        '<label for="longitude">Longitude:</label><br>' +
        '<input type="text" id="longitude" name="longitude" required value="' + e.latlng.lng + '"><br><br>' +
        '<input type="submit" value="Simpan">' +
        '</form>';

    // Create a new marker and set its content
    var marker = L.marker(e.latlng).addTo(map);
    marker.bindPopup(formContent).openPopup();

    // Handle form submission
    document.getElementById("form").addEventListener("submit", function(event) {
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
                    // Update marker popup content with form data
                    var popupContent = "Nama Sekolah: " + poiData.nama +
                        "<br>ID Sekolah: " + poiData.id +
                        "<br>Kepala Sekolah: " + poiData.kepala_sekolah +
                        "<br>Jumlah Guru: " + poiData.jumlah_guru +
                        "<br>Jumlah Murid: " + poiData.jumlah_murid +
                        "<br>Keterangan: " + poiData.keterangan;
                    marker.bindPopup(popupContent).openPopup();
                    // Refresh the page after updating marker data
                    window.location.reload();
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
map.on('click', handleMapClick);

// Variable to store the updatePopup
var updatePopup;

// Function to show update popup for an existing marker
function showUpdatePopup(place, lat, lng) {
    const updatePopupContent = `
        <b>${place.nama}</b><br>
        <form id="updateForm">
            <label type="hidden" for="id">ID Sekolah:</label><br>
            <input type="hidden" id="id" name="id" value="${place.id}" required><br>
            <label for="nama">Nama Sekolah:</label><br>
            <input type="text" id="nama" name="nama" value="${place.nama}" required><br>
            <label for="kepala_sekolah">Nama Kepala Sekolah:</label><br>
            <input type="text" id="kepala_sekolah" name="kepala_sekolah" value="${place.kepala_sekolah}" required><br>
            <label for="jumlah_guru">Jumlah Guru:</label><br>
            <input type="text" id="jumlah_guru" name="jumlah_guru" value="${place.jumlah_guru}" required><br>
            <label for="jumlah_murid">Jumlah Murid:</label><br>
            <input type="text" id="jumlah_murid" name="jumlah_murid" value="${place.jumlah_murid}" required><br>
            <label for="keterangan">Keterangan:</label><br>
            <textarea id="keterangan" name="keterangan" required>${place.keterangan}</textarea><br>
            <input type="hidden" id="latitude" name="latitude" value="${lat}">
            <input type="hidden" id="longitude" name="longitude" value="${lng}">
            <input type="submit" value="Update">
        </form>
    `;

    updatePopup = L.popup()
        .setLatLng([lat, lng])
        .setContent(updatePopupContent)
        .openOn(map);

    // Handle form submission
    document.getElementById("updateForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Get form data
        const formData = new FormData(this);

        // Send data using Fetch API
        fetch('update.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log(data);
            // Close popup after update
            map.closePopup(updatePopup);
            // Refresh the page after updating marker data
            window.location.reload();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    });
}

// Function to fetch data from the server and create markers
function fetchDataAndCreateMarkers() {
    fetch('data.php')
        .then(response => response.json())
        .then(data => {
            createMarkers(data);
        })
        .catch(error => console.error('Ada masalah dengan fetch:', error));
}

// Call the function to fetch data and create markers when the page loads
window.onload = fetchDataAndCreateMarkers;
