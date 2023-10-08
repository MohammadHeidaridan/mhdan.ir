import { Background } from "./Elements/Background";
import { MyResume } from "./Elements/MyResume";
import { ThreeDPlatform } from "./Elements/ThreeDPlatform";
import { setScreenArrayElements } from "./HelpersAndGlobals";


export function MhdanIRApp() {

  // we dont put this two parts inside of useEffect because MhdanIRApp doesn't have any useState and and this part runs only ones
  setScreenArrayElements();
  window.addEventListener("resize", () =>  setScreenArrayElements())

  return <>
    <Background />
    <MyResume />
    {/* <ThreeDPlatform /> */}
  </>;
}
