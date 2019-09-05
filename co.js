/**
 * slice() reference.
 */

var slice = Array.prototype.slice;//数组的slice方法

/**
 * Expose `co`.
 */

module.exports = co['default'] = co.co = co;//兼容导出 支持多种导出方式

/**
 * Wrap the given generator `fn` into a
 * function that returns a promise.
 * This is a separate function so that
 * every `co()` call doesn't create a new,
 * unnecessary closure.
 *
 * @param {GeneratorFunction} fn
 * @return {Function}
 * @api public
 */

co.wrap = function (fn) {//将一个generator函数转化为一个返回值为promise的普通函数
  createPromise.__generatorFunction__ = fn;
  return createPromise;
  function createPromise() {
    return co.call(this, fn.apply(this, arguments));
  }
};

/**
 * Execute the generator function or a generator
 * and return a promise.
 *
 * @param {Function} fn
 * @return {Promise}
 * @api public
 */

function co(gen) {
  var ctx = this;//保存this指针
  var args = slice.call(arguments, 1);//将gen函数参数转换为参数数组

  // we wrap everything in a promise to avoid promise chaining,
  // which leads to memory leak errors.
  // see https://github.com/tj/co/issues/180
  return new Promise(function(resolve, reject) {
    if (typeof gen === 'function') gen = gen.apply(ctx, args);//gen为函数则调用
    if (!gen || typeof gen.next !== 'function') return resolve(gen);//若不是则返回

    onFulfilled();

    /**
     * @param {Mixed} res
     * @return {Promise}
     * @api private
     */

    function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res);//调用next 取得迭代器传回的值
      } catch (e) {
        return reject(e);//抛出错误
      }
      next(ret);//将取到的值返回给迭代器
      return null;
    }

    /**
     * @param {Error} err
     * @return {Promise}
     * @api private
     */

    function onRejected(err) {
      var ret;
      try {
        ret = gen.throw(err);//抛出错误
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }

    /**
     * Get the next value in the generator,
     * return a promise.
     *
     * @param {Object} ret
     * @return {Promise}
     * @api private
     */

    function next(ret) {
      if (ret.done) return resolve(ret.value);//当ret后无元素时返回ret的值
      var value = toPromise.call(ctx, ret.value);//否则将ret的值转为promise
      if (value && isPromise(value)) return value.then(onFulfilled, onRejected);//若value为promise实例则调用then方法
      return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
        + 'but the following object was passed: "' + String(ret.value) + '"'));//否则抛出异常并提示
    }
  });
}

/**
 * Convert a `yield`ed value into a promise.
 *
 * @param {Mixed} obj
 * @return {Promise}
 * @api private
 */

function toPromise(obj) {//将传入的对象转为相应的promise实例
  if (!obj) return obj;//若为null undefined false则返回这个值
  if (isPromise(obj)) return obj;//若为promise则返回该实例
  if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj);//如果为generator（或函数）则调用
  if ('function' == typeof obj) return thunkToPromise.call(this, obj);//若为非generator函数则调用thunkToPromise定义promise状态改变的条件
  if (Array.isArray(obj)) return arrayToPromise.call(this, obj);//将数组转为一个promise实例
  if (isObject(obj)) return objectToPromise.call(this, obj);//将非数组的对象转为一个promise实例
  return obj;
}

/**
 * Convert a thunk to a promise.
 *
 * @param {Function}
 * @return {Promise}
 * @api private
 */

function thunkToPromise(fn) {
  var ctx = this;//保存this指针对象
  return new Promise(function (resolve, reject) {
    fn.call(ctx, function (err, res) {
      if (err) return reject(err);//thunk函数报错则reject
      if (arguments.length > 2) res = slice.call(arguments, 1);
      resolve(res);//不报错则进入resolved状态
    });
  });
}

/**
 * Convert an array of "yieldables" to a promise.
 * Uses `Promise.all()` internally.
 *
 * @param {Array} obj
 * @return {Promise}
 * @api private
 */

function arrayToPromise(obj) {
  return Promise.all(obj.map(toPromise, this));
}

/**
 * Convert an object of "yieldables" to a promise.
 * Uses `Promise.all()` internally.
 *
 * @param {Object} obj
 * @return {Promise}
 * @api private
 */

function objectToPromise(obj){
  var results = new obj.constructor();//新建一个与obj同类的对象
  var keys = Object.keys(obj);
  var promises = [];
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var promise = toPromise.call(this, obj[key]);//将obj中的每一个元素都转化为promise实例
    if (promise && isPromise(promise)) defer(promise, key);//设置对应的result 添加相应的resolve方法 并把promise实例加到promises数组里
    else results[key] = obj[key];
  }
  return Promise.all(promises).then(function () {//将results传参给onFulfilled
    return results;
  });

  function defer(promise, key) {
    // predefine the key in the result
    results[key] = undefined;
    promises.push(promise.then(function (res) {
      results[key] = res;
    }));
  }
}

/**
 * Check if `obj` is a promise.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isPromise(obj) {
  return 'function' == typeof obj.then;//判断obj是否为promise实例
}

/**
 * Check if `obj` is a generator.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */

function isGenerator(obj) {
  return 'function' == typeof obj.next && 'function' == typeof obj.throw;//判断obj是否为迭代器
}

/**
 * Check if `obj` is a generator function.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */
 //判断obj是否为generator函数/实例
function isGeneratorFunction(obj) {
  var constructor = obj.constructor;
  if (!constructor) return false;
  if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) return true;//检验obj的构造器是否为generator构造器 即检查obj是否为generator函数
  return isGenerator(constructor.prototype);//判断obj是否为迭代器
}

/**
 * Check for plain object.
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */

function isObject(val) {
  return Object == val.constructor;//判断val是否为Object
}