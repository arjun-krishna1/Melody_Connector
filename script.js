music_vae = new mm.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_4bar_small_q2');
music_vae.initialize();

const player = new mm.Player();

const url1 = "music/another_one_bites_the_dust_simple.mid";
const url2 = "music/hey_jude.mid";

// vae_temperature = 1.5;

// function playVAE() {
//     if (player.isPlaying()) {
//         player.stop();
//         return;
//     }
//     music_vae
//     .sample(1, vae_temperature)
//     .then((sample) => player.start(sample[0]));
// }

let playButton = document.getElementById("playButton");

let seq1; let seq2;

async function loadSequences() {
  seq1 = await mm.urlToNoteSequence(url1);
  seq2 = await mm.urlToNoteSequence(url2);
}

loadSequences();

playButton.onclick = async function () {
  player.start(seq2);
};
