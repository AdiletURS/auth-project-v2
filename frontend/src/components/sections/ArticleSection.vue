<script setup>
defineProps({
  title: {
    type: String,
    default: "no title"
  },
  subtitle: String
})
</script>

<template>
  <section class="container">
    <div class="title">
      <div>
        <h2>{{ title }}</h2>
        <i class="subtitle">{{ subtitle }}</i>
      </div>

      <span>❬❬❬</span>
    </div>

    <article class="content">
      <slot></slot>
    </article>
  </section>
</template>

<style scoped>
.title {
  margin-bottom: 24px;
  display: flex;
  align-content: center;
  gap: 24px;

  span {
    display: flex;
    align-items: center;

    font-size: 2.5rem;
  }

  /* Phone */
  @media (max-width: 850px) {
    margin-left: 0;
  }
}

.subtitle {
  color: rgba(0, 0, 0, .3)
}

.content {
  display: flex;
  justify-content: space-around;
  gap: 10px;

  /* Phone */
  @media (max-width: 850px) {
    flex-direction: column;
  }
}

:deep(img) {
  flex: 1;
  max-height: 400px;
}
:deep(p),
:deep(ul) {
  flex: 2;
}
</style>