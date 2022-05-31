// import art from "ascii-art";

// art.image(
//   {
//     src: ".\\assests\\1.png",
//     alphabet: "blocks",
//   },
//   () => {
//     console.log("yay");
//   }
// );

// import img2ascii from "image-to-ascii";

// // Convert an octocat into ascii :)
// img2ascii(".\\1.jpg", function (err, result) {
//   console.log(result);
// });
// import art from "ascii-art";
// art.image(
//   {
//     src: ".\\1.jpg",
//     rows: 80,
//     cols: 80,
//     stipple: "#000000",
//     posterize: true,
//     threshold: 40,
//   },
//   (err, rendered) => {
//     console.log(rendered || err);
//   }
// );

import Image from "ascii-art-image";

new Image({
  filepath:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
  alphabet: "variant4",
}).write(function (err, rendered) {
  console.log(rendered);
});
// art.image(
//   {
//     src: "1.jpg",
//     rows: 80,
//     cols: 80,
//     stipple: "#000000",
//     posterize: true,
//     threshold: 40,
//   },
//   (err, rendered) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(rendered);
//     }
//   }
// );
