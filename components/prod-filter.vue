<template>
    <section class="filters">
        <div class="filter-wraper">
            <select  v-model="sortParam" class="text">
                <option value="" disabled>По умолчанию</option>
                <option value="0">По наименованю</option>
                <option value="1">По возрастанию</option>
                <option value="2">По убыванию</option>
            </select>
        </div>
    </section>
</template>
<script>
export default {
    name: 'prod-filter',
    data() {
        return {
            sortParam: '',
        }
    },
    watch: {
        sortParam(newVal) {
            this.$store.dispatch('products/sortProducts', newVal);
        }
    }
}
</script>
<style lang="scss" scoped> 
    $hFilter: 36px;
    .filter-wraper {
        height: $hFilter;
        border-radius: 4px;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        padding: 10px 16px 11px;
    }
    .text {
        font: {
            family: 'Sourse Sans Pro', sans-serif;
            size: 12px;
            weight: 400;
        }
        line-height: 15px;
        color: #b4b4b4;
    }

</style>