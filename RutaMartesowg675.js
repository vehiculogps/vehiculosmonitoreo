module.exports  = {
    day: new Date(), // Añadiendo la fecha actual
    vehicle_id: "abc123",
    type: "FeatureCollection",
    "type":"FeatureCollection",
    "features":[
        {
            "type":"Feature",
            "geometry":{
                "type":"LineString",
                    "coordinates":[[-72.64862,7.36846],[-72.64861,7.36846],[-72.64862,7.36846],[-72.64867,7.36867],[-72.6487,7.36925]]},"properties":{
                        "styleUrl":"#sB8405Esw10",
                        "stroke-opacity":1,
                        "stroke":"#B8405E",
                        "stroke-width":10}
                    },
                    {
                        "type":"Feature",
                        "geometry":{
                            "type":"Point",
                            "coordinates":[-72.64862,7.36846]
                        },
                        "properties":{
                            "name":"Inicio",
                            "styleUrl":"#mc5cb85cmslarge",
                            "icon":"https://api.tiles.mapbox.com/v3/marker/pin-l+5cb85c.png","marker-color":"#5cb85c",
                            "marker-size":"large"}
                        },
                        {
                            "type":"Feature",
                            "geometry":{
                                "type":"Point",
                                "coordinates":[-72.64849,7.37189]
                            },
                            "properties":{
                                "name":"Fin",
                                "styleUrl":"#mc000000mslarge",
                                "icon":"https://api.tiles.mapbox.com/v3/marker/pin-l+000000.png","marker-color":"#000000","marker-size":"large"
                            }
                        }
                    ]
                }