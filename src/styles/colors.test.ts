import { colors } from './colors';

describe('colors hexadecimal blackMask', () => {
  it('snowMask 0%', () => {
    expect(colors.alphaColor(colors.black, 0.0)).toEqual('rgba(25,25,25,0)');
  });
  it('snowMask 25%', () => {
    expect(colors.alphaColor(colors.black, 0.25)).toEqual(
      'rgba(25,25,25,0.25)',
    );
  });
  it('snowMask 50%', () => {
    expect(colors.alphaColor(colors.black, 0.5)).toEqual('rgba(25,25,25,0.5)');
  });
  it('snowMask 75%', () => {
    expect(colors.alphaColor(colors.black, 0.75)).toEqual(
      'rgba(25,25,25,0.75)',
    );
  });
  it('snowMask 100%', () => {
    expect(colors.alphaColor(colors.black, 1)).toEqual('rgba(25,25,25,1)');
  });
});

describe('colors hexadecimal primary', () => {
  it('primary 0%', () => {
    expect(colors.alphaColor(colors.primary, 0.0)).toEqual('rgba(181,9,56,0)');
  });
  it('primary 25%', () => {
    expect(colors.alphaColor(colors.primary, 0.25)).toEqual(
      'rgba(181,9,56,0.25)',
    );
  });
  it('primary 50%', () => {
    expect(colors.alphaColor(colors.primary, 0.5)).toEqual(
      'rgba(181,9,56,0.5)',
    );
  });
  it('primary 75%', () => {
    expect(colors.alphaColor(colors.primary, 0.75)).toEqual(
      'rgba(181,9,56,0.75)',
    );
  });
  it('primary 100%', () => {
    expect(colors.alphaColor(colors.primary, 1)).toEqual('rgba(181,9,56,1)');
  });
});

describe('colors rgba accentPrimary', () => {
  it('blueMask 0%', () => {
    expect(colors.alphaColor(colors.accentPrimary, 0.0)).toEqual(
      'rgba(181,9,56,0)',
    );
  });
  it('blueMask 25%', () => {
    expect(colors.alphaColor(colors.accentPrimary, 0.25)).toEqual(
      'rgba(181,9,56,0.25)',
    );
  });
  it('blueMask 50%', () => {
    expect(colors.alphaColor(colors.accentPrimary, 0.5)).toEqual(
      'rgba(181,9,56,0.5)',
    );
  });
  it('blueMask 75%', () => {
    expect(colors.alphaColor(colors.accentPrimary, 0.75)).toEqual(
      'rgba(181,9,56,0.75)',
    );
  });
  it('blueMask 100%', () => {
    expect(colors.alphaColor(colors.accentPrimary, 1)).toEqual(
      'rgba(181,9,56,1)',
    );
  });
});

describe('colors rgba accentPrimaryLight', () => {
  it('blueMask 0%', () => {
    expect(colors.alphaColor(colors.accentPrimaryLight, 0.0)).toEqual(
      'rgba(181,9,56,0)',
    );
  });
  it('blueMask 25%', () => {
    expect(colors.alphaColor(colors.accentPrimaryLight, 0.25)).toEqual(
      'rgba(181,9,56,0.25)',
    );
  });
  it('blueMask 50%', () => {
    expect(colors.alphaColor(colors.accentPrimaryLight, 0.5)).toEqual(
      'rgba(181,9,56,0.5)',
    );
  });
  it('blueMask 75%', () => {
    expect(colors.alphaColor(colors.accentPrimaryLight, 0.75)).toEqual(
      'rgba(181,9,56,0.75)',
    );
  });
  it('blueMask 100%', () => {
    expect(colors.alphaColor(colors.accentPrimaryLight, 1)).toEqual(
      'rgba(181,9,56,1)',
    );
  });
});

describe('colors hexadecimal without accentPrimary', () => {
  it('accentPrimary 100%', () => {
    expect(colors.alphaColor(colors.accentPrimary)).toEqual('rgba(181,9,56,1)');
  });
});
