enchant();
window.onload = function() {
    var game = new Core(1000, 500);

    game.preload('chara1.png','estadio.png');
    // chara1.png を読み込む
    
    game.onload = function() {
        // Bear クラス (パペット) をつくる
        var Player = enchant.Class.create(enchant.Sprite, {
            initialize: function(width, height) {
                enchant.Sprite.call(this, width, height);
           this.x = 300;
           this.y = 150;
           this.vx = 0;
         this.anim   = [0, 1, 0, 2];
        this.frame  = this.anim[0];
            this.image = game.assets['chara1.png'];
        }  
        });

           var estadio = enchant.Class.create(enchant.Sprite, {
            initialize: function(width, height) {
                enchant.Sprite.call(this, width, height);
               this.x=170;
               this.y=50;

                this.image = game.assets['estadio.png'];
            }
        });
            

       var stage = new Group();
                // Player クラスのクマを1匹作る
        var est = new estadio(674,380);
        var player = new Player(32, 32);
     stage.addChild(est);
       stage.addChild(player);
var circleSpeed = 5; 
        // 画面に表示する (ひとつだけでる)
          game.rootScene.backgroundColor='#000000';
          game.rootScene.addChild(stage);
          // Reassign keys.
        game.keybind(87, 'up');     // 87 is the ASCII code for 'W'.
        game.keybind(65, 'left');   // 65 is the ASCII code for 'A'.
        game.keybind(83, 'down');   // 83 is the ASCII code for 'S'.
        game.keybind(68, 'right');  // 68 is the ASCII code for 'D'.

        // Add listener to the circle for the ENTER_FRAME event to move it.
        player.addEventListener(Event.ENTER_FRAME, function () {
            // right/left
     if (game.input.left)  {
                
                if (170< player.x) {
                      player.x -= 3;
                player.scaleX = -1;
                  
                }
                else{
  player.x-=0;
                }
            }
            //Right
            else if (game.input.right) {
                player.x += 3;
                player.scaleX =  1;
            }
           //Frame settings
            if (!game.input.left && !game.input.right && !game.input.up && !game.input.down) {
                player.frame = player.anim[0];            
            } else {
                player.frame = player.anim[player.age %  player.anim.length];            
            }
            // up/down
            if (game.input.down && !game.input.up) {
                player.y += circleSpeed;
                if (player.y > game.height - player.height) {
                    player.y = game.height - player.height;
                }
            } else if (game.input.up && !game.input.down) {
                player.y -= circleSpeed;
                if (player.y < 0 ) {
                    player.y = 0;
                }
            }

        });
    };


    game.start();
};