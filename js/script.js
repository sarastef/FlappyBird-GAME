$(function () {

    //Variables à utiliser
    var container = $('#container');
    var bird = $('#bird');
    var pole = $('.pole');
    var pole_1 = $('#pipe1');
    var pole_2 = $('#pipe2');
    var score = $('#score');
    var speed_span = $('#speed');
    var restart_btn = $('#restart_btn');

    //Variables avec des valeurs init
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var pole_width = parseInt(pole.width());
    var pole_initial_position = parseInt(pole.css('right'));
    var pole_initial_height = parseInt(pole.css('height'));
    var bird_left = parseInt(bird.css('left'));
    var bird_height = parseInt(bird.height());
    var speed = 10;

    //Variables du jeux
    var go_up = false;
    var score_updated = false;
    var game_over = false;


    var the_game = setInterval(function () {

        if (collision(bird, pole_1) || collision(bird, pole_2) || parseInt(bird.css('top')) <= 0 || parseInt(bird.css('top')) > container_height - bird_height) {

            gameOver();

        } else {

            var pole_current_position = parseInt(pole.css('right'));

            //mettre à jour le score lorsque les obstacles ont passé l'oiseau avec succès
            if (pole_current_position > container_width - bird_left) {
                if (score_updated === false) {
                    score.text(parseInt(score.text()) + 1);
                    score_updated = true;
                }
            }

            //vérifier si les obstacles sont sortis dehors du conteneur

            if (pole_current_position+ pole_width> container_width) {
            
               // pole.css("opacity","0");
                //Math.floor(100+(Math.random()*400)
                var new_height = parseInt(Math.random() * 200);

                //changement de la taille de chaque pipe
                pole_1.css('height', pole_initial_height + new_height);
                pole_2.css('height', pole_initial_height - new_height);

                //increment la vitesse
                speed = speed + 1;
                speed_span.text(speed);

                score_updated = false;

                pole_current_position = pole_initial_position;
            }

            //movements des obstacles
            pole.css('right', pole_current_position + speed);

            /*Si le joueur arret de jouer l'oiseu  */
            if (go_up === false) {
                go_down();
            }
        }

    }, 40);

    /*Mouvement du l'oiseau avec space*/

    $(document).on('keydown', function (e) {
        var key = e.keyCode;
        if (key === 32 && go_up === false && game_over === false) {
            go_up = setInterval(up, 50);
        }
    });

    $(document).on('keyup', function (e) {
        var key = e.keyCode;
        if (key === 32) {
            clearInterval(go_up);
            go_up = false;
        }
    });

    /*-----------------------------------------------------------------------
        function:go_down
        cette fonction aumente le top de l'oiseau.
        Permet de montrer que l'oiseau est en train de tomber sur le seul    
    -------------------------------------------------------------------------*/

    function go_down() {
        bird.css('top', parseInt(bird.css('top')) + 5);
    }

    /*-----------------------------------------------------------------------
        function:up
        cette fonction diminue le top de l'oiseau pour donner l'effet de sauter
    -------------------------------------------------------------------------*/

    function up() {
        bird.css('top', parseInt(bird.css('top')) - 10);
    }

    /*-----------------------------------------------------------------------
        function:gameOver
        cette fonction arret le jeu avec.
        Permet de montrer un message:Game Over vec le score final du joueur     
    -------------------------------------------------------------------------*/
    function gameOver() {
        clearInterval(the_game);
        game_over = true;
        restart_btn.slideDown();
        $("#gameOver").css("zIndex","100");
        $("#gameOver").css("opacity","1");
    }

    /* Rédemarrer le jeu */
    restart_btn.click(function () {
        location.reload();
    });


    /*-----------------------------------------------------------------------
        function:collision
        paramètres: div1(le joueur), div2(obstacle)
        return: valeur de type booléen
        true: cas si le joueur tombe ou frappe avec 1 obstacle
        false: Il n'y a pas des collition

    -------------------------------------------------------------------------*/
    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2){
            return false;
        }  
        return true;
    }



});
