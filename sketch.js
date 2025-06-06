let player;
let item;
let score = 0;
let theme = 'campo'; // 'campo' ou 'cidade'

function setup() {
  createCanvas(600, 400);
  player = new Player();
  item = createItem();
}

function draw() {
  if (theme === 'campo') {
    background(135, 206, 235); // Céu azul
    fill(34, 139, 34); // Cor do campo
    rect(0, height - 50, width, 50); // Solo do campo
  } else {
    background(169, 169, 169); // Céu cinza
    fill(105, 105, 105); // Cor dos prédios
    rect(0, height - 50, width, 50); // Solo da cidade
    drawBuildings();
  }

  player.update();
  player.show();

  if (player.eats(item)) {
    score++;
    item = createItem();
    theme = (theme === 'campo') ? 'cidade' : 'campo'; // Alterna o tema
  }

  fill(0);
  textSize(16);
  text(`Pontuação: ${score}`, 10, height - 10);
}

function createItem() {
  let x = random(width);
  let y = random(height - 100);
  return createVector(x, y);
}

function drawBuildings() {
  for (let i = 0; i < 5; i++) {
    let w = random(50, 100);
    let h = random(100, 300);
    let x = random(width);
    let y = height - 50 - h;
    rect(x, y, w, h);
  }
}

class Player {
  constructor() {
    this.position = createVector(width / 2, height - 70);
    this.size = 20;
    this.velocity = createVector(0, 0);
  }

  update() {
    if (keyIsDown(LEFT_ARROW)) {
      this.velocity.x = -2;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.velocity.x = 2;
    } else {
      this.velocity.x = 0;
    }

    if (keyIsDown(UP_ARROW)) {
      this.velocity.y = -2;
    } else if (keyIsDown(DOWN_ARROW)) {
      this.velocity.y = 2;
    } else {
      this.velocity.y = 0;
    }

    this.position.add(this.velocity);
    this.position.x = constrain(this.position.x, 0, width - this.size);
    this.position.y = constrain(this.position.y, 0, height - this.size);
  }

  show() {
    fill(255, 0, 0);
    noStroke();
    ellipse(this.position.x, this.position.y, this.size);
  }

  eats(pos) {
    let d = dist(this.position.x, this.position.y, pos.x, pos.y);
    return d < this.size;
  }
}
