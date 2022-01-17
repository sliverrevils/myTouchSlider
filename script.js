//if('ontouchstart' in window)console.log("SENSOR SCREEN"); else console.log("PC");
$picBlock = document.querySelector('.pic_block');
$nowPic = $picBlock.querySelector('img');
$nowPic.now = 0;


const picsArr = [
    "https://static1.bigstockphoto.com/4/7/2/large1500/274864510.jpg",
    "https://img3.goodfon.ru/original/1600x1200/2/5a/pasture-the-bavarian-alps.jpg",
    "https://getwallpapers.com/wallpaper/full/7/e/6/230639.jpg",
    "https://image.winudf.com/v2/image/Y29tLnN5enlneS5saW9uX3NjcmVlbnNob3RzXzRfM2E4NDhiZWQ/screen-4.jpg?fakeurl=1&type=.jpg",
    "https://i.artfile.me/wallpaper/26-10-2009/2048x1536/avtomobili-dodge-121470.jpg",
    "https://wallpapercave.com/wp/wp2011921.jpg",
    "https://s1.1zoom.ru/b5050/295/285963-alexfas01_1920x1200.jpg"
]
$nowPic.src = picsArr[0];


const changePicture = ({ element, side }) => { // side - left rigth top bottom
    switch (side) {
        case "left": $nowPic.now < picsArr.length - 1 && ++$nowPic.now||$nowPic.now==picsArr.length-1&&($nowPic.now=0);
        break;
        case "right": ($nowPic.now > 0 && --$nowPic.now)||( $nowPic.now==0&&($nowPic.now=picsArr.length-1)); 
        break;
    }

    $nowPic.src = picsArr[$nowPic.now];

    return true;
}




'ontouchstart' in window ? addSwips($picBlock) : addClicks($picBlock); //   TOUCHES || CLICKS

//-------------- ADD SWIPE 
function addSwips(element) { 
    console.log("SENSOR SCREEN");

    let firstTouch = {},
        lastTouch = {};

    const getPositionXY = ({ touches: { [0]: { pageX: x, pageY: y } } }) => ({ x: Math.floor(x), y: Math.floor(y) });

    const isSwipe = (el) => {
        let Xpix = firstTouch.x - lastTouch.x,
            Ypix = firstTouch.y - lastTouch.y;
        // Math.abs(Xpix) >= 100 && (Xpix > 0 && console.log("left") || (Xpix < 0 && console.log("right")));
        // Math.abs(Ypix) >= 100 && (Ypix > 0 && console.log("top") || (Ypix < 0 && console.log("bottom")));
        Math.abs(Xpix) >= 100 && (Xpix > 0 && changePicture({ element, side: "left" }) || Xpix < 0 && changePicture({ element, side: "right" }) && console.log("SWIPE"));
        Math.abs(Ypix) >= 50 && (Ypix > 0 && changePicture({ element, side: "top" }) || Ypix < 0 && changePicture({ element, side: "bottom" }) && console.log("SWIPE"));
    }

    element.addEventListener('touchstart', e => (firstTouch = getPositionXY(e))&&e.preventDefault());
    element.addEventListener('touchmove', e => (lastTouch = getPositionXY(e))&&e.preventDefault());
    element.addEventListener('touchend', () => isSwipe(element));
}

//-------------- ADD CLICKS
function addClicks(element){
    console.log("MOUSE CLICKS");       
    
    element.addEventListener('click',e=>{
        e.preventDefault();
        console.log("CLICK")
        //console.log("BLOCK SIZE",e.target.width,e.target.height);
        //console.log("CLICK POS ON BLOCK",e,e.offsetX,e.offsetY);        
        
         e.offsetX <= (e.target.width / 3)  && changePicture({ element, side: "left" });
         e.offsetX >= (e.target.width / 3*2) && changePicture({ element, side: "right" });
    }); 
}