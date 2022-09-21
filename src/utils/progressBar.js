import { Decimal } from "decimal.js";
/**
 * 不丢失精度相加
 * @param {number} num1
 * @param {number} num2
 */
export const exactAdd = (num1 = 0, num2 = 0) => {
    return Decimal.add(+num1, +num2).toNumber();
};

/**
 * 不丢失精度相减
 * @param {number} num1
 * @param {number} num2
 */
export const exactSub = (num1 = 0, num2 = 0) => {
    return Decimal.sub(+num1, +num2).toNumber();
};

/**
 * 不丢失精度相乘
 * @param {number} num1
 * @param {number} num2
 */
export const exactMul = (num1 = 0, num2 = 0) => {
    return Decimal.mul(+num1, +num2).toNumber();
};

/**
 * 不丢失精度相除
 * @param {number} num1
 * @param {number} num2
 */
export const exactDiv = (num1 = 0, num2 = 0) => {
    return Decimal.div(+num1, +num2).toNumber();
};
