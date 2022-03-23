<template>
  <h1>Test</h1>
  <ul id="tests">
    <li v-for="test in tests" :key="test.id">
      {{ test.id }} {{ test.value }}
    </li>
  </ul>
  <span>{{ messages }}</span>
</template>


<script>
export default {
    props: {

    },
      data () {
    return {
      messages: '',
      tests:[{id: '1',value:'dummy'}]
    }
  },
  computed: {
    
  },
    methods: {
        streamMessages() {
          let es = new EventSource('https://test.andidroid.io/testmessagingservice/messages/stream');

          es.addEventListener('message', event => {
              let data = event.data;//JSON.parse(event.data);
              console.log(data);
              this.messages = data;
          }, false);

          es.onopen= function(e) {
            console.log('eventsource.onopen', e);
          };
          es.onerror= function(e) {
            console.log('eventsource.onerror', e);

          if (e.target.readyState === EventSource.CLOSED) {
                console.log('SSE closed ' + '(' + e.target.readyState + ')')
              } else if (e.target.readyState === EventSource.CONNECTING) {
                console.log('SSE reconnecting ' + '(' + e.target.readyState + ')')
                sseClient.close()
              }

          };
          es.onmessage= function(e) {
            console.log('eventsource.onmessage', e);
          };
        }
    },
    mounted () {
      this.streamMessages();
  }
}

</script>