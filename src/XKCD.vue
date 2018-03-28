<template>
  <img :src="image_url" alt="">
</template>

<script>
    export default {
        name: "x-k-c-d",
        data() {
          return {
            image_url: ''
          }
        },
        methods: {
          getRandomInt: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          }
        },
        created() {

          this.$http.get(`https://xkcd.com/${15}/info.0.json`, {}, {
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
          }).then(response => {

            console.log(response.img);
          }).catch(error => {

            console.log(error);
          })


          // setInterval(() => {
          //
          //   var intComic = this.getRandomInt(1, 1968);
          //
          //   axios.get(`https://xkcd.com/${intComic}/info.0.json`).then(function (response) {
          //
          //     console.log(response);
          //   })
          //
          // }, 60000)
        }
    }
</script>

<style scoped>

</style>
