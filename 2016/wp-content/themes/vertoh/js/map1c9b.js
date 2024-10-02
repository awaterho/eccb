var map;
var defaultLat = 51.522502;
var defaultLng = -0.120783;

jQuery(document).ready(function ($) {
    if (jQuery('#gmap').length) {

        bounds = new google.maps.LatLngBounds();

        map = new GMaps({
            div: '#gmap',
            lat: defaultLat,
            lng: defaultLng,
            zoom: poi_gmap_zoom,
            disableDefaultUI: true,
            scrollwheel: false,
            draggable: Modernizr.touch === true ? false : true,
            click: function (e) {
                this.setOptions({scrollwheel: true});
            }
        });

        if (pois && pois.length > 0) {
            for (i = 0; i < pois.length; i++) {
                map.addMarker({
                    lat: pois[i].poi_latitude,
                    lng: pois[i].poi_longitude,
                    title: pois[i].poi_address,
                    infoWindow: {
                        content: pois[i].poi_address
                    },
                    icon: poi_marker
                });
                bounds.extend(new google.maps.LatLng(pois[i].poi_latitude, pois[i].poi_longitude));
            }
        }

        if(pois && pois.length > 0){
            if(pois.length > 1){
                map.fitBounds(bounds);
                map.panToBounds(bounds);
            } else {
                map.setCenter(pois[0].poi_latitude, pois[0].poi_longitude);
                map.setZoom(poi_gmap_zoom);
            }
        }
    }

    // Center the map based on clicked Marker
    jQuery('.carousel-cities .city a[data-lat]').on('click', function (e) {
        e.preventDefault();

        map.setCenter(
                jQuery(this).attr('data-lat'),
                jQuery(this).attr('data-lng')
                );
    });

    jQuery('.carousel').carousel({
        pause: true,
        interval: false
    });

    jQuery('.carousel-control').on('click', function (e) {
        e.preventDefault();
    });
});

function slideCarousels(items, action) {
    var len = items.length;
    var id = null;

    for (var i = 0; i < len; i++) {
        id = items[i];
        jQuery('.' + id).carousel({slide: action});
    }
}
