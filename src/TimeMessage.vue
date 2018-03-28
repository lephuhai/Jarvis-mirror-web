<template>
  <div id="time-message">
    <div class="clock"></div>
    <h3>{{ this.message }}</h3>
    <audio id="wake_up_1" preload="auto" src="https://aboutmedotvn.firebaseapp.com/static/audio/wake_up_1.mp3"></audio>
    <audio id="wake_up_2" preload="auto" src="https://aboutmedotvn.firebaseapp.com/static/audio/wake_up_2.mp3"></audio>
    <audio id="wait_a_minute" preload="auto" src="https://aboutmedotvn.firebaseapp.com/static/audio/wait_a_minute.mp3"></audio>
  </div>
</template>

<script>
    export default {
      name: "TimeMessage",
      props: ['date'],
      data() {
        return {
          message: '',
          boss_name: 'Hai',
          wakeUpSoundElm: null,
          wakeUpSound2Elm: null,
          waitAMinute: null,
          startWakeUp: false
        }
      },
      methods: {
        isPlaying(audioElement) {
          return !audioElement.paused;
        }
      },
      mounted() {

        this.wakeUpSoundElm = document.getElementById('wake_up_1');
        this.wakeUpSound2Elm = document.getElementById('wake_up_2');
        this.waitAMinute = document.getElementById('wait_a_minute');

        // Chuỗi event để phát nhạc.
        this.wakeUpSoundElm.addEventListener('ended', () => {
          this.waitAMinute.play();
        });

        this.waitAMinute.addEventListener('ended', () => {
          this.wakeUpSound2Elm.play();
        });
        this.wakeUpSound2Elm.addEventListener('ended', () => {
          this.startWakeUp = false;
        })
      },
      watch: {
        date: function(value) {

          var hour = value.getHours();

          if (hour < 4) {
            this.message = `You're up late, ${this.boss_name}`;
          } else if (hour < 12) {
            this.message = `Good morning, ${this.boss_name}`;
          } else if (hour < 17) {
            this.message = `Good afternoon, ${this.boss_name}`;
          } else if (hour < 22) {
            this.message = `Good evening, ${this.boss_name}`;
          } else {
            this.message = `Good evening, It's ${this.boss_name}'s bedtime.`
          }

          if (hour === 6) {

            this.startWakeUp = true;

            var minutes = value.getMinutes();

            // Chỉ báo thức trong những phút thứ 1, 2 và 3
            if (this.startWakeUp && (minutes === 1 || minutes === 2 || minutes === 3)) {

              // Nếu đang có bất kỳ audio nào được phát thì sẽ không play audio khác nữa.
              if (this.isPlaying(this.wakeUpSoundElm) || this.isPlaying(this.wakeUpSound2Elm) || this.isPlaying(this.waitAMinute)) return;

              // Start wakeup music
              this.wakeUpSoundElm.play()
            }
          }
        }
      }
    }
</script>

<style scoped>

  #time-message {
    margin-top: 25px;
  }

  h3 {
    font-size: 55px;
    display: inline;
  }

  .clock {
    transform:scale(2);
    border-radius:50%;
    border:1px solid;
    width:17px;
    height:17px;
    position:relative;
    color: #fff;
    display: inline-flex;
    margin-right: 20px;
    top: -10px;
  }

  .clock:after {
    position:absolute;
    width:0;
    height:4px;
    display:block;
    border-left:1px solid #fff;
    content:'';
    left:8px;
    top:4px;
    animation-duration: 3600s;
  }

  .clock:before {
    position:absolute;
    width:0;
    height:6px;
    display:block;
    border-left:1px solid #fff;
    content:'';
    left:8px;
    top:2px;
    animation-duration: 60s;
  }

  .clock:before,.clock:after {
    transform-origin: bottom;
    animation-name: dial;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @keyframes dial {
    0%   {transform: rotate(0deg);}
    100% {transform: rotate(360deg);}
  }
</style>
