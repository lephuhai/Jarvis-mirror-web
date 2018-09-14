<template>
  <div id="app">
    <h2>{{ date | moment("dddd, MMMM Do YYYY") }}</h2>
    <h1>{{ date | moment("h:mm:ss a") }}</h1>

    <p>Hai: {{ brightness }}</p>

    <TimeMessage :date="date" />
    <BirthdayReminder :date="date" />
    <Weather />

    <video autoplay id="no-sleep" :src="mediaAudio" style="display: none"></video>
  </div>
</template>

<script>
  const MEDIA_AUDIO = require('./media');

  import TimeMessage from './TimeMessage'
  import BirthdayReminder from './BirthdayReminder'
  // import Giphy from './Giphy'
  import Weather from './Weather'
  export default {
    name: 'app',
    components: {
      TimeMessage,
      BirthdayReminder,
      // Giphy,
      Weather
    },
    data () {
      return {
        mediaAudio: MEDIA_AUDIO,
        videoElement: null,
        date: null,
        brightness: null
      }
    },
    created() {
      setInterval(() => {
        this.date = new Date()
      }, 1000);
    },
    mounted() {
      this.videoElement = document.getElementById('no-sleep');

      this.videoElement.addEventListener('ended', () => {
        this.videoElement.play();
      })
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
  text-align: right;
}

h1, h2 {
  font-weight: normal;
}

h2 {
  font-size: 80px;
  padding-top: 0;
  margin-top: 0;
}

h1 {
  font-size: 160px;
  padding: 0;
  margin: 0;
}

ul {
  list-style-type: none;
}

a {
  color: #fff;
}
</style>
