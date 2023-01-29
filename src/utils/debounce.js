/*
 * @Descripttion: 
 * @version: 
 * @Author: 杭
 * @Date: 2023-01-14 14:45:30
 * @LastEditors: 杭
 * @LastEditTime: 2023-01-14 14:54:16
 */
// 防抖
function debounce(fn, delay = 300) {
    var timer = null;
    return function () {
        var _this = this;
        var args = arguments;
        if (timer) clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(_this, args);
        }, delay);
    };
}

export {
    debounce,
}