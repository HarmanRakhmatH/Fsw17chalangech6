class Hasil {
    constructor(player) {
        this.player = player;
    }

    hasil(computer, player) {
        let hasil = null;
        const output = document.getElementById("idHasil");
        const bgHasil = document.getElementById("bgHasil");

        const playerWin = "Player 1 Win";
        const draw = "Draw";
        const comWin = "Com Win";

        if (computer === "gunting" && player === "gunting") hasil = draw;
        else if (computer === "gunting" && player === "kertas") hasil = comWin;
        else if (computer === "gunting" && player === "batu") hasil = playerWin;
        else if (computer === "kertas" && player === "gunting") hasil = playerWin;
        else if (computer === "kertas" && player === "kertas") hasil = draw;
        else if (computer === "kertas" && player === "batu") hasil = comWin;
        else if (computer === "batu" && player === "gunting") hasil = comWin;
        else if (computer === "batu" && player === "kertas") hasil = playerWin;
        else if (computer === "batu" && player === "batu") hasil = draw;
        else hasil = "hasil tidak diketahui";



        output.innerHTML = hasil;
        output.classList.add("result-text");
        bgHasil.classList.remove("play-game-vs");
        bgHasil.classList.add("play-game-result");

        if (hasil === "Draw") bgHasil.classList.add("draw");
        else bgHasil.classList.remove("draw");

        console.log(`Hasil: ${hasil}`);
    }

}

class PlayGame extends Hasil {
    constructor(player) {
        super(player);
    }

    #computer = (options) => {
        let random = Math.floor(Math.random() * options.length);
        let results = options[random];
        console.log(`Komputer: ${results}`);

        const batu = document.getElementById('comBatu');
        const kertas = document.getElementById('comKertas');
        const gunting = document.getElementById('comGunting');

        batu.classList.remove("active");
        kertas.classList.remove("active");
        gunting.classList.remove("active");

        if (results === "kertas") kertas.classList.add("active");
        else if (results === "batu") batu.classList.add("active");
        else gunting.classList.add("active");

        return results;
    };

    play() {

        let options = ["batu", "kertas", "gunting"];

        if (this.player !== null) {
            console.log(`Player: ${this.player}`);
            let player = this.player;
            let computer = this.#computer(options);
            super.hasil(computer, player);
        }
    }

}

const buttons = document.querySelectorAll("button");

var refresh = true;

buttons.forEach((button) => {
    button.addEventListener("click", function (event) {
        let dataPlayer = this.dataset.player;
        let playGame = new PlayGame(dataPlayer);

        if (refresh) {
            refresh = false;
            playGame.play();
        } else {
            console.log("refresh dulu dong");
            alert(
                "refresh dulu dong , dengan klik tombol refresh. Biar musuhmu siap, weheheeh."
            );
        }
    });
});

const refreshButtons = document.getElementById("refreshButton");

refreshButtons.addEventListener("click", function () {
    const output = document.getElementById("idHasil");
    const bgHasil = document.getElementById("bgHasil");

    const batu = document.getElementById("comBatu");
    const kertas = document.getElementById("comKertas");
    const gunting = document.getElementById("comGunting")

    batu.classList.remove("active");
    kertas.classList.remove("active");
    gunting.classList.remove("active");

    output.innerHTML = "VS";
    output.classList.remove("result-text");
    bgHasil.classList.remove("play-game-vs");
    bgHasil.classList.remove("play-game-result");

    refresh = true;
});