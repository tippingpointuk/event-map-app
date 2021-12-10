<template>
  <div class="Chaos-Blog-Item Action" :id="id" :class="{online: online}">
    <div class="top">
      <div class="description">
        <div class="header-line">
          <h3><a target="_parent" :href="url">{{ title }}</a></h3>
          <a target="_parent" :href="url"><span class="Chaos-Button">Join</span></a>
        </div>
        <p><time>{{ start.time }}</time> on {{ start.date }}</p>
        <address>{{location.venue}}, {{ location.locality }}</address>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "EventsBox",
    props: {
      event: {
        type: Object,
        required: true
      }
    },
    data() {
        return this.event
    },
    computed: {
      start() {
        const start = new Date(this.start_date)
        return {
          date: new Intl.DateTimeFormat('en-GB', { hour: 'numeric', minute: 'numeric',timeZone: "UTC" }).format(start),
          time: new Intl.DateTimeFormat('en-GB', { weekday: 'short', month: 'short', day: 'numeric',timeZone: "UTC"  }).format(start),
        }
      },
      end() {
        if (this.end_date){
          return new Date(this.end_date)
        } else {
          return null
        }
      },
      online() {
        if (this.location.venue == "" || this.location.venue.toLowerCase().includes("online")){
          return true
        }else{
          return false
        }
      },
      id() {
        return this.browser_url.replace("https://actionnetwork.org/events/","")
      },
      url() {
        return this.browser_url
      }
    }
  }
</script>
