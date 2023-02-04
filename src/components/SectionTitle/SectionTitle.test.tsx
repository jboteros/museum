import React from 'react';
import { render } from '@testing-library/react-native';
import { SectionTitle } from './SectionTitle';

describe('tests => SectionTitle', () => {
  let component: any;

  beforeEach(() => {
    component = render(<SectionTitle title="This is a title value" />);
  });

  it('should render SectionTitle', () => {
    component.getByText('This is a title value');
  });

  it('should match snapshot', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
