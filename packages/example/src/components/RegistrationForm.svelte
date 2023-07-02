<script lang="ts">
  import { userStore } from "../store/userStore";
  import type { User } from "../types/User";

  let username = "";
  let email = "";

  const register = () => {
    const user: User = {
      username,
      email,
    };

    userStore.set(user);
  };
</script>

<form on:submit|preventDefault={register}>
  <label for="name">Name</label>
  <input id="name" bind:value={username} required />

  <label for="email">Email</label>
  <input id="email" type="email" bind:value={email} required />

  <button type="submit">Register</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  label {
    font-weight: bold;
  }

  input {
    padding: 0.5em;
    font-size: 1em;
  }

  button {
    padding: 0.5em;
    font-size: 1em;
    background-color: #333;
    color: white;
    border: none;
    cursor: pointer;
  }

  button:hover {
    background-color: #555;
  }
</style>
