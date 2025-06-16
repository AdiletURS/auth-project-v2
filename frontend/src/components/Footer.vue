<script setup>

</script>

<template>
  <footer class="footer">
    <ul class="links">
      <li><RouterLink to="">contact/support</RouterLink></li>
      <li><RouterLink to="">shipping and returns</RouterLink></li>
      <li><RouterLink to="">about us</RouterLink></li>
      <li><RouterLink to="">terms of service</RouterLink></li>
      <li><RouterLink to="">privacy policy</RouterLink></li>
      <li><RouterLink to="">refund policy</RouterLink></li>
    </ul>

    <p class="copyright">Ordinary Nation © 2025</p>
  </footer>
</template>

<style scoped>
.footer {
  padding: 32px var(--padding-inline);
  border-top: 2px solid var(--color-secondary);
}

.copyright {
  margin-top: 24px;
}

.links {
  padding-left: 0;
  list-style-type: none;

  a {
    color: var(--color-secondary);
  }
}

/* Tablet */
@media (max-width: 1200px) {
  .footer {
    padding: 32px var(--padding-inline-tablet);
  }
}

/* Phone */
@media (max-width: 850px) {
  .footer {
    padding: 32px var(--padding-inline-mobile);
  }
}
</style>