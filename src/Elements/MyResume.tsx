import { useState } from "react"
import MyImage from "./../images/MyImage.png"
import GitHub from "./../images/git hub.png"
import php from "./../images/php.png"
import laravel from "./../images/laravel.png"
import whmcs from "./../images/whmcs.png"
import python from "./../images/python.png"
import django from "./../images/django.png"
import javascript from "./../images/javascript.png"
import jquery from "./../images/jquery.png"
import typescript from "./../images/typescript.png"
import react from "./../images/react.png"
import cpp from "./../images/c++.png"
import html from "./../images/html.png"
import css from "./../images/css.png"
import bootstrap from "./../images/bootstrap.png"
import mysql from "./../images/mysql.png"
import sqlite from "./../images/sqlite.png"
import git from "./../images/git.png"
import contact from "./../images/contact.png"
import experience from "./../images/experience.png"
import skills from "./../images/skills.png"
import creativity from "./../images/creativity.png"
import internetWorm from "./../images/internetWorm.png"
import education from "./../images/education.png"
import leftArrow from "./../images/leftArrow.png"
import rightArrow from "./../images/rightArrow.png"

// we use this variable to use in different components
// G means global
// this variable is for allowing clicking and hover all image elements after clicking
var GAllowed: boolean, GsetAllowed: (Allowed: boolean) => void;


function Description(props: { classVars: string, ImgClick: boolean, description: string[] }) {

    const [description, setdescription] = useState(props.description[0]);
    const [page, setpage] = useState(0);
    var pageLength = props.description.length - 1;

    const goNextPage = props.description.length > 1 ? () => {
        if (page + 1 > pageLength) {
            setpage(0);
            setdescription(props.description[page]);
            return;
        }

        setpage(page + 1);
        setdescription(props.description[page]);
    } : () => { };

    const goPreviousPage = props.description.length > 1 ? () => {
        if (page - 1 < 0) {
            setpage(pageLength);
            setdescription(props.description[page]);
            return;
        }

        setpage(page - 1);
        setdescription(props.description[page]);
    } : () => { };


    return <div className={`${props.classVars} Description ${props.ImgClick ? "DescriptionOpen" : "DescriptionClose"}`} >
        <div className={`DescriptionLeftArrow ${props.ImgClick ? "DescriptionContentHided" : "DescriptionContentHiding"}`} onClick={goPreviousPage}><img src={leftArrow} alt="To Left!" style={{ opacity: props.description.length === 1 ? "0.2" : "1", cursor: props.description.length === 1 ? "default" : "pointer" }} /></div>
        <div className={`DescriptionContent ${props.ImgClick ? "DescriptionContentHided" : "DescriptionContentHiding"}`} dangerouslySetInnerHTML={{ __html: description }}>
        </div>
        <div className={`DescriptionRightArrow ${props.ImgClick ? "DescriptionContentHided" : "DescriptionContentHiding"}`} onClick={goNextPage}><img src={rightArrow} alt="To Right!" style={{ opacity: props.description.length === 1 ? "0.2" : "1", cursor: props.description.length === 1 ? "default" : "pointer" }} /></div>
    </div>
}

