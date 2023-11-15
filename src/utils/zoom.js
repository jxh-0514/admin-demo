/*
 * @Descripttion:
 * @version:
 * @Author: 杭
 * @Date: 2022-10-22 10:23:40
 * @LastEditors: 杭
 * @LastEditTime: 2023-11-15 13:46:16
 */
// 适用leaflet动态改变zoom的方法  图片宽高，屏幕宽高
// export function lZoom(imgWidth, imgHeight, containerWidth, containerHeight) {
//   let zoom = -1;
//   //原图片宽高比例 大于 指定的宽高比例，这就说明了原图片的宽度必然 > 高度
//   if (imgWidth / imgHeight >= containerWidth / containerHeight) {
//     if (imgWidth > containerWidth) {
//       // 图片宽除以宽取整
//       zoom = -Math.floor(imgWidth / containerWidth);
//     } else {
//       zoom = Math.floor(containerWidth / imgWidth);
//     }
//   } else {
//     // 原图片的高度必然 > 宽度
//     if (imgHeight > containerHeight) {
//       // 图片高除以高取整
//       zoom = -Math.floor(imgHeight / containerHeight);
//     } else {
//       zoom = Math.floor(containerHeight / imgHeight);
//     }
//   }
//   return zoom;
// }
export function lZoom(imgWidth, imgHeight, containerWidth, containerHeight) {
  let zoom = 0;
  //原图片宽高比例 大于 指定的宽高比例，这就说明了原图片的宽度必然 > 高度
  if (imgWidth / imgHeight >= containerWidth / containerHeight) {
      if (imgWidth > containerWidth) {
          // 图片宽除以宽取整
          const num = imgWidth / containerWidth;
          // zoom = -Math.floor(num - 1);
          zoom = num > 1.4 ? -Math.round(num - 1) : -Math.round(num);
          console.log("1111-----", zoom, num);
      } else {
          const num = containerWidth / imgWidth;
          // zoom = -Math.round(num - 1);
          zoom = num > 1.4 ? -Math.round(num - 1) : -Math.round(num);
          console.log("2222-----", zoom, num);
      }
  } else {
      // 原图片的高度必然 > 高度
      if (imgHeight > containerHeight) {
          // 图片高除以高取整
          const num = imgHeight / containerHeight;
          zoom = -Math.round(num - 1);
          console.log("33333-----", zoom, num);
      } else {
          const num = containerHeight / imgHeight;
          zoom = -Math.round(num - 1);
          console.log("4444-----", zoom, num);
      }
  }
  return zoom;
}
