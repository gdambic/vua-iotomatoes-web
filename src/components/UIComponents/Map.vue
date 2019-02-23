<template>
  <div class="card card-map">
    <div class="map" :style="{ height: `${height}px` }">
      <div id="map" :ref="mapId"></div>
    </div>
  </div>
</template>
<script>
import { getRandomInt } from "utils"

export default {
  props: {
    latitude: Number,
    longitude: Number,
    title: {
      type: String,
      default: ""
    },
    height: {
      type: Number | String,
      default: "100%"
    }
  },
  data(){
    return {
      mapId: "no-id"
    }
  },
  computed: {
    mapElement(){
      return this.$refs[this.mapId];
    }
  },
  methods: {
    updateMapId() {
      const currentTime = new Date().getTime().toString();
      const randomInt = getRandomInt(0, currentTime);
      this.mapId = `map_${randomInt}`;
    },
    initMap(latitude, longitude) {
      const mapsLatitudeAndLongitude = new window.google.maps.LatLng(
        latitude || this.latitude,
        longitude || this.longitude
      );

      const mapOptions = {
        zoom: 13,
        center: mapsLatitudeAndLongitude,
        scrollwheel: false, // we disable de scroll over the map, it is a really annoing when you scroll through page
        styles: [
          {
            featureType: "water",
            stylers: [
              { saturation: 43 },
              { lightness: -11 },
              { hue: "#0088ff" }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              { hue: "#ff0000" },
              { saturation: -100 },
              { lightness: 99 }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#808080" }, { lightness: 54 }]
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{ color: "#ece2d9" }]
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [{ color: "#ccdca1" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#767676" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#ffffff" }]
          },
          { featureType: "poi", stylers: [{ visibility: "off" }] },
          {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
          },
          { featureType: "poi.park", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.sports_complex",
            stylers: [{ visibility: "on" }]
          },
          { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.business",
            stylers: [{ visibility: "simplified" }]
          }
        ]
      };

      const map = new window.google.maps.Map(
        this.mapElement,
        mapOptions
      );

      const marker = new window.google.maps.Marker({
        position: mapsLatitudeAndLongitude,
        title: this.title
      });

      // To add the marker to the map, call setMap();
      marker.setMap(map);
    }
  },
  watch: {
    latitude: {
      handler(value){
        this.initMap(value);
      }
    },
    longitude: {
      handler(value){
        this.initMap(undefined, value);
      }
    }
  },
  beforeMount(){
    this.updateMapId();
  },
  mounted() {
    this.initMap();
  }
};
</script>

<style>
.fixed-height {
  height: 220px !important;
}
</style>
