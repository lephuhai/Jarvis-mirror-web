<template>

  <div>
    <h3>{{ cityName }}</h3>

    <span class="temperature">{{temperature}}°</span><span class="temperature-type">C</span>
    <img class="temperature-icon" width="150px" :src="imageResource[weatherMain]" :alt="weatherMain">
    <br>
    <span class="weather-main">{{ weatherMain }}</span> &nbsp;
    <span class="weather-desc">({{ weatherDescription }})</span>
  </div>
</template>

<script>
    export default {
        name: "weather",
        data() {
          return {
            cityName: '',
            temperature: '',
            weatherMain: '',
            weatherDescription: '',
            imageResource: {
              Clouds: 'https://raw.githubusercontent.com/HackerHouseYT/Smart-Mirror/master/assets/Cloud.png',
              Rain: 'https://raw.githubusercontent.com/HackerHouseYT/Smart-Mirror/master/assets/Rain.png',
              Clear: 'https://raw.githubusercontent.com/HackerHouseYT/Smart-Mirror/master/assets/Sun.png'
            }
          }
        },
        methods: {
            getWeather() {

              this.$http.get('https://openweathermap.org/data/2.5/forecast/daily/?appid=b6907d289e10d714a6e88b30761fae22&id=1581130&units=metric').then(response => {

                var data = response.body;

                this.cityName = data.city.name + ', ' + data.city.country;

                this.temperature = data.list[0].temp.day;

                this.weatherMain = data.list[0].weather[0].main;

                this.weatherDescription = data.list[0].weather[0].description;

              }).catch(error => {

              })
            }
        },
        created() {

          this.getWeather();

          setInterval(() => {

            this.getWeather();

          }, 300000); // 5 phút cập nhật 1 lần.
        }
    }
</script>

<style scoped>

  h3 {
    font-size: 70px;
    text-transform: uppercase;
  }

  .temperature {
    font-size: 180px;
  }

  .temperature-type {
    font-size: 90px;
  }

  .temperature-icon {
    padding-left: 70px;
  }

  .weather-main {
    font-size: 60px;
  }

  .weather-desc {
    font-size: 30px;
  }
</style>
