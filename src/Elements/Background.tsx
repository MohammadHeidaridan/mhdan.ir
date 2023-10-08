import { useEffect, useState } from 'react';
import { ScreenRows, ScreenColumns } from "../HelpersAndGlobals";

var Chars: string[] = ["[", "]", "{", "}", "=", "+", "-", "~", "_", ";", ":", "*", "/", ".", "?", ",", "!", "@", "#", "$", "%", "^", "(", ")"], CharsLength: number = Chars.length;

function getThePosition(x: number, y: number) {
  if (x >= ScreenColumns) {
    x = 0;
  } else if (x < 0) {
    x = ScreenColumns - 1;
  }

  if (y >= ScreenRows) {
    y = 0;
  } else if (y < 0) {
    y = ScreenRows - 1;
  }

  return (ScreenColumns + 1) * y + x;
}

function getRandCharacter() {
  return Chars[Math.floor(Math.random() * CharsLength)];
}

function initialGameOfLife() {

  // get the actual font size
  let theGameOfLife = "";

  for (let row = 1; row <= ScreenRows; row++) {

    let theGameOfLifeCol = '';
    for (let column = 1; column <= ScreenColumns; column++) {

      let posbility = Math.floor(Math.random() * 99) + 1;
      theGameOfLifeCol += posbility >= 1 && posbility <= 13 ? getRandCharacter() : " ";
    }
    theGameOfLife += theGameOfLifeCol + "\n";
  }

  return theGameOfLife;
}

function updateGameOfLife(GameOfLife: string) {

  // see https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
  let GameOfLifeArray = GameOfLife.split("");

  // get a copy from GameOfLifeArray
  let GameOfLifeNewArray = GameOfLifeArray.slice(0);

  for (let row = 0; row <= (ScreenRows - 1); row++) {
    for (let column = 0; column <= (ScreenColumns - 1); column++) {

      let live = 0;

      if (GameOfLifeArray[getThePosition(column + 1, row)] !== " ") live++;
      if (GameOfLifeArray[getThePosition(column - 1, row)] !== " ") live++;
      if (GameOfLifeArray[getThePosition(column, row + 1)] !== " ") live++;
      if (GameOfLifeArray[getThePosition(column + 1, row + 1)] !== " ") live++;
      if (GameOfLifeArray[getThePosition(column - 1, row + 1)] !== " ") live++;
      if (GameOfLifeArray[getThePosition(column, row - 1)] !== " ") live++;
      if (GameOfLifeArray[getThePosition(column + 1, row - 1)] !== " ") live++;
      if (GameOfLifeArray[getThePosition(column - 1, row - 1)] !== " ") live++;

      // rules
      if (live === 2 && GameOfLifeArray[getThePosition(column, row)] !== " ") {
        GameOfLifeNewArray[getThePosition(column, row)] = getRandCharacter();
      } else if (live === 3) {
        GameOfLifeNewArray[getThePosition(column, row)] = getRandCharacter();
      } else {
        GameOfLifeNewArray[getThePosition(column, row)] = " ";
      }
    }
  }

  return GameOfLifeNewArray.join("");
}

export function Background() {

  // start the game of life
  const [GameOfLife, setGameOfLife] = useState("");

  // for when window is resized
  // and first GameOfLife
  useEffect(() => {
    setGameOfLife(initialGameOfLife())
    window.addEventListener('resize', () => setGameOfLife(initialGameOfLife()))
  }, []);

  // update #GameOfLife
  useEffect(() => {
    const UpdateGameOfLifeInterVal = setInterval(() => setGameOfLife(updateGameOfLife(GameOfLife)), 100);
    return () =>  clearInterval(UpdateGameOfLifeInterVal) ;
  }, [GameOfLife]);

  return <pre id="GameOfLife" className="WholeScreen">{GameOfLife}</pre>;
};
