import type { Property } from 'csstype';
import styled from 'styled-components';

import { borderMixin, colorMixin, spacingMixin } from '#/theme';
import type { PrefixPropsWithDolar } from '#/typings';

import type { FixedLayoutTableProps, FluidLayoutTableProps } from './types';

export const CommonLayoutContainer = styled.div`
  ${colorMixin('bgColor', 'white')}
  ${borderMixin('small', 'all', true)}
`;

export const FixedLayoutContainer = styled(CommonLayoutContainer)<Pick<FixedLayoutTableProps, '$width'>>`
  width: ${(props) => `${props.$width}`};
`;

export const FluidLayoutContainer = styled(CommonLayoutContainer)<
  Pick<FluidLayoutTableProps, '$maxWidth' | '$minWidth'>
>`
  width: 100%;
  min-width: ${(props) => (props.$minWidth ? `${props.$minWidth}px` : 'auto')};
  max-width: ${(props) => (props.$maxWidth ? `${props.$maxWidth}px` : '100%')};
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  overflow: hidden;

  tbody {
    tr {
      &:nth-child(odd) {
        ${colorMixin('bgColor', 'grey100')}
      }

      &:hover {
        ${colorMixin('bgColor', 'grey200')}
      }
    }
  }
`;

export const StyledCaption = styled.caption<{ $side: Property.CaptionSide }>`
  text-align: left;
  font-weight: bold;
  caption-side: ${(props) => props.$side};
`;

export const StyledTr = styled.tr``;

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
