<script setup>
import {onBeforeMount, ref} from "vue";
import InfiniteScroll from "@/components/InfiniteScroll.vue";
import ArticleSection from "@/components/ArticleSection.vue";
import EmailNewsletter from "@/components/EmailNewsletter.vue";

const introPhrases = [
  "the best shirts in za warudo",
  "shirts only for gigachads",
  "very unordinary shirts, even tho, we call them \"ordinary\"",
  "shirts in which you'll look much cooler"
];

const pickedPhrase = ref(0);

onBeforeMount(() => {
  pickedPhrase.value = Math.floor(Math.random() * introPhrases.length);
});
</script>

<template>
  <section id="intro">
    <div class="greet">
      <h2>sup, nerd. this is...</h2>
      <img class="logo" src="@/assets/logo_full.png" alt="Ordinary Nation Logo">
      <div>
        <i style="color: rgba(0, 0, 0, .3)">{{ introPhrases[pickedPhrase] }}</i>
      </div>
    </div>

    <InfiniteScroll>
      <img src="@/assets/showcase/shirt_doom_cum.jpg" alt="Doom CUM Shirt">
      <img src="@/assets/showcase/shirt_evil_jonkler.jpg" alt="Evil Jonkler Shirt">
      <img src="@/assets/showcase/shirt_hentai_inside.jpg" alt="Intel Inside Shirt">
      <img src="@/assets/showcase/shirt_pills.jpg" alt="Pills Shirt">
      <img src="@/assets/showcase/shirt_teto_pear.jpg" alt="Teto Pear Shirt">
    </InfiniteScroll>
  </section>

  <ArticleSection title="how we make our shirts" subtitle="we make very high quality stuff ©2025">
    <p>
      first, we take order very high quality cotton, from which we make very high quality basic shirt.
      then, with very high quality machine we apply very high quality print using very high quality paint, which is
      washing machine safe.
      after, we put our wery high quality product into a very high quality package.
      and finally, we ship you very high quality order with our very high quality cargo partner SlowSnailNotExpress.
      <br><br>
      I've been coding this for six hours straight, now go buy smth.
    </p>
    <img style="object-fit: cover; min-width: 400px"
         src="https://i0.wp.com/lh3.googleusercontent.com/-QC_rA6e6rrQ/VlBphTFy4fI/AAAAAAAAbHY/9NuZu958adY/s600-Ic42/T-Shirt%252520Manufacturing.jpg?resize=600%2C416&ssl=1"
         alt="shirt manufacture">
  </ArticleSection>

  <ArticleSection title="how you enjoy ur shirt" subtitle="if u won't, well, I know where u live.">
    <img style="object-fit: cover; min-width: 400px"
         src="https://www.shutterstock.com/image-photo/quick-delivery-service-concept-happy-260nw-2493464359.jpg"
         alt="happy customer with package">
    <ol>
      <li>you get ur package</li>
      <li>you unwrap it</li>
      <li>you look at it with fascination</li>
      <li>you put it on</li>
      <li>you look sleek and stylish amongst others</li>
    </ol>
  </ArticleSection>

  <EmailNewsletter />
</template>

<style scoped>
#intro {
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.greet {
  margin-bottom: 22px;
}

.logo {
  image-rendering: optimizeSpeed;
  width: 60%;

  @media (max-width: 850px) {
    width: 100%;
  }
}
</style>