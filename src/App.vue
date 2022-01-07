<template>
  <EventMap :source=source></EventMap>
</template>

<script>
import EventMap from './components/EventMap.vue'

export default {
  name: 'App',
  data() {
    return {
      source: 'https://an-events.tippingpointuk.workers.dev',
    }
  },
  components: {
    EventMap
  }
}
</script>

<style>
  body {
    padding: 0;
    margin: 0;
  }
</style>
