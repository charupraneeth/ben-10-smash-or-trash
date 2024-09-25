<script lang="ts" setup>
import aliens from "@/assets/aliens.json";

type AlienCharacter = {
  id: string;
  name: string;
  species: string;
  homePlanet: string;
  body: string;
  description: string;
  abilities: string[];
  weaknesses: string[];
  images: string[];
  series: string;
  color: string;
};

interface SwipeProps {
  direction: string;
  index: number;
}

const shuffleArray = (array: AlienCharacter[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};

const cards = useState("aliens", () => shuffleArray([...aliens]));

const currentIndex = ref(0);

const visibleCount = 3;

const visibleCards = computed(() => {
  return cards.value.slice(
    currentIndex.value,
    currentIndex.value + visibleCount
  );
});

const handleSwipe = ({ direction, index }: SwipeProps) => {
  const globalIndex = currentIndex.value + index;
  const swipedCard = visibleCards.value[index];

  // Delay removal to ensure smooth animation
  setTimeout(() => {
    cards.value.splice(globalIndex, 1);

    if (currentIndex.value + visibleCount > cards.value.length) {
      currentIndex.value = Math.max(0, cards.value.length - visibleCount);
    }
  }, 400); // Match this with the swipe animation duration

  // Perform the fetch without awaiting to prevent UI delays
  $fetch(`/api/${direction === "right" ? "like" : "dislike"}`, {
    method: "POST",
    body: JSON.stringify({ id: swipedCard.id }),
  })
    .then((response) => {
      // Handle successful response if needed
      console.log("Action successful:", response);
    })
    .catch((error) => {
      // Handle errors
      console.error("Error occurred during fetch:", error);

      // Optionally, reverse the card removal if the fetch failed
      setTimeout(() => {
        cards.value.splice(globalIndex, 0, swipedCard);

        // Adjust the currentIndex if necessary
        if (currentIndex.value + visibleCount <= cards.value.length) {
          currentIndex.value = Math.max(0, currentIndex.value);
        }
      }, 400); // Ensure this matches the removal delay
    });
};
</script>

<template>
  <main>
    <SwipeCard
      v-for="(card, index) in visibleCards"
      :key="card.id"
      :index="index"
      :style="{ zIndex: visibleCards.length - index }"
      @swipe="handleSwipe"
    >
      <div class="alien-card">
        <!-- Make sure this container allows scrolling -->
        <div class="alien-image-container">
          <img :src="card.images[0]" alt="" class="alien-image" />
        </div>
        <div class="alien-info">
          <div class="alien-name">{{ card.name }}</div>
          <div class="alien-description">{{ card.description }}</div>
          <!-- Additional content that may require scrolling -->
        </div>
      </div>
    </SwipeCard>
  </main>
</template>

<style lang="scss">
main {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.alien-info {
  pointer-events: none;
  margin-top: 2rem;
}

.alien-name {
  font-weight: bold;
}

.alien-description {
  margin-top: 1rem;
}

.alien-image {
  width: 100%;
  height: auto;
  pointer-events: none;
}

.alien-card {
  overflow-y: auto; // Enable vertical scrolling
  width: 100%;
  height: 100%;
  max-height: 500px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 15px;
}
</style>
