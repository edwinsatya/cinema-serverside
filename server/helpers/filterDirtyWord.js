const Filter = require("bad-words");

function filterDirtyWord(sentence) {
  let words = sentence.split(" ");
  let reg = /^[A-za-z0-9]+$/m;
  filter = new Filter({ placeHolder: "🐶" });
  let arrIndoBad = [
    "kontol",
    "k0ntol",
    "k0nt0l",
    "tempek",
    "memek",
    "jancok",
    "janc0k",
    "j4nc0k",
    "j4ncok",
    "taek",
  ];
  filter.addWords(...arrIndoBad);

  words.forEach((el, index) => {
    if (reg.test(el)) {
      words[index] = filter.clean(el);
    }
  });

  return words.join(" ");
}

module.exports = filterDirtyWord;
