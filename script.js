const container = document.getElementById('container');
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const width = document.getElementById("width");
const colored = document.getElementById("colored");
const rangeMin = document.getElementById("range-min");
const rangeMax = document.getElementById("range-max");
const error = document.getElementById("error");

let isFull = false;

let gridSize = width.value; // 그리드 크기
let cellSize = canvas.width / gridSize;
let gridArea = gridSize ** 2;
let minColoredArea = gridArea * rangeMin.value / 100;
let maxColoredArea = gridArea * rangeMax.value / 100;

// 흐리멍텅한 색상 생성 함수
function getPastelColor() {
  const r = Math.floor(Math.random() * 100); // 0-99 범위
  const g = Math.floor(Math.random() * 100); // 0-99 범위
  const b = Math.floor(Math.random() * 100); // 0-99 범위
  return `rgb(${r + 100}, ${g + 100}, ${b + 100})`; // 100을 더해 100-199 범위로 조정
}

// 색칠된 칸을 추적할 배열
const filledCells = new Set();

function create() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 전체 지우기
  filledCells.clear(); // 색칠된 칸 기록 초기화

  error.style.visibility = "hidden";

  if (width.value === "" || width.value === "1" || width.value.includes(".")) {  //  이럴 때 기본값으로 설정한다.
    width.value = 5;
    gridArea = 25;
    colored.textContent = `${gridArea}`;
  }

  if (rangeMin.value === "") {
    rangeMin.value = 20;
    minColoredArea = 0.2;
  }

  if (rangeMax.value === "") {
    rangeMax.value = 80;
    maxColoredArea = 0.8;
  }

  findRatios(width.value);

  gridSize = width.value;
  cellSize = canvas.width / gridSize;
  gridArea = gridSize ** 2;
  minColoredArea = gridArea * (rangeMin.value / 100);
  maxColoredArea = gridArea * (rangeMax.value / 100);

  console.log(canvas.width, gridSize);
  console.log(cellSize, container.style.width);

  const color = getPastelColor(); // 랜덤 흐리멍텅한 색상 선택

  // 최소한, 최대한 색칠하기
  const totalCells = Math.floor(Math.random() * (maxColoredArea - minColoredArea + 1)) + minColoredArea;

  const offsetX = (canvas.width - (cellSize * gridSize)) / 2;
  const offsetY = (canvas.height - (cellSize * gridSize)) / 2;

  while (filledCells.size < totalCells) {
    const randomRow = Math.floor(Math.random() * gridSize);
    const randomCol = Math.floor(Math.random() * gridSize);

    // 대칭 좌표 계산
    const symmetricCol = gridSize - randomCol - 1;

    // 이미 색칠된 칸이 아닌 경우에만 색칠
    if (!filledCells.has(`${randomRow}-${randomCol}`) && !filledCells.has(`${randomRow}-${symmetricCol}`)) {
      // 원래 위치와 대칭 위치에 색칠
      ctx.fillStyle = color; // 색상 설정
      ctx.fillRect(randomCol * cellSize + offsetX, randomRow * cellSize + offsetY, cellSize, cellSize); //  원래 위치
      ctx.fillRect(symmetricCol * cellSize + offsetX, randomRow * cellSize + offsetY, cellSize, cellSize);  //대칭 위치

      // 색칠된 칸 추적
      filledCells.add(`${randomRow}-${randomCol}`);
      filledCells.add(`${randomRow}-${symmetricCol}`);
    }
  }
}

function fullImage() {
  if (isFull) {
    container.style.borderRadius = '1200px';
    container.style.boxShadow = '0 0 0 5px #d7dbe0';
    isFull = false;
  } else {
    container.style.borderRadius = '0';
    container.style.boxShadow = 'none';
    isFull = true;
  }
}

function displayColored() { //칸개수업데이트
  if (width.value > 1 && width.value < 1000) {    //정상적인값인지
    gridSize = width.value;
    gridArea = gridSize ** 2;
    colored.textContent = `${gridArea}`;
    error.style.visibility = "hidden";
  }
  else if (width.value === "" || width.value === "1") {
    gridSize = 5;
    gridArea = 25;
    colored.textContent = "-";
  }
  else {
    width.value = 5;
    gridSize = 5;
    gridArea = 25;
    colored.textContent = `${gridArea}`;
    error.style.visibility = "visible";
  }
}

function minInput() {
  if (rangeMin.value < 0 || rangeMin.value > 100) {
    rangeMin.value = 20;
    error.style.visibility = "visible";
  }
  else {
    error.style.visibility = "hidden";
  }
}

function maxInput() {
  if (rangeMax.value < 0 || rangeMax.value > 100) {
    rangeMax.value = 80;
    error.style.visibility = "visible";
  }
  else {
    error.style.visibility = "hidden";
  }
}

function downloadImage() {
  container.style.borderRadius = "0";
  container.style.boxShadow = "none";
  let isFull2 = true;

  // html2canvas를 사용하여 container 요소를 이미지로 변환
  html2canvas(container).then(canvas => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'github_profile_image.png';
    link.click();
  });

  if (!isFull && isFull2) {
    container.style.borderRadius = "1200px";
    container.style.boxShadow = "0 0 0 5px #d7dbe0";
    isFull = false;
  }
}

function findRatios(n) {
  let closestY = null;
  let closestX = null;

  for (let x = 100; x < 1000; x++) {
      if (x % n === 0) {  // x가 n으로 나누어떨어지는지 확인
          let y = (6 / 5) * x;  // 비율에 따라 y 계산
          if (Number.isInteger(y) && y >= 420) {  // y가 정수이며 420 이상인지 확인
              if (closestY === null || Math.abs(y - 420) < Math.abs(closestY - 420)) {
                  closestY = y;
                  closestX = x;
              }
          }
      }
  }

  if (closestY !== null) {
    console.log(closestX, closestY)
    container.style.width = `${closestY}px`;
    container.style.height = `${closestY}px`;
    canvas.width = closestX;
    canvas.height = closestX;
  } else {
    container.style.width = "420px";
    container.style.height = "420px";
    canvas.width = 350;
    canvas.height = 350;
    width.value = 5;
    colored.textContent = "25";
  }
}
