var geocoder;
var mapCentre;
var map;
var coordinates = [];
// var marker_icon = 'http://maps.google.com/mapfiles/kml/shapes/gas_stations.png';

function initialize() {

  // Centre the map to Australia
        var country = "Australia";
        var myOptions = {
          zoom: 4,
          mapTypeId: google.maps.MapTypeId.HYBRID
        };
        var map = new google.maps.Map(document.getElementById("map"), myOptions);
        // new google.maps.Geocoder(); => Converts location to lat /long
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': country }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
          } else {
            alert("Could not find location: " + location);
          }
        });

  // Read from data input type json
  $.getJSON("http://localhost:3000/data/stores.json", function (stores) {

    // loop all the markers
    $.each(stores, function (i, store_detail) {

      // add marker to map
      console.log(store_detail);
      lat = store_detail.Latitude;
      lng = store_detail.Longitude;
      var latLng = new google.maps.LatLng(lat, lng);
      coordinates.push(latLng);
    });
  });
  var i = 0;
  var interval = setInterval(function () {
    var marker = new google.maps.Marker({
        map: map,
        draggable: false,
        // icon:  marker_icon,
        animation: google.maps.Animation.DROP,
        position: coordinates[i]
    });
    i++;
    if (i >= coordinates.length) clearInterval(interval);
  }, 10);
}