music_vae = new mm.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_4bar_small_q2');
music_vae.initialize();

const vaePlayer = new mm.Player();

vae_temperature = 1.5;

function playVAE() {
    if (vaePlayer.isPlaying()) {
        vaePlayer.stop();
        return;
    }
    music_vae
    .sample(1, vae_temperature)
    .then((sample) => vaePlayer.start(sample[0]));
}

let playButton = document.getElementById("playButton");

playButton.onclick = function () {
  console.log("playing");
  const thisSeq = DRUMS;
  player.start(thisSeq);
  play(thisSeq);
};
