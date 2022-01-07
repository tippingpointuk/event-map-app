<template>
  <div class="EventBox" :id="id" :class="{online: online}">
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
    }
  }
</script>

<style lang=scss>
  .EventBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: $background-color;
    box-shadow: 0 5px 10px $shadow-color;
    padding: $spacing-unit;
    padding-bottom: $spacing-unit /2;
    margin: $spacing-unit;
    max-width: $content-width-wide;
    width: 90%;

    .social-links{
      display: flex;
      justify-content: center;
      gap: $spacing-unit;
    }
    .header-line{
      display: flex;
      justify-content: space-between;
      svg{
        width: $base-font-size * 0.75;
        height: $base-font-size * 0.75;
        path{
          stroke: $brand-color;
          fill:  $brand-color;
        }
      }
    }

    .content img, .top img, > a > img {
      margin: $spacing-unit 0 $spacing-unit/2 0;
      box-shadow: none;
    }

    .top {
        display: flex;
        flex-direction: row;
        &.reverse{flex-direction: row-reverse;}
        align-items: stretch;
        width: 100%;
        gap: 0 $spacing-unit;
        .date {
            flex-basis: 60px;
            flex-grow: 0;
            flex-shrink: 0;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-family: $header-font-stack;
            padding-right: $spacing-unit;

            .day-number {
                font-size: $base-font-size * 2;
                border-bottom: 4px solid $accent-color;
                line-height: 1;
            }

            .month {
                font-size: $small-font-size; //$base-font-size * 0.8;
                color: $text-color-light;
            }
        }

        .thumbnail{
          width: 33%;
          padding: $spacing-unit;
          background: $background-color no-repeat center center;
          background-size: cover;
          img {
            box-shadow: none;
          }
        }
        img {
          box-shadow: none;
        }

        .description {

            line-height: 1;
            width: 100%;
            font-size: $small-font-size;

            h3, h4 {
                margin-top: 5px;
            }

            .bottom-line {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                width: 100%;
            }
        }
    }
  }
</style>
