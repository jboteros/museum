import React from 'react';
import { render } from '@testing-library/react-native';
import { Arrow } from './Arrow';

describe('tests => SectionTitle', () => {
  let component: any;

  beforeEach(() => {
    component = render(<Arrow direction="left" />);
  });

  it('should render Arrow', () => {
    expect(component.toJSON().props.style.transform[0].rotate).toEqual('90deg');
  });

  it('should match snapshot', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
