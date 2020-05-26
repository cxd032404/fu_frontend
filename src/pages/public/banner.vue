<template lang="html">
  <div class="container-fluid huodongswiper">
      <swiper :options="swiperOption">
        <swiper-slide><img src="../../assets/images/banner.png"></swiper-slide>
        <swiper-slide><img src="../../assets/images/banner.png"></swiper-slide>
        <swiper-slide><img src="../../assets/images/banner.png"></swiper-slide>

            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-pagination" slot="pagination"></div>

      </swiper>
  </div>

</template>

<script>
export default {
  data () {
    return {
      swiperOption:{
        slidesPerView: 'auto',
        centeredSlides:true,
        spaceBetween: 10,
        loop:true,
        speed:600, //config参数同swiper4,与官网一致
        pagination:{
             el: " .swiper-pagination",
             clickable: true,
             type: "bullets"
             }
      }
    }
  },

}
</script>

<style lang="css" scoped>
</style>
