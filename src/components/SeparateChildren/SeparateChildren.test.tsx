import React from 'react';
import { render } from '@testing-library/react-native';
import { SeparateChildren } from './SeparateChildren';
import { View } from 'react-native';

describe('tests => SeparateChildren', () => {
  // eslint-disable-next-line react-native/no-inline-styles
  const Separator = () => <View testID="separator" style={{ height: 10 }} />;

  it('should render SeparateChildren', () => {
    const component = render(
      <SeparateChildren Separator={() => <Separator />}>
        <View testID="contentChildren" />
        <View testID="contentChildren" />
        <View testID="contentChildren" />
      </SeparateChildren>,
    );
    expect(component.getAllByTestId('separator').length).toEqual(2);
    expect(component.getAllByTestId('contentChildren').length).toEqual(3);
  });

  it('should render with undefined children', () => {
    const component = render(
      // eslint-disable-next-line react/self-closing-comp
      <SeparateChildren Separator={() => <Separator />}></SeparateChildren>,
    );

    expect(component.container.props.children).toBe(undefined);
  });

  it('should render with null children', () => {
    const component = render(
      <SeparateChildren Separator={() => <Separator />}>
        {null}
      </SeparateChildren>,
    );

    expect(component.container.props.children).toBe(null);
  });

  it('should match snapshot', () => {
    const component = render(
      <SeparateChildren Separator={() => <Separator />}>
        {null}
      </SeparateChildren>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
