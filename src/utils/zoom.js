/*
 * @Descripttion:
 * @version:
 * @Author: 杭
 * @Date: 2022-10-22 10:23:40
 * @LastEditors: 杭
 * @LastEditTime: 2023-05-26 23:22:35
 */
// 适用leaflet动态改变zoom的方法  图片宽高，屏幕宽高
export function lZoom(imgWidth, imgHeight, containerWidth, containerHeight) {
  let zoom = -1;
  //原图片宽高比例 大于 指定的宽高比例，这就说明了原图片的宽度必然 > 高度
  if (imgWidth / imgHeight >= containerWidth / containerHeight) {
    if (imgWidth > containerWidth) {
      // 图片宽除以宽取整
      zoom = -Math.floor(imgWidth / containerWidth);
    } else {
      zoom = Math.floor(containerWidth / imgWidth);
    }
  } else {
    // 原图片的高度必然 > 宽度
    if (imgHeight > containerHeight) {
      // 图片高除以高取整
      zoom = -Math.floor(imgHeight / containerHeight);
    } else {
      zoom = Math.floor(containerHeight / imgHeight);
    }
  }
  return zoom;
}
