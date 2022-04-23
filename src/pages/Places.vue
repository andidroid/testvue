<template>
  <h1>place {{mode}}</h1>
  <ul id="places">
    <li v-for="place in places" :key="place.id">
      {{ place.id }} {{ place.value }}
      <router-link :to="{name: 'routing.places.detail', params: {id: place.id}}">{{ place.value }}</router-link>
    </li>
  </ul>
</template>


<script>
export default {
    props: {
      mode: {type: String, required: true, default: 'table'}
    },
      data () {
    return {
      places: this.$store.getters.places
    }
  },
  computed: {
    mode() {
      return this.mode
    }
  },
    methods: {
        fetchPlaces() {
          var ret = fetch("localhost:80/places/"+ this.id);
        }
    },
    mounted () {
      this.fetchPlaces();
  }
}

</script>