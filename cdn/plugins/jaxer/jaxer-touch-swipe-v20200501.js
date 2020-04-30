/*!
 * @date    : May 01, 2020
 * @author  : Jaxer
 */

let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

const limit = Math.tan(45 * 1.5 / 180 * Math.PI);
const gestureZone = document.getElementById('modalContent');

gestureZone.addEventListener('touchstart', function (event)
{
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);

gestureZone.addEventListener('touchend', function (event)
{
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture();
}, false);

function handleGesture()
{
    if (touchendX < touchstartX)
    {
        console.log('Swiped left');
    }

    if (touchendX > touchstartX)
    {
        console.log('Swiped right');
    }

    if (touchendY < touchstartY)
    {
        console.log('Swiped up');
    }

    if (touchendY > touchstartY)
    {
        console.log('Swiped down');
    }

    if (touchendY === touchstartY)
    {
        console.log('Tap');
    }
}

function handleGesture2(e)
{
    let x = touchendX - touchstartX;
    let y = touchendY - touchstartY;
    let xy = Math.abs(x / y);
    let yx = Math.abs(y / x);

    if (Math.abs(x) > treshold || Math.abs(y) > treshold)
    {
        if (yx <= limit)
        {
            if (x < 0)
            {
                console.log("left");
            } else
            {
                console.log("right");
            }
        }
        if (xy <= limit)
        {
            if (y < 0)
            {
                console.log("top");
            } else
            {
                console.log("bottom");
            }
        }
    } else
    {
        console.log("tap");
    }
}

