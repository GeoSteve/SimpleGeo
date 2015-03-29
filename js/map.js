// map object
var map = L.map('map',{
	scrollWheelZoom: false,
	zoomControl: false
}).setView([39.605046, -97.935209], 4);

// basemap
L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'hoganmaps.ikkpodh4'
}).addTo(map);

$.getJSON('/data/us_states_simplified_high.geojson',function(data) {
    L.geoJson(data, {
        style: {
            'fillColor': '#505050',
            'weight': 1,
            'opacity': 1,
            'color': 'white',
            'fillOpacity': 0.6
        },
        onEachFeature: function(feature,layer) {
            layer.bindPopup(buildPopUpContent(feature.properties));
        }
    }).addTo(map);
});

function buildPopUpContent(properties) {
    var content = '';
    $.each(properties, function(index, value) {
        content += index + ': ' + value + '<br/>';
    });
    return content;
}

function jsonJoin(input1, input2, joinKey) {
    var joinResult = [],
        joinOptions = {},
        joinUser = {};

    _.forEach(input1, function(currentUser) {
        joinOptions[joinKey] = currentUser.id // Set key from variable by using object literal
        // Find macthing object
        joinUser = _.find(input2, joinOptions);
        // Join common objects
        joinResult.push(_.assign(currentUser, joinUser));
    });

    // Merge in the remaining objects from 2nd array
    joinResult = joinResult.concat(input2);

    // Limit to unique objects
    joinResult = _.uniq(joinResult, joinKey);

    // Reoder the array of objects
    joinResult = _.sortBy(joinResult, joinKey);

    return joinResult;
}

function modifyKey(inputObject, oldKey, newKey) {
    var newObject = {};
    _.each(inputObject, function(value, key) {
        if(key === oldKey) {
            key = newKey
        }
        newObject[key] = value;
    });
    return newObject;
}

// var censusAPI = 'http://api.census.gov/data/2010/sf1?key=730e49d850365e415931ee4f3a309ffea517b92d&get=P0010001&for=state';

