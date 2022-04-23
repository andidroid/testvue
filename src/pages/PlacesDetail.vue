<template>
  <h1>place {{id}} {{mode}}</h1>
  <span>
  {{ place.id }} {{ place.value }}
  </span>
</template>


<script>
export default {
    props: {
      id: {type: Number, required: true},
      mode: {type: String, required: true, default: 'show'}
    },
      data () {
    return {
      place: this.$store.getters.places.filter(p => p.id == this.id)
    }
  },
  computed: {
    id() {
      return this.id
    },
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
      //this.fetchPlaces();
  }
}

</script>