const xpSettings = {
  1: 50,
  2: 250,
  3: 550,
  4: 850,
  5: 1250,
  6: 1550,
  7: 1850,
  8: 2105,
  9: 2410,
  10: 2715,
  11: 3015,
  12: 3315,
  13: 3615,
  14: 3915,
  15: 4215,
  16: 4515,
  17: 4815,
  // A progressão continua até o nível desejado.
};

module.exports = (level) => {
  return xpSettings[level] || 1000;
};
