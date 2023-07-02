<script lang="ts">
  import { onMount } from "svelte";
  import { userStore } from "./store/userStore";
  import RegistrationForm from "./components/RegistrationForm.svelte";
  import TextInput from "./components/TextInput.svelte";
  import { User } from "./types/User";

  let user: User | null = null;

  // Subscribe to the user store
  userStore.subscribe((value) => {
    user = value;
  });

  let textInput = "";

  const saveText = () => {
    localStorage.setItem("textInput", textInput);
  };

  // Load text input from local storage on mount
  onMount(() => {
    const storedTextInput = localStorage.getItem("textInput");
    if (storedTextInput) {
      textInput = storedTextInput;
    }
  });
</script>

<main>
  {#if user}
    <h1>Welcome, {user.username}!</h1>
    <TextInput bind:value={textInput} />
    <button on:click={saveText}>Save Text</button>
  {:else}
    <RegistrationForm />
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #333;
  }

  button {
    margin-top: 0.5em;
  }
</style>
