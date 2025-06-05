/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {ReactDebugInfo} from './ReactTypes';

export type ReactElement = {
  // 用于安全目的的符号
  $$typeof: any,
  // 字符串（用于 DOM 元素）或函数/类（用于组件）
  type: any,
  // 可选的唯一标识符，帮助 React 在协调期间识别元素
  key: any,
  // 访问实际 DOM 节点或组件实例的可选引用
  ref: any,
  // 包含此元素的属性和子元素的对象
  props: any,
  // __DEV__ or for string refs
  _owner: any,

  // __DEV__
  _store: {validated: 0 | 1 | 2, ...}, // 0: not validated, 1: validated, 2: force fail
  _debugInfo: null | ReactDebugInfo,
  _debugStack: Error,
  _debugTask: null | ConsoleTask,
};
