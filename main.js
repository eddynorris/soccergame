enchant();
enchant.Sound.enabledInMobileSafari = true;

if(location.protocol == 'file:'){
    enchant.ENV.USE_WEBAUDIO = false;
    console.log('1');
}
window.onload = function() {
    var game = new Core(2400,1100);

    game.preload('jugadorazul.png','jugadorbr.png','estadiog.png','pelota.png','gol.wav');
    // chara1.png を読み込む
    game.keybind(' '.charCodeAt(0), 'a');
     game.fps = 30;
    var start = +new Date();
    var time =  00 * 60 * 10;

    game.onload = function() {
        // Bear クラス (パペット) をつくる
        var Player = enchant.Class.create(enchant.Sprite, {
            initialize: function(width, height) {
                enchant.Sprite.call(this, width, height);
           this.x = 1100;
           this.y = 600;
           this.vx = 0;
         this.anim   = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9];
        this.frame  = this.anim[0];
            this.image = game.assets['jugadorazul.png'];
        }  
        });
         var pelota = enchant.Class.create(enchant.Sprite, {
            initialize: function(width, height) {
                enchant.Sprite.call(this, width, height);
           this.x = Math.random() * (1200 - 750) + 700;
           this.y = Math.random() * (600 - 200) + 200;
           this.vx = 0;
        
            this.image = game.assets['pelota.png'];
        }  
        });
         var Player2 = enchant.Class.create(enchant.Sprite, {
            initialize: function(width, height) {
                enchant.Sprite.call(this, width, height);
           this.x = Math.random() * (1000 - 550) + 700;
           this.y = Math.random() * (900 - 200) + 200;
           this.vx = 0;
           this.scaleX =1;
         this.anim   = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9];
        this.frame  = this.anim[0];
            this.image = game.assets['jugadorazul.png'];
        }  
        });

           var estadio = enchant.Class.create(enchant.Sprite, {
            initialize: function(width, height) {
                enchant.Sprite.call(this, width, height);
               this.x=600;
               this.y=180;

                this.image = game.assets['estadiog.png'];
            }
        });
            
 var lab = new Label('Score :  0-0');
        lab.x = 1700;
        lab.y = 90;
        lab.color = 'white';
        lab.font = '40px Arial';
       var stage = new Group();
       var pel = new pelota(30,35);
                // Player クラスのクマを1匹作る
        var est = new estadio(1200,900);
        var player = new Player(50, 80);
       stage.addChild(lab);
     stage.addChild(est);
       stage.addChild(player);
       stage.addChild(pel);
   for (var i = 0; i < 4; i++) {
     var player2= new Player2(50,80);
     stage.addChild(player2);
   }

        // 画面に表示する (ひとつだけでる)
          game.rootScene.backgroundColor='#000000';
          game.rootScene.addChild(stage);
              for (var i = 0; i < 5; i++) {
           makeSmiley(player);
       }
       hora();
    
          // Reassign keys.
        game.keybind(87, 'up');     // 87 is the ASCII code for 'W'.
        game.keybind(65, 'left');   // 65 is the ASCII code for 'A'.
        game.keybind(83, 'down');   // 83 is the ASCII code for 'S'.
        game.keybind(68, 'right');  // 68 is the ASCII code for 'D'.

        // Add listener to the circle for the ENTER_FRAME event to move it.
        player.addEventListener(Event.ENTER_FRAME, function () {
            // right/left
       var score =0;
                 if (pel.x>1500 && pel.y>500 && pel.y<700) {
        game.assets['gol.wav'].play();
   
        if (pel.x>1700 && pel.y>500 && pel.y<700) {
        pel.x = Math.random() * (1200 - 750) + 700;
        pel.y = Math.random() * (600 - 200) + 300; 
        score += 1;
        lab.text = "Score :  " + score + "-0";
         }
      }
     if (game.input.left)  {
                
                if (610< player.x) {
                      player.x -= 3;
                player.scaleX = -1;
                  if (player.intersect(pel)) {
                    pel.x -= 4;
                  }
                }
                else{
                player.x-=0;
                }
            }
            //Right
            else if (game.input.right) {
              if (player.x<1700) {
                  player.x += 3;
                player.scaleX =  1;
                 if (player.intersect(pel)) {
                   if (game.input.a) {
                  
                     pel.x += 100;
                    
                    
                  }
                  else{

                    pel.x += 4;
                  }
                  }
              }else{
                player.x +=0;
              }
          
            }
           
        
            // up/down
            if (game.input.down && !game.input.up) {
                player.y += 4;
                 if (player.intersect(pel)) {
                    pel.y += 4;
                  }
                if (player.y  > 995) {
                    player.y = 990;

                }
            } else if (game.input.up && !game.input.down) {
                player.y -= 4;
                 if (player.intersect(pel)) {
                    pel.y -= 4;
                  }
                if (player.y < 200 ) {
                    player.y = 200;
                }
            }

            //Frame settings
    if (!game.input.left && !game.input.right && !game.input.up && !game.input.down) {
                player.frame = player.anim[0];            
            } else {
                player.frame = player.anim[player.age %  player.anim.length];            
            }
        });
    };


    game.start();


