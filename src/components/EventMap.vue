<template>
  <div id="map-pane"  ref=map>
  </div>
  <div class="overlay">
    <EventBox v-for="event in visibleEvents" :key="event.id" :event="event"></EventBox>
  </div>
</template>

<script>
  // Leaflet and plugins
  import L from 'leaflet';
  import { MarkerClusterGroup } from 'leaflet.markercluster'
  // Essential map styling
  import "leaflet/dist/leaflet.css";
  import "leaflet.markercluster/dist/MarkerCluster.css"
  import "leaflet.markercluster/dist/MarkerCluster.Default.css"
  // Marker assets
  import markerShadow from 'leaflet/dist/images/marker-shadow.png';
  import markerIcon from 'leaflet/dist/images/marker-icon.png';
  // Event Box
  import EventBox from './EventBox.vue';


  export default {
    name: "EventMap",
    props: {
      source: {
        type: String,
        required: true
      }
    },
    components: {
      EventBox
    },
    data(){
      return {
        map: {},
        markers: [],
        events: [],
        icon: new L.icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: markerIcon,
          shadowUrl: markerShadow
        })
      }
    },
    mounted() {
      fetch(this.source, {method: "GET"})
        .then(res => res.json())
        .then(data => {
          console.log(`Fetched ${data.length} events.`)
          console.log(data)
          this.events = data.map((e) => {
            return {
              ...e,
              ...this.getProps(e)
            }
          })
          this.buildMap()
        })
    },
    computed: {
      visibleEvents () {
        return this.events.filter((e) => e.isVisible)
      }
    },
    methods: {
      getProps(e) {
        return {
            start: this.datify(e.start_date),
            end: this.datify(e.end_date),
            id: e.browser_url.replace("https://actionnetwork.org/events/",""),
            url: e.browser_url,
            online: (e.location.venue == "" || e.location.venue.toLowerCase().includes("online")),
            latlng: L.latLng(e.location.location.latitude,e.location.location.longitude)
          }
      },
      datify(dateString) {
        if (!dateString){
          return null
        }else{
          var date = new Date(dateString);
          return {
            time: new Intl.DateTimeFormat('en-GB', { hour: 'numeric', minute: 'numeric',timeZone: "UTC" }).format(date),
            date: new Intl.DateTimeFormat('en-GB', { weekday: 'short', month: 'short', day: 'numeric',timeZone: "UTC"  }).format(date),
            raw: date
          }
        }
      },
      updateMarkers(bounds) {
        console.log("updating markers")
        // let latLngBounds = new L.latLng(bounds)
        // console.log(latLngBounds)
        this.events.forEach((part,i,events) => {
          events[i]['isVisible'] = bounds.contains(events[i].latlng);
        })
        console.log(this.events)
      },
      buildMap() {
        console.log("Building map")
        let map = L.map(this.$refs.map,{
          center: [10,0],
          crs: L.CRS.EPSG3857,
          zoom: 2,
          zoomControl: true,
          preferCanvas: false,
        });
        L.tileLayer(
          "https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg",{
            "attribution": "Map tiles by \u003ca href=\"http://stamen.com\"\u003eStamen Design\u003c/a\u003e, under \u003ca href=\"http://creativecommons.org/licenses/by/3.0\"\u003eCC BY 3.0\u003c/a\u003e. Data by \u0026copy; \u003ca href=\"http://openstreetmap.org\"\u003eOpenStreetMap\u003c/a\u003e, under \u003ca href=\"http://creativecommons.org/licenses/by-sa/3.0\"\u003eCC BY SA\u003c/a\u003e.",
            "detectRetina": false,
            "maxNativeZoom": 18,
            // "maxZoom": 18,
            "minZoom": 0,
            "noWrap": false,
            "opacity": 1,
            "subdomains": "abc",
            "tms": false
          }
        ).addTo(map);
        console.log("Building marker cluster.")
        let markerCluster = new MarkerClusterGroup({
          maxClusterRadius: 25,
        }).addTo(map)
        console.log("Adding points")
        for (var i in this.events){
          let e = this.events[i]
          let newMarker = L.marker(e.latlng, {icon: this.icon})
          newMarker.eventData = e;
          this.markers.push(newMarker);
        }
        markerCluster.addLayers(this.markers);
        // Define map events
        let updateFunction = () => {
          let bounds = map.getBounds();
          this.updateMarkers(bounds);
        }
        updateFunction()
        map.on("zoom", updateFunction);
        map.on("moveend", updateFunction);
        map.on("resize", updateFunction);
      }
    },
  }
</script>

<style lang=scss scoped>
  div.overlay {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    z-index: 1000;
    overflow: scroll;
    max-width: calc(max(30vw,200px));
  }
  #map-pane {
    height: 100vh;
  }
</style>
