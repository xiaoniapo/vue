<template>
    <div>
        <button @click="handleAdd">add</button>
        <button @click="handleDes">splice</button>
        <button @click="handleShuffle">shuffle</button>

        <transition-group
            tag="ul"
        >
            <li
                v-for="item in lists"
                :key="item"
            >{{ item }}</li>
        </transition-group>
    </div>
</template>

<script>
export default {
    data() {
        return {
            lists: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            num: 0
        }
    },
    created() {
        this.num = this.lists.length;
    },
    methods: {
        handleAdd() {//往数组的随机位置添加一个数字
            const { lists } = this;
            const randomIndex = this.getRandom();
            lists.splice(randomIndex, 0, this.num ++)
        },
        handleDes() {
            const { lists } = this;
        
            const randomIndex = this.getRandom();
            lists.splice(randomIndex, 1);
        },
        handleShuffle() {
            this.lists.sort(() => Math.random() - 0.5)
        },
        getRandom() {
            return  Math.floor(Math.random() * this.num);
        }
    }
}
</script>

<style scoped>
button {
    margin-right: 10px;
    margin-bottom: 10px;
}
li {
    list-style: none;
    /* display: inline; */
    display: inline-block;
    margin-right: 10px;
}
ul {
    display: block;
    margin: 0;
    padding: 0;
}
.v-enter,
.v-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
.v-enter-active,
.v-leave-active {
    transition: all .5s;
}
.v-enter-to,
.v-leave {
    opacity: 1;
    transform: translateY(0);
}
.v-move {
    transition: transform 1s;
}
</style>