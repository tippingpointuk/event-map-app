<template>
  <EventMap :events=events></EventMap>
</template>

<script>
import EventMap from './components/EventMap.vue'

export default {
  name: 'App',
  data() {
    return {
      source: 'https://an-events.tippingpointuk.workers.dev',
      events: []
    }
  },
  components: {
    EventMap
  },
  created() {
    this.getEvents()
  },
  methods: {
    getEvents() {
      fetch(this.source, {method: "GET"})
        .then(res => res.json())
        .then(data => {
          console.log(data)
          this.events = data
        })
    }
  }
}
</script>

<style>
</style>
