//基于我们的属性都是在界面上进行展示的

const data = {
    name: "chen",
    age: 18,
    student: {
        des: "风姿绰约、花枝招展",
    },
    arr: [1, 2, 3]
};

//书写数组的变异方法 产生屏蔽作用
const oldArrProto = Array.prototype;
const curArr = Object.create(oldArrProto);
const mutationMethod = ["push", "pop", "shift", "unshift", "sort", "reverse", "splice"]; //重写上述变异方法

//让target的隐式原型指向curArr
function changeProtoDirection(target) {
    mutationMethod.forEach(item => {
        curArr[item] = function () {
            oldArrProto[item].call(target, ...arguments);
            render(); //让渲染函数执行
        }
    })
    Object.setPrototypeOf(target, curArr);
}
// [1, 2, 3].push(1); 放里面的this就是指向当前数组的
//设置属性值
function $set(target, key, value) {
    if (Array.isArray(target)) {
        target.splice(key, 1, value);
    } else if (typeof target === "object") { //虽然数组也会满足此方法，但是因为已经满足上面一，故而不执行该方法
        defineProperty(target, key, value); //进行绑定
        render();
    }
    return value;
}
function $delete(target, key) {
    if (Array.isArray(target)) {
        target.splice(key, 1, value);
    } else if (typeof target === "object") { //虽然数组也会满足此方法，但是因为已经满足上面一，故而不执行该方法
        delete target[key];
        render();
    }
}
//假设当前函数就是渲染界面的函数
function render() {
    console.log("界面重新渲染");
}
//定义每一个函数
function defineProperty(target, key, value) {
    let curVal = value;
    if (Object.prototype.toString.call(curVal) === "[object Array]") {
        //当前数据时数组的时候进行绑定原型
        changeProtoDirection(curVal); //只是将数据中的数组的影视原型指向curArr
    }
    if (Object.prototype.toString.call(curVal) === "[object Object]") {
        //让对象的每个属性也都进行绑定,数组就不用每一项都进行绑定
        observer(curVal);
    }
    Object.defineProperty(target, key, {
        //读取属性时会执行当前函数  返回什么值就会读取什么值
        get() {
            return curVal;
            // return data.name这样写就会重复执行当前函数最后爆栈
        },
        //给属性赋值时会执行当前函数
        set(newVal) {
            if (newVal === curVal) { //当属性值没有发生变化的时候就不会渲染界面
                return;
            }
            nameVal = newVal;
            render(); //属性值发生改变时就会引用前
        }
    })
}
//让所有属性都绑定描述
function observer(target) {
    for (const key in target) {
        if (target.hasOwnProperty(key)) {
            defineProperty(target, key, target[key]);
        }
    }
}
observer(data)