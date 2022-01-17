//if('ontouchstart' in window)console.log("SENSOR SCREEN"); else console.log("PC");
$picBlock=document.querySelector('.pic_block');
$nowPic=$picBlock.querySelector('img');
$nowPic.now=0;


const picsArr =[
    "https://static1.bigstockphoto.com/4/7/2/large1500/274864510.jpg",
    "https://img3.goodfon.ru/original/1600x1200/2/5a/pasture-the-bavarian-alps.jpg",
    "https://getwallpapers.com/wallpaper/full/7/e/6/230639.jpg",
    "https://image.winudf.com/v2/image/Y29tLnN5enlneS5saW9uX3NjcmVlbnNob3RzXzRfM2E4NDhiZWQ/screen-4.jpg?fakeurl=1&type=.jpg",
    "https://i.artfile.me/wallpaper/26-10-2009/2048x1536/avtomobili-dodge-121470.jpg",
    "https://wallpapercave.com/wp/wp2011921.jpg",
    "https://s1.1zoom.ru/b5050/295/285963-alexfas01_1920x1200.jpg"
]
$nowPic.src=picsArr[0];


const changePicture=({element,side})=>{ // side - left rigth top bottom
   switch(side){
       case "right":$nowPic.now<picsArr.length-1&&++$nowPic.now;break;
       case "left":$nowPic.now>0&&--$nowPic.now;break;
   }

   $nowPic.src=picsArr[$nowPic.now];
    
    //console.log(side);
    }




'ontouchstart' in window ? addSwips($picBlock) : console.log("PC");

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
        Math.abs(Xpix) >= 100 && (Xpix > 0 && changePicture({element,side:"left"}) || Xpix < 0 && changePicture({element,side:"right"}));
        Math.abs(Ypix) >= 50 && (Ypix > 0 && changePicture({element,side:"top"}) || (Ypix < 0 && changePicture({element,side:"bottom"})));
    }

    element.addEventListener('touchstart', e => firstTouch = getPositionXY(e));
    element.addEventListener('touchmove', e => lastTouch = getPositionXY(e));
    element.addEventListener('touchend', () => isSwipe(element));
}

