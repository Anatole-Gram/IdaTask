<template>
  <div class="prod-manager container">
    <div class="prod-manager__top text">
      <h3 class="prod-manager__top-ttl">
        Добавление товара
      </h3>
      <prod-filter></prod-filter>
    </div>

    <div class="prod-manager__bar">
      <prod-form></prod-form>
    </div>
    <div  class="prod-manager__content">
        <prod-card v-for="(product, index) of products" :key="product.id" 
          :product="product"
          :idx="index">
        </prod-card>
    </div>
  </div>
</template>

<script>
import prodFilter from '~/components/prod-filter.vue';
import prodCard from '~/components/prod-card.vue';
import prodForm from '~/components/prod-form.vue';
export default {
  async fetch({ store }) {
    if(store.getters['products/products'].length==0)
    await store.dispatch('products/getData')
  },
  components: { prodFilter, prodCard , prodForm},
  name: "IndexPage",
  computed: {
    products() {
      return this.$store.getters['products/products'];
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  max-width: 1440px;
  padding: 0 32px;
}
.prod-manager {
  min-height: 100vh;
  display: grid;
  gap: 16px;

  grid: {
    template: {
      areas: 'top top'
        'side-bar content';
      rows: 67px max-content;
      columns: max-content 1fr;
    }
  }

  &__top {
    grid: {
      area: top;
    }
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-ttl {
      font: {
        size: 28px;
        weight: 600;
      }
    }
  }
  &__bar {
    grid: {
      area: side-bar;
    }
  }
  &__content {
    grid: {
      area: content;
    }
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
  }
}
.text {
  font: {
    family: 'Source Sans Pro', sans-serif;
  }
  color: #3f3f3f;
}
</style>
