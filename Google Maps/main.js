var newAdd; 
$('#go').click(function()
{
	newAdd = $('#goAdd').val();
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({'address' : newAdd }, function( results, status)
	{
		initMap(results[0].geometry.location)
	});
});
var map;
function initMap(loc2)
{
	var latLong = {lat: 39.7708592, lng: -86.1749774},
	latLong2 = loc2;
	map = new google.maps.Map(document.getElementById('map'), 
	{
		center: latLong,
		zoom: 12
	});
	var directionsService = new google.maps.DirectionsService,
	directionsDisplay = new google.maps.DirectionsRenderer(
	{
		map: map
	}
);
directionsService.route(
{
	origin: latLong,
	destination: latLong2,
	travelMode: google.maps.TravelMode.DRIVING
	}, function(response, status)
	{
		if (status == google.maps.DirectionsStatus.OK)
		{
			directionsDisplay.setDirections(response);
		} else 
		{
			window.alert('Directions request failed due to ' + status);
		}
	});
	var marker = new google.maps.Marker(
	{
	position: latLong,
	map: map, 
	title: 'IUPUI Natatorium'
	});
}