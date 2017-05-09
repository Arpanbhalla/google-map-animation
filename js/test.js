var geocoder;
var mapCentre;
var map;
var markers = [];

function initialize() {

// Centre the map to Australia
  var country = "Australia";
  var myOptions = {
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map"),myOptions);
  // new google.maps.Geocoder(); => Converts location to lat /long
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': country }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
      } else {
          alert("Could not find location: " + location);
      }
  });

  // Read from data input type json
  $.getJSON("http://localhost:3000/data/stores_test.json", function(stores) {

		// loop all the markers
		$.each(stores, function(i,store_detail){

			// add marker to map
			console.log(store_detail);
      lat = store_detail.Latitude;
      lng = store_detail.Longitude;
      var latLng = new google.maps.LatLng(lat,lng);
      marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: latLng
      });
      addMarkerWithTimeout(marker, i * 200)
    });
	});

  function addMarkerWithTimeout(marker, timeout) {
    window.setTimeout(function() {
      markers.push(marker);
    }, timeout);
  }
}