var rows, cols; // Total number of cols and rows
var w = 40;
var grid = [];

var current;
var stack = [];

function setup() {
  createCanvas(400, 400);
  rows = floor(height/w);
  cols = floor(width/w);
  //frameRate(5);

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  
  current = grid[0];
}

function draw() {
  background(5);
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  current.visited = true;
  current.highlight();
  
  var next = current.checkNeighbors();
  if (next) {
    next.visited = true;
    stack.push(current);

    removeWalls(current, next);
    current = next;
  } else {
    if(stack.length > 0) {
      current = stack.pop();
    } else { //To remove start and end walls when it reaches its initial pos i.e grid[0]
      grid[grid.length - 1].walls[1] = false;
      grid[0].walls[3] = false;
    }
  }

}

function index(i, j) { // Here it is 1D array so this is the formulae.
  if (i < 0 || j < 0 || i >= rows || j >= cols) return -1;
  return j + i * cols;
}


function removeWalls(a, b) {
  var x = a.j - b.j;
  if (x == 1) { //Means a is after b bcz thats why its column no is greater
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x == -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  
  var y = a.i - b.i;
  if (y == 1) { //Means a is at bottom of b bcz thats why its row no is greater
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y == -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}