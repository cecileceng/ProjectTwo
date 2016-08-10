	var map;
	var userLocation;

	function initMap() {
	    //constructor creates new map. only center and zoom are required.
	    map = new google.maps.Map(document.getElementById('map'), {
	        center: { lat: 30.3372549, lng: -97.7351244 },
	        zoom: 11 //max level 21
	    });
	    //var tribeca = { lat: 40.719526, lng: -74.0089934 }; //you can create variables to store locations.
	    var austin = { lat: 30.3547000, lng: -97.7341244 }
	    var marker = new google.maps.Marker({
	        position: austin, //was tribeca variable. could also be coordinates?
	        map: map, //targets var map, which tells program which map to add marker to.
	        title: 'First Marker' //appears if you hover over marker
	    });
	    var infoWindow = new google.maps.InfoWindow({
	        //info window does not open automatically. requires event listener.
	        content: "A WILD INFOWINDOW APPEARS!"
	    });
	    marker.addListener('click', function() {
	        //event listener
	        infoWindow.open(map, marker);
	    });
	} //end initMap

	if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(function(position) {
	        var userLocation = {
	            lat: position.coords.latitude,
	            lng: position.coords.longitude
	        };
	        console.log(userLocation);
	        //infoWindow.close();
	        map.setCenter(userLocation);
	    }, function() {
	        handleLocationError(true, infoWindow, map.getCenter());
	    });
	} else {
	    // Browser doesn't support Geolocation
	    handleLocationError(false, infoWindow, map.getCenter());
	}

	module.exports(userLocation);
