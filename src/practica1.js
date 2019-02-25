/**
 * MemoryGame es la clase que representa nuestro juego. Contiene un array con la cartas del juego,
 * el número de cartas encontradas (para saber cuándo hemos terminado el juego) y un texto con el mensaje
 * que indica en qué estado se encuentra el juego
 */
var MemoryGame = MemoryGame || {};

MemoryGame = function(gs) {

    this.gs = gs;
    this.numCartas = 16
    this.playing = true;
    this.pairsLeft = 8;
    this.cards = new Array(this.numCartas);

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
        for(var i = 0; i < this.numCartas; ++i)
            this.cards[i].draw(gs,i);
        loop();
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
            cards[rand] = cards[i];
            cards[i] = aux;
        }
        return cards;
    }

    /**
     * Dibuja el juego, esto es:
     *  (1) escribe el mensaje con el estado actual del juego.
     *  (2) pide a cada una de las cartas del tablero que se dibujen.
     */
    this.draw = function() {
        gs.draw(cards[0].nombre,i);
    }

    /**
     * Es el bucle del juego, que llama al método draw cada 16ms (equivalente a unos 60fps).
     */
    this.loop = function() {
        while(playing) {
            if(pairsLeft == 0)
                !playing;
        }
    }

    /**
     * Este método se llama cada vez que el jugador pulsa sobre alguna de las cartas 
     * (identificada por el número que ocupan en el array de cartas del juego). Es el responsable 
     * de voltear la carta y, si hay dos volteadas, comprobar si son la misma (en cuyo caso las 
     * marcará como encontradas). En caso de no ser la misma las volverá a poner boca abajo.
     */
    this.onClick = function(cardId) {

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

    /**
     * Da la vuelta a la carta, cambiando el estado de la misma.
     */
    this.flip = function() {

    }

    /**
     *  Marca una carta como encontrada, cambiando el estado de la misma.
     */
    this.found = function() {

    }

    /**
     * Compara dos cartas, devolviendo true si ambas representan la misma carta.
     */
    this.compareTo = function(otherCard) {

    }

    /**
     * Dibuja la carta de acuerdo al estado en el que se encuentra. Recibe como parámetros 
     * el servidor gráfico y la posición en la que se encuentra en el array de cartas del 
     * juego (necesario para dibujar una carta).
     */
    this.draw = function(gs, pos) {
        gs.draw(this.id,pos);
    }
};
