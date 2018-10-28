var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([-74.0060,40.7128]),
      zoom: 10
    })
  });
  
function add_map_point(lat, lng) {
    var vectorLayer = new ol.layer.Vector({
        source:new ol.source.Vector({
            features: [new ol.Feature({
           geometry: new ol.geom.Point(ol.proj.transform([parseFloat(lng), parseFloat(lat)], 'EPSG:4326', 'EPSG:3857')),
            })]
        }),
        style: new ol.style.Style({
            image: new ol.style.Icon({
    anchor: [0.5, 0.5],
    anchorXUnits: "fraction",
    anchorYUnits: "fraction",
src: "https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg"
            })
        })
    });
    map.addLayer(vectorLayer);
}

function get_data_point(){
    fetch('recyclingbins.json')
    .then(function(response) { return response.json(); })
    .then(function(json) {
        data = json.data;
        for (let datum of data) {
            lat = datum[12];
            lng = datum[13];
            add_map_point(lat,lng);
        }        
    });
}

get_data_point();