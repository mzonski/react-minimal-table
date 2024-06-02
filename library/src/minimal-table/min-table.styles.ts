import type { Property } from 'csstype';
import { CSSProperties } from 'react';
import styled from 'styled-components';

import { borderMixin, colorMixin, spacingMixin } from '#/theme';

import type { FixedLayoutTableProps, FluidLayoutTableProps } from './types';

export const CommonLayoutContainer = styled.div`
  ${colorMixin('bgColor', 'white')}
  ${borderMixin('small', 'all', true)}
`;

export const FixedLayoutContainer = styled(CommonLayoutContainer)<Pick<FixedLayoutTableProps, 'width'>>`
  width: ${(props) => `${props.width}`};
`;

export const FluidLayoutContainer = styled(CommonLayoutContainer)<Pick<FluidLayoutTableProps, 'maxWidth' | 'minWidth'>>`
  width: 100%;
  min-width: ${(props) => (props.minWidth ? `${props.minWidth}px` : 'auto')};
  max-width: ${(props) => (props.maxWidth ? `${props.maxWidth}px` : '100%')};
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  tr:nth-child(odd) {
    background-color: ${(props) => props.theme.colors.grey100};
  }
`;

export const StyledCaption = styled.caption<{ side: Property.CaptionSide }>`
  text-align: left;
  font-weight: bold;
  caption-side: ${(props) => props.side};
`;

export const StyledColGroup = styled.colgroup``;

export const StyledCol = styled.col`
  // background-color: red;
`;

export const StyledThead = styled.thead`
  // background-color: lightblue;
`;

export const StyledTbody = styled.tbody`
  // background-color: lightsalmon;
`;

export const StyledTfoot = styled.tfoot``;

export const StyledTr = styled.tr`
  &.selected {
    ${colorMixin('bgColor', 'grey200')}
  }
`;

export const StyledTh = styled.th<Pick<CSSProperties, 'textAlign'>>`
  border-bottom: 2px solid ${(props) => props.theme.colors.grey500};
  text-align: ${({ textAlign = 'right' }) => textAlign};
  font-weight: bold;
  cursor: pointer;

  ${spacingMixin('padding', 'medium', ['all'])}
`;

export const StyledTd = styled.td<Pick<CSSProperties, 'textAlign'>>`
  text-align: ${({ textAlign = 'right' }) => textAlign};
  border-bottom: 1px solid ${(props) => props.theme.colors.grey500};

  ${spacingMixin('padding', 'medium', ['all'])}
`;

export const ServiceLabel = styled.div`
  border-radius: 4px;
  font-weight: bold;
  text-align: center;

  ${spacingMixin('padding', 'small', ['all'])}
`;

export const SectionHeader = styled.div`
  font-weight: bold;
`;

export const TotalRow = styled.tr`
  font-weight: bold;
`;
