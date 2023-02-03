export const colors = {
  black: '#191919',
  white: '#FFFFFF',
  primary: '#b50938',
  primaryLight: '#ed4d62',
  primaryDark: '#7e0013',
  silver: '#dedede',
  silverDark: '#767676',

  accentPrimary: 'rgba(181,9,56,1)',
  accentPrimaryLight: 'rgb(181,9,56)',

  alphaColor: (color: string, alpha: number | undefined = 1) => {
    if (color.includes('rgba')) {
      return color.replace(/[\d.]+\)$/g, `${alpha})`);
    }

    if (color.includes('rgb')) {
      return color.replace(/rgb/i, 'rgba').replace(/\)/i, `,${alpha})`);
    }

    color = color.toUpperCase();

    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    return `rgba(${r},${g},${b},${alpha})`;
  },
};
