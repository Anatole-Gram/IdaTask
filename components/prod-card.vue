<template>
    <div 
        @mouseover="active=true"
        @mouseout="active=false"
        class="card text">
            <button
                @click="rm(product.id, idx)"
                :class="{'hide': !active}"
                class="card__rm-btn">
            </button>
            <img :src="product.img" @error="$event.target.src='https://imgholder.ru/332x200/8493a8/adb9ca&text=IMAGE+HOLDER&font=kelson'" alt="produt image" class="card__img">
            <div class="card__wraper">
                <h4 class="card__ttl">{{this.product.name}}</h4>
                <p class="card__desc">{{this.product.description}}</p>
                <span class="card__price"> {{this.product.cost}} руб.</span>
            </div>
    </div>
</template>
<script>
export default {
    name: 'prod-card',
    data(){
        return{
            active: false,
        }
    },
    props: ['product', 'idx'],
    methods: {
        async rm(id, idx){
           await this.$store.dispatch('products/rmProduct', {id, idx})
        }
    }

}
</script>
<style lang="scss" scoped>
$wCard: 332px;
$hcard: 423px;
$cardRadius: 4px;
$bgCard: #fffefb;

.hide{
    display: none;
}
.card {
    width: $wCard;
    height: $hcard;
    display: flex;
    position: relative;
    flex-direction: column;
    border-radius: $cardRadius;
    box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04), 0px 6px 10px rgba(0, 0, 0, 0.02);
    margin: {
        bottom: 16px;
    }
    background: {
        color: $bgCard;
    }
    &__ttl {
        overflow: hidden;
        font: {
            size: 20px;
            weight: 600;
        }
        line-height: 25px;
    }
    &__desc{
        flex-grow: 1;
        padding: 16px 0;
        overflow: hidden;
    }
    &__price {
        overflow: hidden;
        font: {
            size: 24px;
            weight: 600;
        }
        line-height: 30px;
    }
    &__wraper {
        width: $wCard;
        display: flex;
        flex-direction: column;
        padding: 16px 16px 24px;
        flex-grow: 1;
    }
    &__rm-btn {
        width: 32px;
        height: 32px;
        position: absolute;
        top: -8px;
        right: -8px;
        background: {
            image: url('/cart.svg');
            size: cover;
        }
        &:hover {
            cursor: pointer;
        }
    }
    & img {
        width: $wCard;
        height: 200px;
        display: inline-block;
        border-radius: $cardRadius $cardRadius 0 0;
    }
}
.text {
    font: {
        family: 'Source Sans Pro', sans-serif;
    }
    color: #3f3f3f;
}
</style>