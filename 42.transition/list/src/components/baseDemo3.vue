<template>
    <div>
        <input type="text" v-model="content">

        <transition-group tag="ul">
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
.v-enter,
.v-leave-to {
    height: 0;
}
.v-enter-active,
.v-leave-active {
    transition: all .5s;
}
.v-enter-to,
.v-leave {
    height: 24px;
}
</style>