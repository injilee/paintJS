const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor");
const controlRange = document.getElementById("range");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INFINITY_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;
// color 
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INFINITY_COLOR;
ctx.fillStyle = INFINITY_COLOR;

// line width
ctx.lineWidth = 2.5;

// canvas size
// 따로 width와 height를 지정해주는 이유는, Js는 html파일로부터 canvas의 생성 내용을 받아오는데 html에서 만든 canvas가 우리 눈에 보여질 때는 css로부터 크기정보를 받아와서 그 내용을 바탕으로 보여지는거고, Js는 css가 아닌 html로부터 canvas라는 id값을 바탕으로 element를 생성하기 때문에 따로 값을 지정해주거나 offsetWidth나 height로 매번 캔버스를 측정해서 가져오도록 지정해야 한다. 따로 지정하는 일이 없도록 하기 위해서는 html에서 <canvas id="" width="", height=""> 로 html 내부에 값을 지정해주면 되겠다.
// canvas.width = 700;
// canvas.heigth = 700; // 이상하게 그려져서 바꿈
canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

// 그림 그려지는 변수
let painting = false;

// fill or paint 인지 확인하는 변수
let filling = false;


// Not paiting, 중복 방지 함수
function stopPainting(){
    painting = false;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){   // painting 하지 않을 경우, 마우스의 움직임을 따라가기 위해 만든 if문이다. painting 하기 위해 클릭을 하게 되면 그 자리가 x, y 값이 되는 거니까 이 if문은 필요가 없다.
        ctx.beginPath();  // 경로 생성
        ctx.moveTo(x, y);  // 선 시작 좌표
    } else {
        ctx.lineTo(x, y);  // 선 끝 좌표
        ctx.stroke();  // 선 그리기
    };
}

function startPainting(){
    painting = true;
}

function btnControlling(){
    const rangeLineValue = controlRange.value;
    ctx.lineWidth = rangeLineValue;
    // console.log(ctx.lineWidth);
}

function handleClickColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    };
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleSaveClick(){
    const image = canvas.toDataURL(); // type을 지우면 png로 저장된다.
    // console.log(image);  // image의 데이타 정보가 나온다.
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[✨]";
    link.click();
    // console.log(link);
}

function handleCM(event){
    // preventDefault로 우클릭 제어!
    event.preventDefault();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("mousedown", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

if(controlRange){
    controlRange.addEventListener("input", btnControlling);
    // controlRange.addEventListener("mouseup", btnControlling);
}
btnControlling();

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(save){
    save.addEventListener("click", handleSaveClick);
}

// click color
Array.from(colors).forEach((color)=>{
    color.addEventListener("click", handleClickColor);
})