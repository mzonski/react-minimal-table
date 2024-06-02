import React, { PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';
import { borderMixin, colorMixin, spacingMixin, textTypographyMixin } from '#/theme';
import { ThemeBorderSizes, ThemeColors } from '#/typings';

export type BadgeProps = PropsWithChildren & {
  $bgColor: ThemeColors;
  $color: ThemeColors;
  $border?: ThemeBorderSizes;
  $dense?: boolean;
};

const StyledBadge = styled.span<BadgeProps>`
  overflow: hidden;
  ${(props) => {
    return css`
      ${colorMixin('bgColor', props.$bgColor)}
      ${colorMixin('color', props.$color)}
      ${borderMixin(props.$border || 'small', 'all', true)}
      ${spacingMixin('padding', props.$dense ? 'small' : 'medium', ['horizontal'])}
      ${spacingMixin('padding', props.$dense ? 'tiny' : 'small', ['vertical'])}
      ${textTypographyMixin('md', 'medium')}
    `;
  }}
`;

function Badge({ children, ...props }: BadgeProps) {
  return <StyledBadge {...props}>{children}</StyledBadge>;
}

export default Badge;
