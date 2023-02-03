import { NormalizeFontSize } from './NormalizeFontSize';

describe('Normalize font size based on screen height', () => {
  it('normalize 20 to 15, with standard height', () => {
    expect(NormalizeFontSize(20, 1792)).toEqual(15);
  });
  it('normalize 20 to 32, no standard height', () => {
    expect(NormalizeFontSize(20)).toEqual(32);
  });
});
