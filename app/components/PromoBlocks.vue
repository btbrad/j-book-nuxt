<template>
  <div class="promo-blocks">
    <div class="promo-block daily-challenge">
      <span class="promo-icon">📅</span>
      <span>日更挑战</span>
    </div>
    <div class="promo-block member">
      <span class="promo-icon">👑</span>
      <span>简书会员</span>
    </div>
    <div class="promo-block preferred">
      <span class="promo-icon">💎</span>
      <span>优选连载</span>
    </div>
    <div class="promo-block copyright">
      <span class="promo-icon">📚</span>
      <span>简书版权</span>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
/* Promotional Blocks */
.promo-blocks {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 30px;
}

.promo-block {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.promo-block:hover {
  opacity: 0.9;
}

.daily-challenge {
  background-color: #5dade2;
  color: #fff;
}

.member {
  background-color: #f39c12;
  color: #fff;
}

.preferred {
  background-color: #fad7a0;
  color: #333;
}

.copyright {
  background-color: #5dade2;
  color: #fff;
}

.promo-icon {
  font-size: 16px;
}
</style>
