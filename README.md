# mhdan.ir
here is my resume website!
this website contains three main elements => Background, MyResume ,ThreeDPlatform

# first element
Background element that i wrote 2 years ago and has nothing anything special!
this animation retrieved from [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
two years ago i wrote this code but the pre element and the text within it doesn't cover the viewer screen!
and i dropped the project and now with react and "getBoundingClientRect" i can finally determine the scrren rows and columns number!

# scound element
the challenge here was make image squere and responsive at same time! so i cannot use units like % or pixels!
next was the description pop up and its position
at first, image tag has transition(50%,50%) and scale, and those css properties cause miss calculation and bugs to set description pop up position correctly!
in the end i choose this method to set pop up position and image scaling! (using scale does not affect width and height property alonely!)
and there is a massive bug in react in which, when you use too much useState its cause the memory to fill up and if you use this useState variables on somthing like "hover" interaction
that changes values very quickly, its may cause miss setting values
i'll show with sample =>
const [value1 , setvalue1] = useState(false)
const [value2 , setvalue2] = useState(false)
at first its 
false 
false
then after hover for sample 
true 
true
but if we hover very quickly then its will be
false 
true!
and you will see the bug section, methods that i tried and failed
and the final method that work correctly!

# third element
its should be a platform like first element that contains shapes that collide with each other and sides of enviroment!
but i couldn't wrote it 
it has many bugs
for example, somthing like using Math.sin because of placing the decimal part of the pi number, it causes a little disturbance in the calculation of the position of the figure
and...
maybe two years later!


