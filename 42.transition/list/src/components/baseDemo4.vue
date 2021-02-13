<template>
    <div>
        <input type="text" v-model="content">

        <transition-group 
            tag="ul"
            @before-enter="beforeEnter"
            @enter="enter"
            @leave="leave"
        >
            <li
                v-for="item in getList"
                :key="item.name"
            >
                {{ item.name }}
            </li>
        </transition-group>
    </div>
</template>

<script>
const velocity = require("velocity-animate");
export default {
    data() {
        return {
            content: '',
            list: [
                {name: "chen"},
                {name: "wang"},
                {name: "wfnakwdj"},
                {name: "nmd"}
            ]
        }
    },
    methods: {
        beforeEnter(el) {
            el.style.height = 0;
            el.style.opacity = 0
        },
        enter(el, done) {
            velocity(el, { heigth: "24px", opacity: 1 }, { duration: 520, complete: done })
        },
        leave(el, done) {
            velocity(el, { heigth: 0, opacity: 0 }, { duration: 520, complete: done })

        },
    },
    computed: {
        getList() {
            return this.list.filter(item => item.name.includes(this.content))
        }
    }
}
</script>

<style scoped>
li {
    height: 24px;
}

</style>