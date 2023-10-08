import Circle from "./Elements/ThreeDPlatform Shapes/Circle";

// Global variables we use in components
export var ActualFontSize: { width: number, height: number }, ScreenRows: number, ScreenColumns: number;

// Global variables we use in 3D component
export interface Coordinates { x: number, y: number, z: number, }
export var Shapes: Circle[] = [], ShapeSizeLimit: number, EyePosition: Coordinates, A_Platform: string[], Speed: number = 10, PIInDegree: number = Math.PI / 180, SpeedTime: number = 100;

// copied from 3d donut :)
// https://www.dropbox.com/s/79ga2m7p2bnj1ga/donut_deobfuscated.c?dl=0
export var DisChars: string[] = [".", ",", "-", "~", ":", ";", "=", "!", "*", "#", "$", "@"], DisCharsLength: number = DisChars.length;

export function setShapes(VShapes: Circle[]) {
    Shapes = VShapes;
}

export function setShapeSizeLimit(VShapeSizeLimit: number) {
    ShapeSizeLimit = VShapeSizeLimit;
}

export function setEyePosition(VEyePosition: Coordinates) {
    EyePosition = VEyePosition;
}

export function setA_Platform() {
    // set Platform array
    let Temp = "";
    for (let row = 1; row <= ScreenRows; row++) {
        for (let column = 1; column <= ScreenColumns; column++) {
            Temp += " ";
        }
        Temp += "\n";
    }
    A_Platform = Temp.split("");
}

export function setScreenArrayElements() {
    const PT = document.createElement("pre");
    PT.innerText = "1"; // Character to measure
    PT.style.fontFamily = "monospace";
    PT.style.fontSize = "10px";
    PT.style.position = "absolute";
    PT.style.visibility = "hidden";

    document.body.appendChild(PT);

    const rect = PT.getBoundingClientRect();
    document.body.removeChild(PT);

    // set global vars
    ActualFontSize = {
        width: rect?.width ?? 5.5,
        height: rect?.height ?? 11.2
    };
    ScreenRows = Math.round(window.innerHeight / ActualFontSize.height);
    ScreenColumns = Math.round(window.innerWidth / ActualFontSize.width);
}

export function chooseRandom(max: number, min: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getCharBasedOnZ(z: number, r: number) {
    return DisChars[Math.floor(z * DisCharsLength / r)];
}

