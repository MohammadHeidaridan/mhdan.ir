import { A_Platform, ActualFontSize, EyePosition, PIInDegree, ScreenColumns, ScreenRows, ShapeSizeLimit, Shapes, Speed, chooseRandom, getCharBasedOnZ } from "../../HelpersAndGlobals";

export default class Circle {

    // center
    x: number = 0;
    y: number = 0;
    z: number = 0;

    // shape sizes
    radius: number = 0;

    // for movement
    directionAngle: { xy: number, xz: number } = { xy: 0, xz: 0 };
    // collision: { x: number, y: number, z: number, nextDirectionAngle: { xy: number, xz: number } } | null = null;

    // setCollisions() {

    //     let collisions: { x: number, y: number, z: number, nextDirectionAngle: { xy: number, xz: number } }[] = [];

    // first get collisions with six sides of enviroment
    // in the first place
    // the mathematical relationship that I discovered 3D axis
    // is this

    // when we have the angle of point in xy and xz axis
    // or more complete we have two points
    // mathematical relationship is like this

    // y = ((y2-y1) / (x2-x1)) * x + x0
    // z = ((z2-z1) / (x2-x1)) * x + x0

    // or 
    // y = tan(xy) * x + x0
    // z = tan(xz) * x + x0

    // and other states
    // x = ((x2-x1) / (y2-y1)) * y + y0
    // z = ((z2-z1) / (y2-y1)) * y + y0

    // and so on ...

    // in second place 
    // we get collision with roof and floor (y = 0 for roof and y = windows.innerHeight for floor)
    // The collision equation is this
    // (s) means coordinates of that side
    // (c) means coordinates of center of circle when collision happened
    //  this.getShapeDistanceOnPerimeter() (which means this.radius) = Math.sqrt((x(s) - x(c)) ** 2 + (y(s) - y(c)) ** 2 + (z(s) - z(c)) ** 2)
    // in this equation x(s) equals to x(c) and z(s) equals to x(c) so
    // this.radius = Math.sqrt((y(s) - y(c)) ** 2)
    // y(s) equals to 0 for roof! 
    // and y(c) = tan(xy) * x(c) + x0 so (we assume tan(xy) as a)
    // this.radius = Math.sqrt((ax(c) + x0) ** 2)
    // we do math and ...
    // x(c) = (this.radius - x0) / a
    // i dont know why :|, but here we use  (this.radius + x0) / a
    // so

    // roof
    // if (this.directionAngle.xy > 0 && this.directionAngle.xy < 180) {

    //     let Xc = this.directionAngle.xy === 90 ? this.x : (this.radius + this.x) / Math.tan(this.directionAngle.xy * PIInDegree)

    //     if (Xc >= this.radius && Xc <= window.innerWidth - this.radius) {

    //         let Yc = 0;

    //         let Zc;
    //         if (this.directionAngle.xz === 90) {
    //             Zc = window.innerHeight;
    //         } else if (this.directionAngle.xz === 270) {
    //             Zc = 0;
    //         } else {
    //             Zc = Math.tan(this.directionAngle.xz * PIInDegree) * Xc + this.x
    //         }

    //         collisions.push({ x: Xc, y: Yc, z: Zc, nextDirectionAngle: { xy: 360 - this.directionAngle.xy, xz: this.directionAngle.xz } });
    //     }
    // }

    // this.collision = collisions[0]
    // }

    // COT means center of target
    getShapeDistanceOnPerimeter(COTx: number = 0, COTy: number = 0, COTz: number = 0): number {
        return this.radius;
    }

