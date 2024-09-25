<script lang="ts" setup>
const topAliens = ref<unknown[]>([]);
const fetchStats = async () => {
  const response = await $fetch("/api/stats");
  console.log({ response });
  topAliens.value = response;
};
onMounted(() => {
  fetchStats();
});
</script>

<template>
  <main>
    <div class="stats-container">
      <div class="like-stats">
        <h4>Top smashers</h4>
        <div v-for="alienData in topAliens" class="smashed-item">
          <div class="alien-name">{{ alienData?.alien?.name }}</div>
          <div class="alien-likes">{{ alienData?.likeCount }}</div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="css" scoped>
main {
  display: flex;
  justify-content: center;
}
.smashed-item {
  display: flex;
  margin: 1rem 0;
  gap: 1rem;
}
</style>
