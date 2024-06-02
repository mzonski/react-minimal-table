import { isNumber, isString } from 'lodash';

import type { ValidSizeFormat } from '../typings';

import { DEFAULT_FONT_SIZE } from './theme.const';

// TODO: check also if previx is number
const isValueSizePx = (str: string): str is ValidSizeFormat => str.endsWith('px');
const isValueSizeRem = (str: string): str is ValidSizeFormat => str.endsWith('rem');

const isValueSizeEm = (str: string): str is ValidSizeFormat => str.endsWith('em') && !isValueSizeRem(str);

// TODO: better to use regex, but need to fix it
// const isValueSizeRem = (str: string) => {
//   const remPattern = /^\d*\.?\d+rem$/;
//   return remPattern.test(str);
// };

export const valueToRem = (checkValue: number | string, baseFontSize: number = DEFAULT_FONT_SIZE): ValidSizeFormat => {
  let value = checkValue;
  if (value === 0 || value === '0') return '0';

  if (isString(value)) {
    if (isValueSizeRem(value)) {
      return value;
    }

    if (isValueSizePx(value)) {
      value = parseFloat(value);
    } else {
      throw new Error('Value must be in px or rem');
    }
  }

  return `${value / baseFontSize}rem`;
};

export const remToPx = (checkValue: number | string, baseFontSize: number = DEFAULT_FONT_SIZE): ValidSizeFormat => {
  let value = checkValue;
  if (value === 0 || value === '0') return '0';

  if (isString(value)) {
    if (isValueSizeRem(value)) {
      value = parseFloat(value) * baseFontSize;
      return `${value}px`;
    }

    if (isValueSizePx(value)) {
      return value;
    }
    throw new Error('Value must be in px or rem');
  }

  return `${value}px`;
};

export const convertToNumber = (value: ValidSizeFormat | number): number => {
  if (isNumber(value)) {
    return value;
  }

  if (isString(value)) {
    if (isValueSizeRem(value) || isValueSizeEm(value) || isValueSizePx(value)) {
      return parseFloat(value);
    }
    throw new Error('Value must be in px, rem, or em');
  }

  throw new Error('Value must be a string or a number');
};
