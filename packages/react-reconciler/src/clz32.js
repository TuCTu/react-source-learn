/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

// TODO: This is pretty well supported by browsers. Maybe we can drop it.

export const clz32: (x: number) => number = Math.clz32
  ? Math.clz32
  : clz32Fallback;

// Count leading zeros.
// Based on:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32
const log = Math.log;
const LN2 = Math.LN2;
function clz32Fallback(x: number): number {
  // 将输入转换为 32 位无符号整数
  const asUint = x >>> 0;

  // 如果输入为 0 直接返回 32 （因为所有位都是 0）
  if (asUint === 0) {
    return 32;
  }

  // 计算前导零的数量
  // 1. log(asUint)：计算 asUint 的自然对数（以 e 为底）。
  // 2. log(asUint) / LN2：将自然对数转换为以 2 为底的对数，即 log2(asUint)。
  // 3. ((log(asUint) / LN2) | 0)：对结果取整，得到最高有效位的指数（即最高有效位的位置）。
  // 4. 31 - ...：最高有效位的位置从 0 开始计数，所以用 31 减去它，得到前导零的数量。
  // 5. | 0：确保结果为整数。

  // 数学原理
  // 一个 32 位无符号整数的最高有效位可以通过 log2(x) 计算出来
  // 前导零的数量 = 31 - floor(log2(x)) 因为：
  // log2(x) 表示最高有效位的位置（从 0 开始计数）
  // 例如，log2(8) = 3，因为 8 的二进制是 1000，最高有效位是第 3 位（从右到左）
  // 31 - 3 = 28，表示前导零的数量是 28（00000000 00000000 00000000 00001000）
  return (31 - ((log(asUint) / LN2) | 0)) | 0;
}
