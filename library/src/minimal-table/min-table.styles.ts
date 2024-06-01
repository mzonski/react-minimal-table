import { CSSProperties } from 'react';
import styled from 'styled-components';

import { colorMixin, fontSizeMixin, spacingMixin } from '../theme/theme.mixins';

import type { FixedLayoutTableProps, FluidLayoutTableProps } from './types';

export const CommonLayoutContainer = styled.table`
  box-sizing: border-box;
  border-collapse: collapse;

  ${colorMixin('bgColor', 'light')}
`;

export const FixedLayoutContainer = styled.table<Pick<FixedLayoutTableProps, 'width'>>`
  width: ${(props) => `${props.width}px`};
  box-sizing: border-box;
  border-collapse: collapse;

  ${spacingMixin('padding', 'large', ['all'])}
`;

export const FluidLayoutContainer = styled.div<Pick<FluidLayoutTableProps, 'maxWidth' | 'minWidth'>>`
  width: 100%;
  min-width: ${(props) => (props.minWidth ? `${props.minWidth}px` : 'auto')};
  max-width: ${(props) => (props.maxWidth ? `${props.maxWidth}px` : '100%')};

  box-sizing: border-box;

  ${spacingMixin('margin', 'small', ['all'])}
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

export const StyledCaption = styled.caption`
  text-align: left;
  caption-side: top;
  font-weight: bold;

  ${spacingMixin('margin', 'large', ['bottom'])}
  ${fontSizeMixin('large')}
`;

export const StyledColGroup = styled.colgroup``;

export const StyledCol = styled.col`
  // background-color: red;
`;

export const StyledThead = styled.thead`
  background-color: lightblue;
`;

export const StyledTbody = styled.tbody`
  background-color: lightsalmon;
`;

export const StyledTfoot = styled.tfoot``;

export const StyledTr = styled.tr`
  &:nth-child(4) td {
    border-bottom: 2px solid ${(props) => props.theme.colors.gray};
  }

  &.selected {
    ${colorMixin('bgColor', 'light')}
  }
`;

export const StyledTh = styled.th<Pick<CSSProperties, 'textAlign'>>`
  border-bottom: 2px solid ${(props) => props.theme.colors.gray};
  text-align: ${({ textAlign = 'right' }) => textAlign};
  font-weight: bold;
  cursor: pointer;

  ${spacingMixin('padding', 'medium', ['all'])}
  ${colorMixin('color', 'text')}
`;

export const StyledTd = styled.td<Pick<CSSProperties, 'textAlign'>>`
  text-align: ${({ textAlign = 'right' }) => textAlign};
  border-bottom: 1px solid ${(props) => props.theme.colors.gray};

  ${spacingMixin('padding', 'medium', ['all'])}
  ${colorMixin('color', 'text')}
`;

export const ServiceLabel = styled.div`
  border-radius: 4px;
  font-weight: bold;
  text-align: center;

  ${spacingMixin('padding', 'small', ['all'])}
  ${colorMixin('color', 'neutral')}



  &.mc {
    ${colorMixin('bgColor', 'primary')}
  }

  &.rn {
    ${colorMixin('bgColor', 'neutral')}
    ${colorMixin('color', 'dark')}
  }

  &.rm {
    ${colorMixin('bgColor', 'secondary')}
  }

  &.af {
    ${colorMixin('bgColor', 'yellow')}
    ${colorMixin('color', 'dark')}
  }
`;

export const SectionHeader = styled.div`
  font-weight: bold;

  ${spacingMixin('padding', 'medium', ['top', 'bottom'])}
  ${colorMixin('color', 'text')}
`;

export const TotalRow = styled.tr`
  font-weight: bold;

  ${colorMixin('color', 'text')}
`;
