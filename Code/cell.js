function Cell(i, j) { //Constructor
  this.i = i; //Row no
  this.j = j; //Column no
  this.walls = [true, true, true, true]; // Top, Right, Bottom, Left
  visited = false;

  this.checkNeighbors = function() {
    var neighbors = []; //Cell Object Array

    var top = grid[index(i, j-1)]; //In 2D array we simply do grid[j - 1][i]
    var right = grid[index(i+1, j)];
    var bottom = grid[index(i, j+1)];
    var left = grid[index(i-1, j)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      var r = floor(random(0, neighbors.length)); //inclusive, exclusive
      return neighbors[r];
    } else {
      return null;
    }


  }
  this.highlight = function() {
    var x = this.j * w; //X-axis
    var y = this.i * w; //Y-axis
    fill('#15B5B0');
    noStroke();
    rect(x, y, w, w);

  }

  this.show = function() {
    var x = this.j * w;
    var y = this.i * w;
    stroke(255);
    if (this.walls[0]) {
      line(x, y, x + w, y);
    }
    if (this.walls[1]) {
      line(x + w, y, x + w, y + w);
    }
    if (this.walls[2]) {
      line(x + w, y + w, x, y + w);
    }
    if (this.walls[3]) {
      line(x, y + w, x, y);
    }

    if (this.visited) {
      noStroke();
      fill(2, 100, 150, 60);
      rect(x, y, w, w);
    }
  }
}