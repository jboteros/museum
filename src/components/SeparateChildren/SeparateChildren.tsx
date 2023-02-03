import React, { useMemo, ReactNode, Children, ComponentType } from 'react';
import { ViewProps } from 'react-native';

type Props = {
  children?: ReactNode;
  Separator: ComponentType<ViewProps>;
};

export function SeparateChildren({ children, Separator }: Props) {
  const component = useMemo(() => {
    if (children === null || children === undefined) {
      return null;
    }

    const childrenArray = Children.toArray(children);
    return childrenArray
      .filter(Boolean)
      .reduce<Array<ReactNode>>(
        (r, n, idx) =>
          idx < childrenArray.length - 1
            ? [...r, n, <Separator key={`separator-${idx}`} />]
            : [...r, n],
        [],
      );
  }, [Separator, children]);

  return <>{component}</>;
}
