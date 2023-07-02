import { writable } from "svelte/store";
import type { User } from "../types/User";

// Create a writable store for User
export const userStore = writable<User | null>(null);

// Check if there is a user in local storage
const storedUser = localStorage.getItem("user");
if (storedUser) {
  userStore.set(JSON.parse(storedUser));
}

// Subscribe to the user store and save any changes to local storage
userStore.subscribe((user) => {
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.removeItem("user");
  }
});
