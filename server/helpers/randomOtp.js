function randomOtp() {
  let newOtp = "";
  const listRandomOtp = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
  ];
  for (let i = 0; i < 6; i++) {
    newOtp += listRandomOtp[Math.floor(Math.random() * listRandomOtp.length)];
  }
  return newOtp;
}

module.exports = randomOtp;
