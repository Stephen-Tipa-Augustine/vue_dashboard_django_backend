
<template>
  <div class="wrapper">

    <SideNavBar />

		<div class="main">

      <TopNavBar />

			<main class="content">
				<div class="container-fluid p-0">

					<h1 class="h3 mb-3"><strong>Analytics</strong> Maps</h1>

          <div class="row" style="margin-top: 10px;">
            <div class="col-12">
              <div class="content" id="map" style="height: 650px;"></div>
              <div id="popup" class="ol-popup">
                 <a href="#" id="popup-closer" class="ol-popup-closer"></a>
                 <div id="popup-content"></div>
             </div>
            </div>
          </div>

				</div>
			</main>

			<Footer />
		</div>
	</div>
</template>

<script>
import TopNavBar from "../components/TopNavBar.vue";
import SideNavBar from "../components/SideNavBar.vue";
import Footer from "../components/Footer.vue";
export default {
  components: {TopNavBar, SideNavBar, Footer},
  mounted() {
    this.createVectorMap()
  },
  methods: {
    createVectorMap() {
      const worldstreetsStyle = "https://cdn.thinkgeo.com/worldstreets-styles/3.0.0/light.json";
      const worldstreets = new ol.mapsuite.VectorTileLayer(worldstreetsStyle,
          {
            apiKey: 'hiUOMZvo0P90A3RPgfY3Bum0CRIQVxbd9BvNR3xbCuk~'      // please go to https://cloud.thinkgeo.com to create
          });
      let map =  new ol.Map({
          layers: [worldstreets],
          target: 'map',
          view: new ol.View({
              center: ol.proj.fromLonLat([32.6122203, 0.351673]),
              zoom: 9,
              maxZoom: 25,
          }),
          renderer: 'webgl',

      });

      const markerPoints = [
        {long: 32.47667, lat: 1.31191},
          {long: 32.6158, lat: 0.3506},
          {long: 32.5684, lat: 0.3338},
          {long: 32.46507, lat: 0.04777},
          {long: 30.28183, lat: 0.65202},
          {long: 32.6469, lat: 0.3375},
          {long: 32.6198, lat: 0.2407},
          {long: 34.19814, lat: 1.0926},
          {long: 32.6122203, lat: 0.351673}
      ];

      // Adding markers to the map
      markerPoints.forEach((point) => {
        this.addMarker(map, point);
      });

      const container = document.getElementById('popup');
      const content = document.getElementById('popup-content');
      const closer = document.getElementById('popup-closer');

      const overlay = new ol.Overlay({
           element: container,
           autoPan: true,
           autoPanAnimation: {
               duration: 250
           }
       });
       map.addOverlay(overlay);

       closer.onclick = function() {
           overlay.setPosition(undefined);
           closer.blur();
           return false;
       };

       map.on('pointermove', function (event) {
           if (map.hasFeatureAtPixel(event.pixel) === true) {
              const coordinate = event.coordinate;
              content.style.backgroundColor = "#a39e92"
              content.style.color = "#fff"
              content.style.padding = "7px"
              content.innerHTML = '<strong><b>Incident point!</b></strong></strong><br />Road Name<br />Date: 05/07/2022<br />Time: 12:07pm';
               overlay.setPosition(coordinate);
           } else {
               overlay.setPosition(undefined);
               closer.blur();
           }
       });
    },

    addMarker(map, coord) {
      const marker = new ol.layer.Vector({
        source: new ol.source.Vector(
  {
             features: [
                 new ol.Feature({
                     geometry: new ol.geom.Point(ol.proj.fromLonLat([coord.long, coord.lat]))
                 })
             ]
         }),
        style: new ol.style.Style({
          image: new ol.style.Icon({
            anchor: [0.5, 1],
            src: '/img/markers/car-crash1.png',
          }),
        })
      });
      map.addLayer(marker);
    },
  },
}


</script>
