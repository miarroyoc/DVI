import { datosConfig } from "./config.js";

// Escena final del juego que muestra la puntuacion 
// que se ha obtenido al final

// Si pulsas el boton de volver atras te vuelve al inicio.

// con setInteractive() hacemos que lo textos funciones como botones
// con pointOver y pointerOut hacemos que el texto se agrande cuando pasamos el raton por encima

export default class FinalkillTrump extends Phaser.Scene {
    constructor() {
        super({ key: 'FinalkillTrump' });
    }
    init(data) {
        this.puntuacion = data.score;
        this.life = data.vidas;
    }
    create() {

        let width = this.scale.width;
        let height = this.scale.height;
        this.add.image(width / 2, height / 2, 'final').setOrigin(0.5).setDepth(0).setScale(2.3);
        let gobackButton = this.add.text(width - 200, height - 100, '<Volver al inicio>',
            {
                fontSize: '30px',
                fontStyle: 'bold',
                fontFaminly: 'monospace',
                fill: "#094ec0"
            }).setDepth(1).setOrigin(0.5);
        this.f = this.add.text(width - 200, height - 20, 'Press F to pay respects',
            {
                fontSize: '20px',
                fontStyle: 'bold',
                fontFaminly: 'monospace',
                fill: "#FD0505"
            }).setDepth(1).setOrigin(0.5);

        this.add.image(width / 2 + 100, height / 2 - 190, 'finTirania').setDepth(1).setOrigin(0.5).setScale(1);
        this.add.image(230, height - 100, 'banderaNegra').setDepth(1).setOrigin(0.5).setScale(2);
        this.add.image(300, height - 100, 'honor').setDepth(2).setOrigin(0.5).setScale(0.8);
        this.vida = this.add.text(width - 300, height - 250, `Puntuacion final : ${this.puntuacion}`,
            {
                fontSize: '30px',
                fontStyle: 'bold',
                fontFaminly: 'monospace',
                fill: "#00000"
            }).setDepth(1).setOrigin(0.5);
        this.vidas = this.add.text(width - 300, height - 200, `Vidas restantes: ${this.life} * 1000`,
            {
                fontSize: '30px',
                fontStyle: 'bold',
                fontFaminly: 'monospace',
                fill: "#00000"
            }).setDepth(1).setOrigin(0.5);
        let total = this.puntuacion + this.life * 1000;
        this.vidas = this.add.text(width - 300, height - 150, `Total : ${total} `,
            {
                fontSize: '30px',
                fontStyle: 'bold',
                fontFaminly: 'monospace',
                fill: "#00000"
            }).setDepth(1).setOrigin(0.5);
        this.nombres = this.add.text(width - 400, height - 40, 'Creado por Miguel Ángel Arroyo e Ignacio Baena Kuroda',
            {
                fontSize: '20px',
                fontStyle: 'bold',
                fontFaminly: 'monospace',
                fill: "FD0505"
            }).setDepth(1).setOrigin(0.5);

        if (datosConfig.music) {

            const musicConfig = datosConfig.musicConfig;
            this.music = this.sound.add("himno", musicConfig);
            this.music.play();
        }
        this.fkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);



        gobackButton.setInteractive();

        gobackButton.on('pointerover', function (value) {
            gobackButton.setScale(1.5);
        })

        gobackButton.on('pointerout', function (value) {
            gobackButton.setScale(1);
        })

        gobackButton.on('pointerup', function (value) {
            this.music.destroy();
            this.scene.start("inicio");
        }, this)
        this.add.image(0, 0, 'final').setOrigin(0.01).setDepth(0).setScale(1.75);
        this.nombres.setVisible(false);
    }
    update() {

        if (Phaser.Input.Keyboard.JustDown(this.fkey)) {
            this.nombres.setVisible(true);
            this.f.setVisible(false);
        }
    }
}