function  hora(){
   var countdown = false;
        var label = new Label();
        label.font = "100px Rockwell"
       label.color = "lightgray"
        label.x = 200;
        label.y = 44;
        game.rootScene.addChild(label);

        var sublabel = new Label();
        sublabel.font = "64px Rockwell"
        sublabel.color = "lightgray"
        sublabel.x = 450;
        sublabel.y = 80;
        game.rootScene.addChild(sublabel);

        first_frame = true;
        game.rootScene.on("enterframe", function(evt) {
            if(first_frame){
                start = +new Date();
                first_frame = false;
            }
            rest = time + Math.floor(((+new Date()) - start) / 100) ;
            label.text = getMinutes(rest) + ":" + getSeconds(rest);
            sublabel.text = "." + getSubSeconds(rest);
            if(rest == 450.00){
                game.end();
            }
        });
}
  function getSeconds(rest) {
        var text = "00" + Math.floor(rest / 10) % 60;
        return text.substr(text.length - 2, 2);
    }

    function getMinutes(rest) {
        var text = "00" + Math.floor(rest / 10 / 60);
        return text.substr(text.length - 2, 2);
    }

    function getSubSeconds(rest) {
        var text = "0" + rest % 10;
        return text.substr(text.length - 1, 1);
    }

 function makeSmiley(hero) {
        var smiley = new Sprite(44,80);
        smiley.image = game.assets['jugadorbr.png'];
        smiley.anim   = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9];
        smiley.frame  = smiley.anim[0];
        smiley.scaleX=-1;
        // Position smiley in a random corner.

         smiley.x = Math.random() * (1700 - 1200) + 1200;
           smiley.y = Math.random() * (900 - 400) + 400;


        // Add smiley to scene.
        game.rootScene.addChild(smiley);
        
        // Add properties to the smiley sprite to store the speed and direction.
        smiley.speed = 4;
        smiley.direction = 2 * Math.PI * Math.random();

        // Smiley event listeners.
        smiley.addEventListener(Event.ENTER_FRAME, function () {
            // Occasionally change direction 1/16 of a circle.

            if (Math.random() < 0.08) {
                    smiley.frame = smiley.anim[smiley.age %  smiley.anim.length]; 
                if (Math.random() < 0.5) {
                      smiley.frame = smiley.anim[smiley.age %  smiley.anim.length]; 
                    smiley.direction += Math.PI / 8;
                } else {
                      smiley.frame = smiley.anim[smiley.age %  smiley.anim.length]; 
                    smiley.direction -= Math.PI / 8;
                }
            }
            
            // Move in direction at speed.
            smiley.x += smiley.speed * Math.cos(smiley.direction);
            smiley.y -= smiley.speed * Math.sin(smiley.direction);
            
            // Wrap around
           // Bounce off boundaries
            if (smiley.x >= 1770 - smiley.width) {
              
                smiley.isMovingRight = false;

            } else if (smiley.x <= 650) {

                smiley.isMovingRight = true;
            }

            if (smiley.y >= 1060 - smiley.height) {
                smiley.isMovingDown = false;
            } else if (smiley.y <= 185) {
                smiley.isMovingDown = true;
            }

            // Do move.
            if (smiley.isMovingRight) {
                smiley.x += smiley.speed;

            } else {
                smiley.x -= smiley.speed;

            }

            if (smiley.isMovingDown) {
                smiley.y += smiley.speed;
            } else {
                smiley.y -= smiley.speed;
            }
            // Check for collision.
            if (smiley.intersect(hero)) {
                // Game over :-(
                hero.x -=smiley.speed;
            }
        });

        return smiley;
    }

};