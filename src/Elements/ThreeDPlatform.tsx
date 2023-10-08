import { useState, useEffect } from "react";
import { Shapes, setEyePosition, setShapeSizeLimit, setShapes, setA_Platform, A_Platform, chooseRandom, SpeedTime } from "../HelpersAndGlobals";
import Circle from "./ThreeDPlatform Shapes/Circle";

function intialPlartform() {
  setShapeSizeLimit((window.innerWidth >= window.innerHeight ? window.innerHeight : window.innerWidth) / 3);
  setEyePosition({ x: window.innerWidth / 2, y: window.innerHeight / 2, z: window.innerHeight + 100 });
  setA_Platform();

  // set and select shapes
  setShapes([]);
  let shapeTypes = [Circle];
  let shapeQuantity = 3;

  while (shapeQuantity) {

    // choose the shape
    let Shape = new shapeTypes[Math.floor(Math.random() * shapeTypes.length)]();

    // create the shape
    if (Shape.createShape()) {
      Shapes.push(Shape);
      Shape.directionAngle = {xy : chooseRandom(360, 0) , xz:chooseRandom(360, 0)};
      // Shape.setCollisions();
      shapeQuantity--;
    }
  }
  
  // the shape has bigger z must show first!
  Shapes.sort((a, b) => b.z - a.z);
  for (const Shape of Shapes) Shape.draw();

  return A_Platform.join("");
}

function updatePlartform() {

  // empty the platform
  setA_Platform();

  // the shape has bigger z must show first!
  Shapes.sort((a, b) => b.z - a.z);

  for (const Shape of Shapes) {
    Shape.changeCenterPosition();
    Shape.draw();
  }

  return A_Platform.join("");
}

export function ThreeDPlatform() {

  // if we intial platform like this its cause bug when we wnat to update platform in setInterval
  // const [Platform, setPlatform] = useState(intialPlartform());

  // for three d platform
  const [Platform, setPlatform] = useState("");

  useEffect(() => {
    setPlatform(intialPlartform());
    window.addEventListener('resize', () => setPlatform(intialPlartform()))
  }, []);

  // update Platform
  useEffect(() => {
    const UpdatePlatformInterVal = setInterval(() => setPlatform(updatePlartform()), SpeedTime);
    return () => clearInterval(UpdatePlatformInterVal);
  }, [Platform]);

  //================================ Wlecome element ================================\\

  // for remove welcome element
  const [WelcomeVisible, setWelcomeVisible] = useState(true);
  const handleWelcomeClick = () => setWelcomeVisible(false);

  // for type animation
  const typeIntotElementAnimation = (element: HTMLElement | null, text: string) => {
    let charIndex = 0;
    let outputText = "";

    function typeNextChar() {
      outputText += text.charAt(charIndex);
      if (element) element.textContent = outputText;
      charIndex++;
      if (charIndex < text.length) setTimeout(typeNextChar, 50);
    }
    typeNextChar();
  }

  useEffect(() => {
    let WelcomeText: string[] = ["Hello, Wrold!", "(In the name of love.)", "(And because coding is so enjoyable!)"];
    typeIntotElementAnimation(document.querySelector('#WelcomeToMyWebSite div'), WelcomeText[0]);

    // for delay
    setTimeout(() => typeIntotElementAnimation(document.querySelector('#WelcomeToMyWebSite small:nth-child(2)'), WelcomeText[1]), 50 * WelcomeText[0].length + 250);
    setTimeout(() => typeIntotElementAnimation(document.querySelector('#WelcomeToMyWebSite small:nth-child(4)'), WelcomeText[2]),
      50 * (WelcomeText[0].length + WelcomeText[1].length) + 450);
  }, []);

  return <>
    <pre id="ThreeDPlatform" className="WholeScreen">{Platform}</pre>
    {/* {WelcomeVisible && (
      <pre id="WelcomeToMyWebSite" className="WholeScreen" onClick={handleWelcomeClick}>
        <div></div><small></small><br/><small></small>
      </pre>
    )} */}
  </>
}