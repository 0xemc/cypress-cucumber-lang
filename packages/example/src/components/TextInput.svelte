<script lang="ts">
  export let value = "";
</script>

<input bind:value {...$$props} />

<style>
  input {
    padding: 0.5em;
    font-size: 1em;
    width: 100%;
  }
</style>
