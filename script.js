const music_vae = new mm.MusicVAE(
  "https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_4bar_small_q2"
);
music_vae.initialize();

//https://bitmidi.com/
const vaePlayer = new mm.Player();
// https://storage.googleapis.com/pub-tools-public-publication-data/pdf/1534d19cec7407a1fe432d0b7afe83d46615e015.pdf
function playInterpolation(player, url1, url2) {
  //stop if already playing
  if (player.isPlaying()) {
    player.stop();
    return;
  }

  const noteSeq1 = mm.urlToNoteSequence(url1);
  const noteSeq2 = mm.urlToNoteSequence(url2);

  // Music VAE requires quantized melodies, so quantize them first.
  const quantSeq1 = mm.sequences.quantizeNoteSequence(noteSeq1, 4);
  const quantSeq2 = mm.sequences.quantizeNoteSequence(noteSeq2, 4);
  music_vae.interpolate([quantSeq1, quantSeq2], 4).then((sample) => {
    const concatenated = mm.sequences.concatenate(sample);
    player.start(concatenated);
  });
}

let playButton = document.getElementById("playButton");

const rickUrl = "https://bitmidi.com/uploads/79829.mid";
const christmasUrl = "https://bitmidi.com/uploads/5065.mid";

playButton.onclick = function () {
  console.log("playing");
  playInterpolation(vaePlayer, rickUrl, christmasUrl);
};
