<template>
    <form @submit.prevent="" class="prod-form text">
        <fieldset>
            <span ref="lblname" class="msg"></span>
        <label for="prname"
            class="prod-form__inp_sequred">
            Наименование товара
        </label>
        <input type="text" placeholder="Введите наименование товара"  
            ref="inpname"          
            v-model.trim="name"
            id="prname"
            class="prod-form__inp">
        <label for="prdesc" class="msg">
            Описание товара
        </label>
        <textarea type="text" placeholder="Введите описание товара"
            v-model="description"
            id="prdesc"
            class="prod-form__inp prod-form__inp-desc">
        </textarea>
        <span ref="lblimg" class="msg"></span>
        <label for="primg"
            class="prod-form__inp_sequred">
            Ссылка на изображение товара
        </label>
        <input type="text" placeholder="Введите ссылку"
            v-model.trim="img"
            ref="inpimg"
            id="primg"
            class="prod-form__inp">
        <span ref="lblcost" class="msg"></span>
        <label for="prcost"
            class="prod-form__inp_sequred">
            Цена товара
        </label>
        <input type="text" placeholder="Введите цену"
            v-model.number="cost"
            ref="inpcost"
            id="prcost"
            class="prod-form__inp">
        </fieldset>
        <button 
            @mouseover="checkCorrect($event)"
            @mouseout="$event.target.classList.toggle(done.class)"
            @click="add"
            class="prod-form__btn">
                Добавить товар
            </button>
    </form>
</template>

<script>
export default {
    name: 'prod-form',
    data() {
        return {
            product: {
            name: '',
            description: '',
            img: '',
            cost: '',
            },
            correct: {
                name: false,
                img: false,
                cost: false,
            },
            done: {
                state: false,
                class: ''
            },
        }
    },
    methods: {
        async add() {
            if(this.done.state) {
                this.markInvalid()
            }else{ 
                await this.$store.dispatch('products/addProduct', this.product).then(this.rst)
            };
        },
        rplcWtespace(str) {
            return str.replace(/\s{2,}/g, ' ');
        },
        checkCorrect(e) {
            this.done.state = new Set(Object.values(this.correct)).has(false);
            this.done.class = !this.done.state?'prod-form__btn_val':'prod-form__btn_inval';
            e.target.classList.add(this.done.class);
        },
        markInvalid() {
            Object.keys(this.correct).forEach(el=>{
                this.$refs[`lbl${el}`].classList.toggle('lbl-inval', !this.correct[el]);
                this.$refs[`inp${el}`].classList.toggle('inp-inval', !this.correct[el]);
            })
        },
        rst() {
            this.product = {name: '', description: '', img:'', cost:''};
            this.correct = {name:false, img:false, cost:false};
        }
        
    },
    computed: {
        name:{
            set(newVal) {
                this.correct.name = newVal.replace(/\s+/g, '').length>=2?true:false;
                this.product.name = this.rplcWtespace(newVal)
            },
            get() {return this.product.name}
        },
        description: {
            set(newVal) {
                this.product.description = this.rplcWtespace(newVal)
            },
            get(){return this.product.description}
        },
        img:{
            set(newVal) {
                this.correct.img = /^https?:/.test(newVal)?newVal:false;
                this.product.img = newVal.replace(/\s+/g, '')
            }, 
            get(){return this.product.img}
        },
        cost: {
            set(newVal){
                this.correct.cost = typeof newVal==='number'?true:false;
                this.product.cost = newVal
            },
            get(){
                return this.product.cost
            }
        }

    }
}
</script>
<style lang="scss" scoped>
$btnRadius: 10px;
$inpBttm: 16px;
$msgH: 10px;
$circleSize: 4px;
$validColor: rgba(123, 174, 115, 1);
$invalidColor: #ff8484;
$whiteTxt: rgba(255, 255, 255, 1);

    .prod-form {
        width: 332px;
        height: 440px;
        position: sticky;
        top: 0;
        padding: 24px;
        border-radius: 4px;
        background: {
            color: rgba(255, 254, 251, 1);
        }
        box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04), 0px 6px 10px rgba(0, 0, 0, 0.02);
        &__inp {
            min-height: 36px;
            margin: {
                top:4px;
                bottom: calc($inpBttm - $msgH);
            }
            padding: 10px 16px;
            border-radius: 4px;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
            color: #3f3f3f;
            font: {
                size: 12px;
                weight:400;
            }
            &-desc {
                height: 108px;
            }
            &_sequred {
                position: relative;
                &::before {
                    content:'';
                    display: block;
                    position: absolute;
                    width: $circleSize;
                    height: $circleSize;
                    right: -$circleSize;
                    top: 0;
                    border-radius: 50%;
                    background: {
                        color: $invalidColor;
                    }
                }
            }
        }
        &__btn {
                width: 100%;
                min-height: 36px;
                border-radius: $btnRadius;
                margin: {
                    top: 24px;
                }
                color: #b4b4b4;
                font: {
                    family: 'Inter';
                    size: 12px;
                    weight: 600;
                }
                background: {
                    color: #eeeeee;
                }
                &:hover {
                    cursor: pointer;
                    color: $whiteTxt;
                }
                &_val {
                        background: {
                        color: $validColor;
                        }
                }
                &_inval {
                        background: {
                            color: $invalidColor;
                        }
                }
        }
    }
    .inp-inval {
        border: 1px solid $invalidColor;
    }
    .msg {
        display: inline-block;
        min-width: 100px;
        height: $msgH;
    }
    .lbl-inval {
         &::before {
             content: 'Поле является обязатедльным';
            display: inherit;
             color: $invalidColor;
             font: {
                 size: 8px
             }
         }
    }
    fieldset {
        display: flex;
        flex-direction: column;
        & label {
            display: inline-block;
            width: auto;
            width: fit-content;
            height: 13px;
            font: {
                size: 10px;
                weight: 400;
            }
            color: #49485e;
            cursor: pointer;
        }
        & :last-child {
            margin: {
                bottom: 0;
            }
        }
    }
    .text {
        font: {
            family: 'Sourse Sans Pro', sans-serif;
        }
    }
</style>