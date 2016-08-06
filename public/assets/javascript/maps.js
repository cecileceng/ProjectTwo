	var map;

	function initMap() {
	    //constructor creates new map. only center and zoom are required.
	    map = new google.maps.Map(document.getElementById('map'), {
	        center: { lat: 40.7413549, lng: -73.9980244 },
	        zoom: 13 //max level 21
	    });
	    var tribeca = { lat: 40.719526, lng: -74.0089934 }; //you can create variables to store locations.
	    var marker = new google.maps.Marker({
	        position: tribeca, //could also be coordinates?
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
