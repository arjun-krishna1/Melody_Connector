vae = new mm.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_4bar_small_q2');
vae.initialize();

const player = new mm.Player();

const url1 = "music/another_one_bites_the_dust_simple.mid";
const url2 = "music/hey_jude.mid";

function createMelodySegue(vae, seq1, seq2) {
  const quantSeq1 = mm.sequences.quantizeNoteSequence(seq1, 4);
  const quantSeq2 = mm.sequences.quantizeNoteSequence(seq2, 4);
  
  return vae.interpolate([quantSeq1, quantSeq2], 4)
}

let playButton = document.getElementById("playButton");

let seq1; let seq2;

async function loadSequences() {
  seq1 = await mm.urlToNoteSequence(url1);
  seq2 = await mm.urlToNoteSequence(url2);
}

loadSequences();

playButton.onclick = async function () {
  await loadSequences();
  createMelodySegue(vae, seq1, seq2).then((sample) => {
    const concatenated = mm.sequences.concatenate(sample);
    player.start(concatenated);
  });
};
