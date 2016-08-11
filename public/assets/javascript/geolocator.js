if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        console.log(userLocation);
        $('#latBox').val(userLocation.lat);
        $('#lngBox').val(userLocation.lng);
        //infoWindow.close();
        //map.setCenter(userLocation);
    }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
    });
} else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
}