function Img(props: {
    alt: string,
    src: string,
    classVars: string,
    description: string[]
}) {

    //  /************************************************\
    // |  this is a bug in react, if you use too much     |
    // |  useState in component there will be wrong       |  
    // |  values seted in useSate value                   |
    //  \************************************************/

    // i tryied mixing up this two useState and use them as an object but still its has bug!
    // i even triad using a class ./HoverProhibitied and then using :not(HoverProhibitied) was going to handle hovering by css
    // in handleHover this class will be deleted and 
    // 

    // for hovering animation
    // const [ImgHover, setImgHover] = useState(false);
    // const [ImgHoverClass, setImgHoverClass] = useState("");
    // const handleHover = () => {
    // setImgHoverClass(ImgHover ? "imgHovered" : "imgHovering");

    // if you rapidly hover image elements, this part doesn't work correctly
    // this is react bug
    // from chatgpt => The useState hook in React is designed to be synchronous and reliable. However, when rapidly hovering over an element, it's possible that the useState update calls might be queued up and not processed immediately due to the rapid events firing
    // setImgHover(!ImgHover);
    // }

    const [ImgHoverClass, setImgHoverClass] = useState("");
    const handleHover = (Hover: boolean) => setImgHoverClass(Hover ? "imgHovering" : "imgHovered");


    // for img clicking
    const [ImgClick, setImgClick] = useState(false);
    const [ImgClickClass, setImgClickClass] = useState("");
    const [ImgClickAnimationDelay, setImgClickAnimationDelay] = useState(false);
    const [DesClickAnimationDelay, setDesClickAnimationDelay] = useState(false);
    const handleClick = () => {

        // for handling hover and disable other imgs hover and click attrs
        setImgHoverClass("");
        GsetAllowed(!GAllowed);

        // for handling click
        setImgClickClass(ImgClick ? "imgClicked" : "imgClicking");
        setImgClick(!ImgClick);

        // this part is for when the imgClicked animation is runing and prevent conflict between imgClicked and imgHovered
        // and 700 is equal to .imgClicked run
        if (ImgClickAnimationDelay) {
            const timeout = setTimeout(() => {
                setImgClickAnimationDelay(!ImgClickAnimationDelay);
                clearTimeout(timeout);
            }, 700);
        } else {
            setImgClickAnimationDelay(!ImgClickAnimationDelay);
        }

        // and 300 is equal to .DescriptionClose run
        // and 100 beacuse of children hiding
        if (DesClickAnimationDelay) {
            const timeout = setTimeout(() => {
                setDesClickAnimationDelay(!DesClickAnimationDelay);
                clearTimeout(timeout);
            }, 400);
        } else {
            setDesClickAnimationDelay(!DesClickAnimationDelay);
        }
    }


    return <>
        <img
            onClick={GAllowed || ImgClick ? handleClick : () => { }}
            onMouseEnter={GAllowed && !ImgClickAnimationDelay ? () => { handleHover(true) } : () => { }}
            onMouseLeave={GAllowed && !ImgClickAnimationDelay ? () => { handleHover(false) } : () => { }}
            className={`Pictures ${props.classVars} ${ImgClickClass} ${ImgHoverClass}`}
            src={props.src}
            alt={props.alt}
        />
        {DesClickAnimationDelay && <Description ImgClick={ImgClick} classVars={props.classVars} description={props.description} />}
    </>
}

