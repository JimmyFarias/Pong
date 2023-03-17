//variaveis da bolinha
let xBolinha = 400;
let yBolinha = 250;
let diametro = 15;
let raio = diametro /2;

//variaveis do movimento da bolinha
let velocidadexBolinha = 3;
let velocidadeyBolinha = 4;

//variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;
let colisao = false;

//placa de pontos
let meusPontos = 0;
let pontosOponente = 0;

//variaveis da raquete do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preloud(){
  trilha = loudSound("trilha.mp3");
  raquetada = loudSound("raquetada.mp3");
  ponto = loudSound("ponto.mp3");
}

function setup() {
  createCanvas(600, 400);
  //trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentoBolinha();
  colisaoBolinha();
  mostraRaquete(xRaquete, yRaquete);
  movimentaRaquete();
  //colisaoRaquete();
  colisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentoRaqueteOponente();
  colisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
  circle(xBolinha,yBolinha,diametro);
}

function movimentoBolinha(){
  xBolinha += velocidadexBolinha;
  yBolinha += velocidadeyBolinha;
}

function colisaoBolinha(){
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadexBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeyBolinha  *= -1;
  }
}

function mostraRaquete(x , y){
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaRaquete(){
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
    }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

function movimentoRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento /2 -30;
  yRaqueteOponente += velocidadeYOponente;
}

function colisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha -raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete) {
    velocidadexBolinha *= -1
    //raquetada.play();
  }
}

function colisaoRaquete(x , y){
  colisao =
    collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if(colisao){
    velocidadexBolinha *= -1
    //raquetada.play();
  }
  
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(19);
  fill(color(255, 140, 0));
  rect(130, 10, 40, 20);
  fill(255);
  text(meusPontos, 150, 26);
  fill(color(255, 140, 0));
  rect(430, 10, 40, 20);
  fill(255);
  text(pontosOponente, 450, 26);
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    //ponto.play();
  }
  if (xBolinha < 10){
    pontosOponente += 1;
    //ponto.play();
  }
}