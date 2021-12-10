<template>
  <div ref=map style="height: 90vh;">

  </div>
</template>

<script>
  import L from 'leaflet';
  import { MarkerClusterGroup } from 'leaflet.markercluster'
  import "leaflet/dist/leaflet.css";
  import "leaflet.markercluster/dist/MarkerCluster.css"
  import "leaflet.markercluster/dist/MarkerCluster.Default.css"
  import markerShadow from 'leaflet/dist/images/marker-shadow.png';
  import markerIcon from 'leaflet/dist/images/marker-icon.png';

  export default {
    name: "EventMap",
    props: {
      events: {
        type: Array,
        required: true
      }
    },
    data(){
      return {
        map: null,
        icon: new L.icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: markerIcon,
          shadowUrl: markerShadow
        })
      }
    },
    mounted() {
      this.buildMap()
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
      // populateEvents() {
      //   this.events.forEach((e) => {
      //     this.populatedEvents += { ...e, ...{
      //       start: this.datify(e.start_date),
      //       end: this.datify(e.end_date),
      //       id: e.browser_url.replace("https://actionnetwork.org/events/",""),
      //       url: e.browser_url,
      //       online: (this.location.venue == "" || this.location.venue.toLowerCase().includes("online")),
      //       latlng: L.latLng(this.location.latitude,this.location.longitude)
      //     }};
      //   })
      // },
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
      buildMap() {
        console.log("Building map")
        this.map = L.map(this.$refs.map,{
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
            "maxZoom": 18,
            "minZoom": 0,
            "noWrap": false,
            "opacity": 1,
            "subdomains": "abc",
            "tms": false
          }
        ).addTo(this.map);
        console.log("Building marker cluster ")
        let markerCluster = new MarkerClusterGroup({
          maxClusterRadius: 25,
        }).addTo(this.map)
        console.log("Adding points")
        for (var i in this.events){
          let e = this.getProps(this.events[i])
          console.log(e)
          let newMarker = L.marker(e.latlng, {icon: this.icon})
          newMarker.addTo(markerCluster)
        }
        // markerCluster.addTo(this.map)
      }
    },
  }
  // Pass events to map
  // Create lat lon for each event
  // Bind events
</script>
