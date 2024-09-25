<script setup lang="ts">
defineProps({
  abilities: {
    type: Array as () => string[],
    required: true,
  },
});
</script>

<template>
  <div class="abilities-container">
    <span
      v-for="(ability, index) in abilities"
      :key="index"
      class="alien-ability"
    >
      {{ ability }}
    </span>
  </div>
</template>

<style lang="css" scoped>
.abilities-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.alien-ability {
  font-size: 0.85rem;
  background-color: #e0f7fa;
  color: #006064;
  padding: 0.3rem 0.6rem;
  border-radius: 16px;
  border: 1px solid #00acc1;
}
</style>
