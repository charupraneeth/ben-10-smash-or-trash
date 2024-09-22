<script setup>
import aliens from "@/assets/aliens.json";
import SwipeCard from "~/components/SwipeCard.vue";
import { ref, computed } from "vue";

// Full list of cards
const cards = ref([...aliens]);

// Track the index of the first visible card
const currentIndex = ref(0);

// Number of visible cards at a time
const visibleCount = 3;

// Compute the visible cards
const visibleCards = computed(() => {
  return cards.value.slice(
    currentIndex.value,
    currentIndex.value + visibleCount
  );
});

// Handle swipe action
const handleSwipe = ({ direction, index }) => {
  console.log(`Swiped ${direction} on card ${currentIndex.value + index + 1}`);

  const globalIndex = currentIndex.value + index;

  // Delay removal to ensure smooth animation
  setTimeout(() => {
    cards.value.splice(globalIndex, 1);

    if (currentIndex.value + visibleCount > cards.value.length) {
      currentIndex.value = Math.max(0, cards.value.length - visibleCount);
    }
  }, 500); // Match this with the swipe animation duration
};
</script>

<template>
  <div class="swipe-container">
    <SwipeCard
      v-for="(card, index) in visibleCards"
      :key="card.id"
      :index="index"
      :style="{ zIndex: visibleCards.length - index }"
      @swipe="handleSwipe"
    >
      <div class="alien-card">
        <div class="alien-image-container">
          <img :src="card.images[0]" alt="" class="alien-image" />
        </div>
      </div>
    </SwipeCard>
  </div>
</template>

<style lang="scss">
.swipe-container {
  position: relative;
  width: 300px;
  height: 400px;
  margin: 100px auto;
}

.alien-info {
  pointer-events: none;
}

.alien-image {
  width: 100%;
  height: auto;
  pointer-events: none;
}

.alien-card {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}
</style>
