
//Fundos e objetos
let background1, titulo,play,balao,aviao,gameover,replay;
//Define a tela do jogo.
let tela = 1;
//Naves do jogo
let balao2, balao1, nosAviao;
//Váriavel que armazena valor da quantidade de frames por segundo que irá rodar.
let fr = 600;
//Váriaveis de controle de posições e tamanho;
let posX = -50;
let posY = 100;
let altura = 100;
let largura = 153;
//Váriaveis de controle
let lose =  0;
let i = 0;

//Carregamento das nossas imagens
function preload()
{
  background1 = loadImage('assets/background.jpg');
  titulo = loadImage('assets/titulo.png');
  play = loadImage('assets/iniciar1.png');
  balao = loadImage('assets/balao.png');
  aviao = loadImage('assets/aviao.png');
  gameover = loadImage('assets/gameOver.png');
  replay = loadImage('assets/replay.png');
}

//Usa o máximo de framerate possivel
function setup()
{
  createCanvas(800,500, WEBGL);
  frameRate(fr); //Usa o máximo de framerate possivel
  
}

function draw()
{

//Tela inicial
if (tela == 1)
{ 
  i = 0;
  //Define variaveis como nossa classe
  //Duas naves que começam randomicamente no eixo Y
  // terceiro atributo serve para nosso calculo de colisão
  balao2 = new naves(415, random(-240,240), 15);
  balao1 = new naves(415, random(-240,240), 15);
  //Nave que controlamos
  nosAviao = new naves(15, 15, 15);
  

  //cria um quadrado e aplica textura para o nosso background
  noStroke();
  texture(background1);
  rect(-400, -250, 800, 500);

  //Nossa textura do titulo
  texture(titulo);
  rect(-150, -240, 300, 300);

  //Caso não tenha perda, inicia uma textura com "play"
  if(lose == 0){
    texture(play);
    rect(posX, posY, largura, altura, 300);
  }
  //Caso tenha perca, inicia duas textura uma com "Too bad game over" e outra com "Play Again"
  else if (lose == 1){
    texture(gameover);
    rect(-130, -100, 300, 300);

    texture(replay);
    rect(posX, posY, largura, altura, 300);
  }

  //Serve para auxiliar visualmente, mostrando que o mouse está em cima do botão e caso clique executa a função do botão
  if ( mouseX > posX + 400 && mouseX < posX + 400 + largura && mouseY > posY + 250 && mouseY < posY + 250 + altura)
  {  

    stroke(0);
    rect(posX - 22, posY - 22, largura + 50, altura + 50, 500);
    mouseDetection(); 
  }
  
}

//Tela do jogo
else if (tela == 2)
{
  //cria um quadrado e aplica textura para o nosso background
  texture(background1);
  rect(-400, -250, 800, 500);

  noStroke();

  //calculo da distancia
  let d = dist(nosAviao.x, nosAviao.y, balao1.x, balao1.y); 
  //calculo da colisão
  if (d < nosAviao.z + balao1.z)
  {
   lose = 1;
   tela = 1;

  }
  //calculo da distancia
  d = dist(nosAviao.x, nosAviao.y, balao2.x, balao2.y); 
  //calculo da colisão
  if (d < nosAviao.z + balao2.z)
  {
    lose = 1;
    tela = 1;
  }

  //Movimento da nave com o mouse
  //limita para nosso avião não sair da tela no eixo X
  nosAviao.x = constrain(mouseX, 0, 800) - 430; // -430 para o mouse ficar em cima do objeto, WEBGL toma o meio como (0,0)
                                                   // e o canvas toma como o primeiro pixel da diagonal principal como (0,0)
  //limita para nosso avião não sair da tela no eixo y
  nosAviao.y = constrain(mouseY, 0, 500) - 280; // -280 para o mouse ficar em cima do objeto, WEBGL toma o meio como (0,0)
                                                   // e o canvas toma como o primeiro pixel da diagonal principal como (0,0)


  i = i + 1;
  _text = createGraphics(350, -200);
  _text.textFont('Source Code Pro');
  _text.textSize(22);
  _text.fill(3, 7, 11);
  _text.noStroke();
  _text.text('Pontuação: ' + i, -0, 50);
  texture(_text);
  rect(300, 200, 200, 50);



  //Movimento das naves inimigas
  balao1.move();
  balao2.move();
  //Mostras nossas naves
  balao2.show(1);
  balao1.show(1);  
  nosAviao.show(2)

}
}

class naves
{
//construtor para nossa classe
constructor(x, y, z)
{
  this.x = x;
  this.y = y;
  this.z = z;
}
//método para movimento
move()
{
  //movimento da direita para esquerda no eixo X
  this.x = this.x + 1 * (-deltaTime / 50 * 20); // Move o balao no ângulo em relação ao deltaTime

  //se sair da tela no eixo X, reinicia novamente pelo eixo X na direita, y randomico
  if (this.x <= -415) { this.x = 410; this.y = random(-230,230); }
}
//método para mostrar as naves, e recebe como parametro o tipo de nave
show(tipo)
{ 

  //se tipo for 1, cria a nave balão
  if(tipo == 1){
    texture(balao);
    rect(this.x, this.y, 50, 50);
  }
  //se tipo for 2, cria a nave avião
  else if(tipo == 2){
    texture(aviao);
    rect(this.x, this.y, 50, 50);
  }
}
}
//metodo de detecção do mouse
function mouseDetection()
  {
    //se pressionar o botão, faz a ação
    if (mouseIsPressed)
    {  
      stroke(0);
      tela = 2;
    }
  }
