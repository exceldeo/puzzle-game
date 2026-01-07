var rows = 5;
var columns = 5;

var currTile;
var otherTile;

var turns = 0;

window.onload = function () {
  //initialize the 5x5 board
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      //<img>
      let tile = document.createElement("img");
      tile.src = "./image/blank.jpg";

      //DRAG FUNCTIONALITY
      tile.addEventListener("dragstart", dragStart); //click on image to drag
      tile.addEventListener("dragover", dragOver); //drag an image
      tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
      tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
      tile.addEventListener("drop", dragDrop); //drop an image onto another one
      tile.addEventListener("dragend", dragEnd); //after you completed dragDrop

      document.getElementById("board").append(tile);
    }
  }

  //pieces
  let pieces = [];
  for (let i = 1; i <= rows * columns; i++) {
    pieces.push(i.toString()); //put "1" to "25" into the array (puzzle images names)
  }
  pieces.reverse();
  for (let i = 0; i < pieces.length; i++) {
    let j = Math.floor(Math.random() * pieces.length);

    //swap
    let tmp = pieces[i];
    pieces[i] = pieces[j];
    pieces[j] = tmp;
  }

  for (let i = 0; i < pieces.length; i++) {
    let tile = document.createElement("img");
    tile.src = "./image/" + pieces[i] + ".jpg";

    //DRAG FUNCTIONALITY
    tile.addEventListener("dragstart", dragStart); //click on image to drag
    tile.addEventListener("dragover", dragOver); //drag an image
    tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
    tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
    tile.addEventListener("drop", dragDrop); //drop an image onto another one
    tile.addEventListener("dragend", dragEnd); //after you completed dragDrop

    document.getElementById("pieces").append(tile);
  }

  // Add event listener for close video button
  document.getElementById("closeVideo").addEventListener("click", function () {
    document.getElementById("videoModal").style.display = "none";
    // Reset iframe src to stop video
    let iframe = document.getElementById("celebrationVideo");
    let src = iframe.src;
    iframe.src = src;
  });
};

//DRAG TILES
function dragStart() {
  currTile = this; //this refers to image that was clicked on for dragging
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
  otherTile = this; //this refers to image that is being dropped on
}

function dragEnd() {
  if (currTile.src.includes("blank")) {
    return;
  }
  let currImg = currTile.src;
  let otherImg = otherTile.src;
  currTile.src = otherImg;
  otherTile.src = currImg;

  // turns += 1;
  // document.getElementById("turns").innerText = turns;

  checkSolution();
}

function resetGame() {
  location.reload();
}

function showSolution() {
  let boardTiles = document.getElementById("board").children;
  for (let i = 0; i < boardTiles.length; i++) {
    boardTiles[i].src = "./images/" + (i + 1).toString() + ".jpg";
  }
  turns = 0;
  document.getElementById("turns").innerText = turns;
}

function checkSolution() {
  let boardTiles = document.getElementById("board").children;
  let correct = 0;
  for (let i = 0; i < boardTiles.length; i++) {
    if (boardTiles[i].src.includes((i + 1).toString() + ".jpg")) {
      correct += 1;
    }
  }

  if (correct === rows * columns) {
    // Show video modal
    document.getElementById("videoModal").style.display = "flex";
    // document.getElementById("celebrationVideo").play();
  }
}
