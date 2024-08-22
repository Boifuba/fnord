const xpSettings = {
  1: 250,
  2: 500,
  3: 900,
  4: 1500,
  5: 3200,
  6: 5000,
  7: 9600,
  8: 19200,
  9: 38400,
  10: 76800,
  11: 153600,
  12: 307200,
  13: 614400,
  14: 1228800,
  15: 2457600,
  16: 4915200,
  17: 9830400,

  // A progressão continua até o nível desejado.
};

module.exports = (level) => {
  return xpSettings[level] || 1000;
};