    claculateNextCenterPosition(): number[] {
        let y = this.y - Math.sin(this.directionAngle.xy * PIInDegree) * Speed;
        let x2Minusx1 = Math.cos(this.directionAngle.xy * PIInDegree) * Speed;
        let x = this.x + x2Minusx1;

        // for xz <= 180 untill 90
        // tan is negative but z most be increased

        // for xz <= 270 untill 180
        // tan is positive but z most be decreased
        let z = this.directionAngle.xz <= 270 && this.directionAngle.xz >= 90 ? this.z - Math.tan(this.directionAngle.xz * PIInDegree) * Math.abs(x2Minusx1) : this.z + Math.tan(this.directionAngle.xz * PIInDegree) * Math.abs(x2Minusx1);

        // ***** for collisions ***** \\

        // if (this.collision === null) return [x, y, z];

        // // to check if next center position passed the collision 
        // if (x === this.collision.x && y === this.collision.y && z === this.collision.z) {
        //     this.directionAngle = this.collision.nextDirectionAngle;
        //     return [x, y, z];
        // }

        // if ((this.directionAngle.xy > 0 && this.directionAngle.xy < 180 && y < this.collision.y) || (this.directionAngle.xy > 180 && this.directionAngle.xy < 360 && y > this.collision.y)) {

        //     this.directionAngle = this.collision.nextDirectionAngle;
        //     return [this.collision.x, this.collision.y, this.collision.z];
        // }
        //  else if ((this.directionAngle.xz > 0 && this.directionAngle.xz < 180 && z > this.collision.z) || (this.directionAngle.xz > 180 && this.directionAngle.xz < 360 && z < this.collision.z)) {

        //     this.directionAngle = this.collision.nextDirectionAngle;
        //     return [this.collision.x, this.collision.y, this.collision.z];
        // }
        //  else if ((this.directionAngle.xy === 0 || this.directionAngle.xy === 180 || this.directionAngle.xy === 360) && (this.directionAngle.xz === 0 || this.directionAngle.xz === 180 || this.directionAngle.xz === 360)) {

        //     if ((this.directionAngle.xy === 0 || this.directionAngle.xy === 360) && x > this.collision.x) {

        //         this.directionAngle = this.collision.nextDirectionAngle;
        //         return [this.collision.x, this.collision.y, this.collision.z];
        //     } else if (this.directionAngle.xy === 180 && x < this.collision.x) {

        //         this.directionAngle = this.collision.nextDirectionAngle;
        //         return [this.collision.x, this.collision.y, this.collision.z];
        //     }
        // }

        return [x, y, z];
    }

    createShape(): boolean {

        this.radius = chooseRandom(ShapeSizeLimit, ShapeSizeLimit / 5);

        // set Center Position
        this.x = chooseRandom(window.innerWidth - this.radius, this.radius);
        this.y = chooseRandom(window.innerHeight - this.radius, this.radius);
        // we assume maximom z as window.height
        this.z = chooseRandom(window.innerHeight - this.radius, this.radius);

        let Created = true;
        for (const Shape of Shapes) {

            // for circle for sample
            // The distance between the center of circle 1 and center of circle 2 < radius + radius 
            if (this.radius + Shape.getShapeDistanceOnPerimeter(this.x, this.y, this.z) > Math.sqrt((this.x - Shape.x) ** 2 + (this.y - Shape.y) ** 2 + (this.z - Shape.z) ** 2)) {
                Created = false;
                break;
            }
        }

        return Created;
    }

    changeCenterPosition() {
        [this.x, this.y, this.z] = this.claculateNextCenterPosition();
    }

    draw() {

        let EyeDisCen = Math.sqrt((this.x - EyePosition.x) ** 2 + (this.y - EyePosition.y) ** 2 + (this.z - EyePosition.z) ** 2) - this.radius;
        let HalfHeight = ActualFontSize.height / 2;
        let HalfWidth = ActualFontSize.width / 2;

        for (let y = -this.radius + HalfHeight; y <= this.radius - HalfHeight; y += ActualFontSize.height) {
            // the horizontal line of circle
            let HorizontalLine = Math.sqrt(this.radius ** 2 - y ** 2);
            for (let x = -HorizontalLine + HalfWidth; x <= HorizontalLine - HalfWidth; x += ActualFontSize.width) {

                let key = (ScreenColumns + 1) * Math.floor((this.y + y) / ActualFontSize.height) + Math.round((this.x + x) / ActualFontSize.width);
                if (A_Platform[key] === "\n" || !A_Platform[key]) continue;

                let Dis = Math.sqrt((this.x + x - EyePosition.x) ** 2 + (this.y + y - EyePosition.y) ** 2 + (this.z + Math.sqrt(this.radius ** 2 - x ** 2 - y ** 2) - EyePosition.z) ** 2)
                A_Platform[key] = getCharBasedOnZ(EyeDisCen, Dis);
            }
        }
    }
}