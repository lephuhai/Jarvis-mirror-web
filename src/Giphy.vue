<template>
  <img :src="image_url" alt="Terminator is coming!!">
</template>

<script>
    export default {
      name: "giphy",
      data() {
          return {
            image_url: ''
          }
      },
      methods: {
        getGiphyImage() {

          this.$http.get(`https://api.giphy.com/v1/gifs/random?api_key=pV0SDnYlUmGbNm0hCybxgjy27YsAyWzl&tag=&rating=G`).then(response => {

            this.image_url = response.body.data.image_url;
          }).catch(error => {

            console.log(error);
          });
        }
      },
      created() {

        this.getGiphyImage();
        setInterval(() => {

          this.getGiphyImage();
        }, 15000)
      }
    }
</script>

<style scoped>

</style>
