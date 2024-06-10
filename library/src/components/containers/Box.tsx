import React, { ElementType } from 'react';
import type { PolymorphicComponentProp } from '#/typings';

export type BoxProps<C extends ElementType = 'div'> = PolymorphicComponentProp<C>;

function Box<C extends ElementType = 'div'>({ $as, children, ...rest }: BoxProps<C>) {
  const Component = $as ?? 'div';
  return (
    <Component $as={$as} {...rest}>
      {children}
    </Component>
  );
}

export default Box;
