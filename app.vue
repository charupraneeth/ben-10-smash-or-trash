<template>
  <nav>
    <h2 style="text-align: center; margin: 0.5rem 0">Smash or Trash</h2>
    <div>
      <NuxtLink to="/">Home</NuxtLink> |
      <NuxtLink to="/stats">Stats</NuxtLink>
    </div>
  </nav>
  <NuxtPage />
</template>

<style>
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#__nuxt {
  height: 100%;
  width: 100%;
}

body {
  font-family: "Courier New", Courier, monospace;
}

nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}
</style>
