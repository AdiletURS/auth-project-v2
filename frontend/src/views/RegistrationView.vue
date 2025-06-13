<script setup>

</script>

<template>
  <form class="reg_form" @submit.prevent="userRegister">
    <h2>Регистрация</h2>

    <div class="username">
      <label for="username">Имя пользователя</label>
      <input type="text" id="username" name="username" placeholder="Имя пользователя">
    </div>

    <div class="essentials">
      <label for="email">Эл. почта</label>
      <input type="email" id="email" name="email" placeholder="Эл. почта">
      <label for="pass">Пароль</label>
      <input type="password" id="pass" name="pass" placeholder="Пароль">
      <label for="pass_r">Повторный пароль</label>
      <input type="password" id="pass_r" name="pass_r" placeholder="Повторный пароль">
    </div>

    <div class="agreement">
      <input type="checkbox">
      <label for="tos" style="word-wrap:break-word;width:80%;">Я ознакомлен(-а) с условием предоставления услуг.</label>
    </div>

    <button type="submit">Зарегистрироваться</button>
  </form>
</template>

<style scoped>
.reg_form {
  width: 350px;
  padding: 18px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  gap: 20px;

  border-radius: 28px 28px 28px 0;
  box-shadow: 0 5px 10px rgba(0, 0, 0, .6);

  background-color: var(--color-background-mute);
}
.reg_form h2 {
  position: absolute;
  left: -35px;
  bottom: 0;

  writing-mode: tb-rl;
  transform: rotate(180deg);
}
.reg_form button {
  align-self: flex-end;
}

.username {
  display: flex;
  flex-direction: column;
}
.essentials {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.agreement label, input[type="checkbox"] {
  margin-right: 12px;
  display: inline-block;
  vertical-align: middle;
}

label[for="username"],
label[for="email"],
label[for="pass"],
label[for="pass_r"] {
  display: none;
}
</style>