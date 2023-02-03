import React from 'react';
import renderer from 'react-test-renderer';

import { withDefaultStyle, AppText, textStyles } from './AppText';

describe('AppText', () => {
  it('withDefaultStyle exist', () => {
    expect(withDefaultStyle).toBeDefined();
  });

  it('renders correctly', () => {
    const tree = renderer.create(<AppText>AppText Component</AppText>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('AppText text value', async () => {
    const TextComponent = <AppText.Headline1>base text</AppText.Headline1>;

    expect(TextComponent.props.children).toEqual('base text');
  });
  it('withDefaultStyle equal to component', async () => {
    const TextComponent = withDefaultStyle(textStyles.headline1, AppText);
    const cA = renderer.create(
      <AppText.Headline1>base text</AppText.Headline1>,
    );
    const cB = renderer.create(<TextComponent>base text</TextComponent>);

    expect(cA.toJSON()).toEqual(cB.toJSON()); // OK
  });
});
