<template>
  <div>
    <ul v-html="message"></ul>
  </div>
</template>

<script>
    export default {
      name: "birthday-reminder",
      props: ['date'],
      data() {
        return {

          /**
           * Date format: MM/dd
           */
          birthdayStore: {
            '11/05/2018': ['Boss'],
            '04/19/2018': ['Trang Fly'],
            '10/05/2018': ['Em Hiền'],
            '12/02/2018': ['Anh Hùng'],
            '02/20/2018': ['Dung [Smart]'],
          },
          message: '',
          reminderDays: -30 // Nhắc trước sinh nhật bao nhiêu ngày.
        }
      },
      watch: {
        date: function (value) {

          this.message = '';

          var dateToday = `${("0" + (value.getMonth() + 1)).slice(-2)}/${("0" + value.getDate()).slice(-2)}/2018`;

          var todayTime = new Date(dateToday).getTime();

          var days = Object.keys(this.birthdayStore);
          days.forEach(day => {

            var birthdayTime = new Date(day).getTime();

            var stillTime = ((todayTime - birthdayTime) / (86400 * 1000));

            if (stillTime <= 0 && this.reminderDays <= stillTime) {

              this.message += `<li style="padding-top: 8px; font-weight: normal; font-size: 40px;">
        <marquee behavior="alternate" scrolldelay="200">Only ${Math.abs(stillTime)} days left until ${this.birthdayStore[day].join(',')} Birthday</marquee>
      </li>`
            }
          });
        }
      }
    }
</script>

<style scoped>

</style>
