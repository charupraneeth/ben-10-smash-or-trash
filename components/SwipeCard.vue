<template>
  <div
    class="card"
    :style="cardStyles"
    @mousedown="startDrag"
    @touchstart="startDrag"
    @mouseup="endDrag"
    @touchend="endDrag"
    @mousemove="dragging"
    @touchmove="dragging"
    @transitionend="onTransitionEnd"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["swipe"]);

const position = ref({ x: 0, y: 0 });
const startPosition = ref({ x: 0, y: 0 });
const rotatingAngle = ref(0);
const isDragging = ref(false);
const dismissed = ref(false);
const directionLocked = ref(null); // New variable to lock swipe direction

const cardStyles = computed(() => ({
  transform: `translate(${position.value.x}px, ${position.value.y}px) rotate(${rotatingAngle.value}deg)`,
  transition: dismissed.value ? "transform 0.5s ease-out" : "",
  opacity: dismissed.value ? 0 : 1,
  cursor: isDragging.value ? "grabbing" : "grab",
}));

const startDrag = (event) => {
  if (dismissed.value || isDragging.value) return;

  isDragging.value = true;
  directionLocked.value = null; // Reset direction lock on new drag
  const touchEvent = event.type.includes("touch");
  const point = touchEvent ? event.touches[0] : event;

  startPosition.value = {
    x: point.clientX,
    y: point.clientY,
  };
};

const dragging = (event) => {
  if (!isDragging.value) return;

  const touchEvent = event.type.includes("touch");
  const point = touchEvent ? event.touches[0] : event;

  const deltaX = point.clientX - startPosition.value.x;
  const deltaY = point.clientY - startPosition.value.y;

  // Determine the direction on initial movement
  if (directionLocked.value === null) {
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      directionLocked.value = "horizontal";
    } else {
      directionLocked.value = "vertical";
      isDragging.value = false; // Cancel dragging for vertical movement
      return;
    }
  }

  if (directionLocked.value === "horizontal") {
    event.preventDefault(); // Prevent default behavior like scrolling

    position.value.x = deltaX;
    position.value.y = 0; // Keep y at 0 to prevent vertical movement
    rotatingAngle.value = position.value.x / 10;
  }
};

const endDrag = () => {
  if (!isDragging.value) return;

  isDragging.value = false;

  if (position.value.x > 150) {
    dismissCard("right");
  } else if (position.value.x < -150) {
    dismissCard("left");
  } else {
    resetCard();
  }
};

const dismissCard = (direction) => {
  const xMovement = direction === "left" ? -300 : 300;
  const rotation = direction === "left" ? -30 : 30;

  position.value.x = xMovement;
  rotatingAngle.value = rotation;
  dismissed.value = true;

  emit("swipe", { direction, index: props.index });
};

const resetCard = () => {
  position.value.x = 0;
  position.value.y = 0;
  rotatingAngle.value = 0;
};

const onTransitionEnd = () => {
  if (dismissed.value) {
    // Reset state for the next card
    dismissed.value = false;
    resetCard();
  }
};
</script>

<style scoped>
.card {
  width: 300px;
  height: 500px;
  max-height: fit-content;
  border-radius: 10px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  user-select: none;
  /* Allow vertical scrolling, prevent horizontal touch actions */
  touch-action: pan-y;
}
</style>