export function MyResume() {

    // for when an image clicked
    const [Allowed, setAllowed] = useState(true);
    GAllowed = Allowed;
    GsetAllowed = setAllowed;

    return <>
        <div className="Container">

            <Img
                src={MyImage}
                alt="Here's me!"
                classVars="VarsMyImage"
                description={[`With great interest in the field of engineering sciences, I started my career in the field of software
                engineering in 1398(2020) and worked as a full-stack programmer for two years at Netafraz
                Iranian Company.<br/> Military service situation:<span style="font-weight: bold;">
                Educational Exemption</span>.`  ]}
            />

            <Img
                src={GitHub}
                alt="My Git Hub"
                classVars="VarsGitHub"
                description={[`Here is my <a href="https://github.com/MohammadHeidaridan">GitHub</a>!</br>I will put my personal projects into my GitHub.</br>Here's <a href="https://github.com/MohammadHeidaridan/cpp-game-jumping-Player">my C++ Game</a></br>And this website <a href="https://github.com/MohammadHeidaridan/mhdan.ir">source code</a>.`]}
            />

            <Img
                src={php}
                alt="My php!"
                classVars="Varsphp"
                description={[`Projects : <b>+30</b><br>Composer : <b>Created a vendor for whmcs modules!</b>
                <div class="skillsBarPosition"><div style="width:30%;">Php :</div><div class="skillsBar" style="width:70%"><div class="Bar" style="width:80%;"></div></div></div>`]}
            />

            <Img
                src={python}
                alt="My python!"
                classVars="Varspython"
                description={[`Projects : <b>+3</b><br>Freelance Projects : <b>1</b><br><div class="skillsBarPosition"><div style="width:40%;">Python :</div><div class="skillsBar" style="width:60%;"><div class="Bar" style="width:80%;"></div></div></div>`]}
            />

            <Img
                src={django}
                alt="My django!"
                classVars="Varsdjango"
                description={[`Projects : <b>0</b><br><div class="skillsBarPosition"><div style="width:40%;">Django :</div><div class="skillsBar" style="width:60%;"><div class="Bar" style="width:60%;"></div></div></div>`]}
            />

            <Img
                src={javascript}
                alt="My javascript!"
                classVars="Varsjavascript"
                description={[`Projects : <b>+40</b><br><div class="skillsBarPosition"><div style="width:55%;">Javascript :</div><div class="skillsBar" style="width:45%;"><div class="Bar" style="width:90%;"></div></div></div>`]}
            />

            <Img
                src={jquery}
                alt="My jquery!"
                classVars="Varsjquery"
                description={[`Projects : <b>+40</b><br><div class="skillsBarPosition"><div style="width:40%;">Jquery :</div><div class="skillsBar" style="width:60%;"><div class="Bar" style="width:90%;"></div></div></div>`]}
            />

            <Img
                src={react}
                alt="My react!"
                classVars="Varsreact"
                description={[`Projects : <b>1</b><br>Here's my fisrt react <a href="https://github.com/MohammadHeidaridan/mhdan.ir">project!</a><br><div class="skillsBarPosition"><div style="width:40%;">React :</div><div class="skillsBar" style="width:60%;"><div class="Bar" style="width:70%;"></div></div></div>`]}
            />

            <Img
                src={cpp}
                alt="My c++!"
                classVars="Varscpp"
                description={[`Projects : <b>1</b><br>Here's my fisrt c++ <a href="https://github.com/MohammadHeidaridan/cpp-game-jumping-Player">project!</a><br><div class="skillsBarPosition"><div style="width:25%;">C++ :</div><div class="skillsBar" style="width:75%;"><div class="Bar" style="width:70%;"></div></div></div>`]}
            />

            <Img
                src={html}
                alt="My html!"
                classVars="Varshtml"
                description={[`Projects : <b>+40</b><br><div class="skillsBarPosition"><div style="width:30%;">Html :</div><div class="skillsBar" style="width:70%;"><div class="Bar" style="width:95%;"></div></div></div>`]}
            />

            <Img
                src={css}
                alt="My css!"
                classVars="Varscss"
                description={[`Projects : <b>+40</b><br><div class="skillsBarPosition"><div style="width:30%;">Css :</div><div class="skillsBar" style="width:70%;"><div class="Bar" style="width:80%;"></div></div></div>`]}
            />

            <Img
                src={bootstrap}
                alt="My bootstrap!"
                classVars="Varsbootstrap"
                description={[`Projects : <b>+40</b><br><div class="skillsBarPosition"><div style="width:50%;">Bootstrap :</div><div class="skillsBar" style="width:50%;"><div class="Bar" style="width:80%;"></div></div></div>`]}
            />

            <Img
                src={mysql}
                alt="My mysql!"
                classVars="Varsmysql"
                description={[`Projects : <b>+40</b><br><div class="skillsBarPosition"><div style="width:35%;">MySql :</div><div class="skillsBar" style="width:65%;"><div class="Bar" style="width:85%;"></div></div></div>`]}
            />

            <Img
                src={contact}
                alt="My contact!"
                classVars="Varscontact"
                description={[`<ul class="myList">
                    <li><span>Phone</span><small>+98-913-974-9430</small><small>Telegram, Call And SMS</small></li>
                    <li><span>Telegram</span><small>@mohammadhdan</small></li>
                </ul>`, `<ul class="myList">
                    <li><span>Email</span><small>mheidaridan@gmail.com</small></li>
                    <li><span>Location</span><small>Isfahan Province, Isfahan</small></li>
                </ul>`]}
            />

            <Img
                src={experience}
                alt="My experience!"
                classVars="Varsexperience"
                description={[`<b>2020 - 2022</b><br><span style="margin-top:2%;">Netafraz Iranian Company<br><small>Isfahan Province, Isfahan</small></span>
                <ul class="myList">
                    <li><span>Full-stack Developer</span><small>Building modules for whmce and products management,hook and cron job management and...</small></li>
                </ul>`, `<ul class="myList">
                        <li><small>Creating hooks for admin and client front-end side.</small></li>
                        <li><small>Creating a vendor for whmce modules contains items such as routers, frequently used functions as helpers, codes related to communication with various APIs and connection with different databases.</small></li>
                        
                </ul>`, `<ul class="myList">
                        <li><small>Working with APIs and their support such as:</small>
                            <small style="margin-top:5%"><ul class="myList">
                                <li><small>Hexonet API</small></li>
                                <li><small>Irnic API</small></li>
                                <li><small>Onlinenic API</small></li>
                                <li><small>Opensrs API</small></li>
                                <li><small>Telegram API</small></li>
                                <li><small>Whois API</small></li>
                        </ul></small></li>
                    </ul>
                    `]}
            />

            <Img
                src={laravel}
                alt="My laravel!"
                classVars="Varslaravel"
                description={[`Projects : <b>0</b><br>Be familiar with laravel architecture (service Providers and Container!)!`, `<div class="skillsBarPosition"><div style="width:40%;">Laravel :</div><div class="skillsBar" style="width:60%;"><div class="Bar" style="width:80%;"></div></div></div>`]}
            />

            <Img
                src={whmcs}
                alt="My whmcs!"
                classVars="Varswhmcs"
                description={[`Modules : <b>+40</b><br>Hooks : <b>+10</b><br>Crons : <b>+5</b><br><div class="skillsBarPosition"><div style="width:40%;">Whmcs :</div><div class="skillsBar" style="width:60%;"><div class="Bar" style="width:85%;"></div></div></div>`]}
            />

            <Img
                src={typescript}
                alt="My typescript!"
                classVars="Varstypescript"
                description={[`Projects : <b>1</b><br>Here's my fisrt typescript <a href="https://github.com/MohammadHeidaridan/mhdan.ir">project!</a><br><div class="skillsBarPosition"><div style="width:55%;">Typescript :</div><div class="skillsBar" style="width:45%;"><div class="Bar" style="width:80%;"></div></div></div>`]}
            />

            <Img
                src={sqlite}
                alt="My sqlite!"
                classVars="Varssqlite"
                description={[`Projects : <b>+3</b><br><div class="skillsBarPosition"><div style="width:35%;">Sqlite :</div><div class="skillsBar" style="width:65%;"><div class="Bar" style="width:90%;"></div></div></div>`]}
            />

            <Img
                src={git}
                alt="My git!"
                classVars="Varsgit"
                description={[`Projects : <b>+20 on Git!</b><br><div class="skillsBarPosition"><div style="width:30%;">Git :</div><div class="skillsBar" style="width:70%;"><div class="Bar" style="width:50%;"></div></div></div>`]}
            />

            <Img
                src={skills}
                alt="My skills!"
                classVars="Varsskills"
                description={[`<ul class="myList">
                    <li><span>Problem-solving :</span><small>analyze and resolve complex issues using critical thinking (as you would see in my codes).</small></li>
                </ul>`, `<ul class="myList">
                    <li><span>Teamwork :</span><small>as you would see in my article.</small></li>
                    <li><span>Adaptability :</span><small>with a strong desire to learn new things</small></li>
                </ul>`, `<ul class="myList">
                    <li><span>Fast learning :</span><small>ability to process and understand new concepts rapidly</small></li>
                </ul>`]}
            />

            <Img
                src={creativity}
                alt="My creativity!"
                classVars="Varscreativity"
                description={[`you can see my creativity in my twitter
                account as fun <a href="https://twitter.com/MohammadHDAN">tweets</a> :) <br>And my codes and their design.`]}
            />

            <Img
                src={internetWorm}
                alt="My internetWorm!"
                classVars="VarsinternetWorm"
                description={[`with great interest in music, art and fun topics; i found deep
                side of Youtube, Reddit, Telegram, Twitter, Coub And dark side of internet :)`, `since i could
                access the internet!`]}
            />

            <Img
                src={education}
                alt="My education!"
                classVars="Varseducation"
                description={[`<ul class="myList">
                    <li><span>Entrance exam rank 3047 out of 700,000 candidates!</span></li>
                    <li><span>Bachelor's degree in nursing field (at mui)(2023)</span></li>
                </ul>`, `<ul class="myList">
                    <li><span>B2 level in English language (self-study).</span></li>
                    <li><span>Has a semi-finished isi's article about cardiac atrophy</span></li>
                </ul>`, `<ul class="myList">
                    <li><span> and complications from long-term hospitalization (My abstract thinking skill).<br>You Can See <a href="https://www.mhdan.ir/MyISIArticle/">Here!</a></span></li>
                    
                </ul>`]}
            />

        </div>
    </>
}
