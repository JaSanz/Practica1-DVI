/**
 * MemoryGame es la clase que representa nuestro juego. Contiene un array con la cartas del juego,
 * el número de cartas encontradas (para saber cuándo hemos terminado el juego) y un texto con el mensaje
 * que indica en qué estado se encuentra el juego
 */
var MemoryGame = MemoryGame || {};

MemoryGame = function(gs) {

    this.gs = gs;

    this.numCartas = 16;
    this.cards = new Array(this.numCartas);
    this.msg = "Juego de parejas";
    this.parejasRestantes = 8;

    this.volteadas = 0;
    this.card1, this.card2;
    this.blockClicks = false;

    /**
     * Inicializa el juego creando las cartas (2 de cada tipo), desordenándolas y comenzando 
     * el bucle de juego.
     */
    this.initGame = function() {
        var nombres = ["8-ball", "potato", "dinosaur", "kronos", "rocket", "unicorn", "guy", "zeppelin"];

        for(var i = 0; i < nombres.length; ++i) {
            this.cards[i*2] = new MemoryGameCard(nombres[i]);
            this.cards[i*2 + 1] = new MemoryGameCard(nombres[i]);
        }
        this.shuffle(this.cards);
        this.loop();
    }

    /**
     * Aleatoriza el array de las cartas
     * @param {array} cards es un array con las cartas
     */
    this.shuffle = function(cards) {
        var i, aux, rand;
        for(i = 0; i < cards.length; ++i) {
            rand = Math.floor(Math.random() * cards.length);
            aux = cards[rand];
            this.cards[rand] = this.cards[i];
            this.cards[i] = aux;
        }
        return cards;
    }

    /**
     * Dibuja el juego, esto es:
     *  (1) escribe el mensaje con el estado actual del juego.
     *  (2) pide a cada una de las cartas del tablero que se dibujen.
     */
    this.draw = function() {
        this.gs.drawMessage(this.msg);
        for(var i = 0; i < this.numCartas; ++i)
            this.cards[i].draw(gs,i);
    }

    /**
     * Es el bucle del juego, que llama al método draw cada 16ms (equivalente a unos 60fps).
     */
    this.loop = function() {
        setInterval(() => {
                this.draw();
        }, 16);
    }

    /**
     * Este método se llama cada vez que el jugador pulsa sobre alguna de las cartas 
     * (identificada por el número que ocupan en el array de cartas del juego). Es el responsable 
     * de voltear la carta y, si hay dos volteadas, comprobar si son la misma (en cuyo caso las 
     * marcará como encontradas). En caso de no ser la misma las volverá a poner boca abajo.
     */
    this.onClick = function(cardId) {

        //Comprobamos que no se pulse fuera del tablero
        if(cardId < 0 || cardId == null)
            return null;

        //Si la carta no ha sido encontrada, realizamos acciones para voltearla y poder comprobar si es pareja más tarde
        if(this.cards[cardId].getEstado() != 2 && this.blockClicks != true) {
            //Contamos cuantas se han volteado
            if(this.cards[cardId].getEstado() == 0)
                ++this.volteadas;
            else if(this.cards[cardId].getEstado() == 1)
                --this.volteadas;

            //Guardamos el número de la carta
            if(this.volteadas % 2 == 0)
                this.card1 = cardId;
            else
                this.card2 = cardId;
            
            //Volteamos
            this.cards[cardId].flip();
        }

        //Comprobamos si es pareja
        if(this.volteadas == 2 && this.blockClicks != true) {
            if(this.cards[this.card1].compareTo(this.cards[this.card2])) {
                this.cards[this.card1].found();
                this.cards[this.card2].found();
                this.msg = "¡Pareja!";
                --this.parejasRestantes;
                }
            else {
                this.msg = "Vuelve a intentarlo";
                this.blockClicks = true;
                setTimeout(() => {
                    this.cards[this.card1].flip();
                    this.cards[this.card2].flip();
                    this.blockClicks = false;
                }, 1000);
            }
            this.volteadas = 0;
        }

        //Si todas las parejas se han formado, mostramos mensaje de victoria
        if(this.parejasRestantes == 0)
            this.msg = "¡Has ganado!"
    }
};



/**
 * Constructora de las cartas del juego. Recibe como parámetro el nombre del sprite que representa la carta.
 * Dos cartas serán iguales si tienen el mismo sprite.
 * La carta puede guardar la posición que ocupa dentro del tablero para luego poder dibujarse
 * @param {string} id Nombre del sprite que representa la carta
 */
MemoryGameCard = function(id) {

    this.id = id;

    var estado = {
        bocaAbajo : 0,
        bocaArriba: 1,
        encontrada: 2
    };

    this.estadoActual = estado.bocaAbajo;

    /**
     * Da la vuelta a la carta, cambiando el estado de la misma.
     */
    this.flip = function() {
        if(this.estadoActual == estado.bocaAbajo)
            this.estadoActual = estado.bocaArriba;
        else if(this.estadoActual == estado.bocaArriba)
            this.estadoActual = estado.bocaAbajo;
    }

    /**
     *  Marca una carta como encontrada, cambiando el estado de la misma.
     */
    this.found = function() {
        this.estadoActual = estado.encontrada;
    }

    this.getEstado = function() {
        return this.estadoActual;
    }

    /**
     * Compara dos cartas, devolviendo true si ambas representan la misma carta.
     * @param {MemoryGameCard} otherCard Otra carta
     */
    this.compareTo = function(otherCard) {
        return this.id == otherCard.id;
    }

    /**
     * Dibuja la carta de acuerdo al estado en el que se encuentra. Recibe como parámetros 
     * el servidor gráfico y la posición en la que se encuentra en el array de cartas del 
     * juego (necesario para dibujar una carta).
     */
    this.draw = function(gs, pos) {
        if(this.estadoActual == estado.bocaAbajo)
            gs.draw("back", pos)
        else 
            gs.draw(this.id,pos);
    }
};
