const vm = new Vue({
    el: "#app",
    data: {
        num: 1,
        content: "", //用于接受文本框中的数据
        task: {
            uncomplete: {
                classes: "uncomplete",
                title: "未完成任务",
                data: []
            },
            complete: {
                classes: "complete",
                title: "已完成任务",
                data: []
            },
            
        }
    },
    methods: {
        submit() {
            if(!this.content.trim()) {
                return;
            }
            this.task.uncomplete.data.push({
                id: this.num++,
                content: this.content
            });
            this.content = '';
        },
        input(e) {
            this.content = e.target.value
        },
        del(item, index) {
            item.data.splice(index, 1);
        },
        complete(index) { //将任务比变成完成
            console.log("任务完成了", index, this.task.uncomplete.data)
            const completeTask = this.task.uncomplete.data.splice(index, 1);
            console.log(completeTask)
            this.task.complete.data.push(...completeTask);
        },
        uncomplete(index) { //将任务变成未完成
            console.log("任务未完成", index);
            const uncompleteTask = this.task.complete.data.splice(index, 1);
            this.task.uncomplete.data.push(...uncompleteTask);
        },
        handleClick(str, index) {
            if (str === "complete") {//此时点击的是，完成框中的内容，所以变成未完成
                this.uncomplete(index);
            } else {
                this.complete(index);
            }
        }
    }
})