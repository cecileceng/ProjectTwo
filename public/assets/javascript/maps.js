 	var map;
    //var userLocation;

    function initMap() {
        //constructor creates new map. only center and zoom are required.
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 30.267642, lng: -97.777574 },
            zoom: 11 //max level 21
        });
        /*
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
        });*/


//fetch master marker div    
var infoInfoInfo = $('#masterMarkerDiv');
//total number of markers
var totalNumberOfMarkers = infoInfoInfo[0].children.length;
console.log("Total number of markers returned from database = " + totalNumberOfMarkers);
//all children of master div
var markerInfoDivs = infoInfoInfo[0].children;

var infowindowsArray =[];

//for total number of markers
for(i=0; i<totalNumberOfMarkers; i++){
	//log current marker
		//console.log(markerInfoDivs[i]);
	//set as currentMarker
	var theCurrentMarker = markerInfoDivs[i];
	//find h4 children of current marker
		//console.log(theCurrentMarker.children);
	//log number of h4's within current marker (should be 5, title, name, lat, lng, and createdAt)
		//console.log(theCurrentMarker.children.length);
	//targets the h4 with inner content of creator name
	var theCurrentCreator = theCurrentMarker.children[0];
	//extract string value of the creator name
	var theCurrentCreatorText = $(theCurrentCreator).text();
		//console.log(theCurrentCreatorText);

	var theCurrentLat = theCurrentMarker.children[1];
	//extract string value of the lat
	var theCurrentLatText = parseFloat($(theCurrentLat).text());
		//console.log(theCurrentLatText);

	var theCurrentLng = theCurrentMarker.children[2];
	//extract string value of the lng
	var theCurrentLngText = parseFloat($(theCurrentLng).text());
		//console.log(theCurrentLngText);

	var theCurrentTitle = theCurrentMarker.children[3];
	//extract string value of the title
	var theCurrentTitleText = $(theCurrentTitle).text();
		//console.log(theCurrentTitleText);

	var theCurrentTime = theCurrentMarker.children[4];
	//extract string value of the creator name
	var theCurrentTimeText = $(theCurrentTime).text();
		//console.log(theCurrentTimeText);
		//format object for marker creation
	var locationObjectForMarker = { lat: theCurrentLatText, lng: theCurrentLngText };

	//new instance of google marker
	var aWildMarker = new google.maps.Marker({
            position: locationObjectForMarker, 
            map: map, //targets var map, which tells program which map to add marker to.
            title: theCurrentTitleText, //appears if you hover over marker
            //infoWindow: currentInfoWindow,
            infoWindowIndex: i
        });

        var innerContent = "<h5> Marker Created By: " + theCurrentCreatorText + "</h5><br><h5>Message: " + theCurrentTitleText + "</h5><br><h5>Created At: " + theCurrentTimeText + "</h5>";

        var currentInfoWindow = new google.maps.InfoWindow({
            //info window does not open automatically. requires event listener.
            content: innerContent
        });

    google.maps.event.addListener(aWildMarker, 'click', function(event) {
        map.panTo(event.latLng);
        map.setZoom(14);
        //infowindows[this.infoWindowIndex].open(map, this);
        infowindowsArray[this.infoWindowIndex].open(map, this);
    });
    infowindowsArray.push(currentInfoWindow);
       
       /*   PREVIOUS VERSION OF ADD LISTENER
        aWildMarker.addListener('click', function() {
            //event listener
            currentInfoWindow.open(map, aWildMarker);
        });*/

};//end loop for each marker

    } //end initMap


