## co 的原理

co的参数为generator函数。
co函数中定义了自动执行generator的next方法。
1. 返回一个新的promise实例
2. 该实例中，根据传入的generator函数生成一个generator实例
3. 执行onFulfilled
    - onFulfilled中调用generator实例的next方法（出错则转入rejected状态），并将这个值传入next函数，实现对generator的自动执行。

如果generator中yield
- null undefined false等假值 则返回这个值
- promise实例 则返回该实例
- generator（或函数）则调用
- thunk函数 则定义promise状态改变的条件，并返回该promise实例
- 数组 则执行Promise.all将数组每一项都转为promise实例并打包返回
- 对象 则根据每个属性值生成对应的promise实例，添加对应的resolve方法，并返回打包的promise实例。
