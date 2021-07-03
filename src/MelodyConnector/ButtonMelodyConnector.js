import Button from '@material-ui/core/Button';
import './ButtonMelodyConnector.css';

const mvae = require('@magenta/music/node/music_vae');
const core = require('@magenta/music/node/core');

const vae = new mvae.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_4bar_small_q2');
vae.initialize();

const player = new mvae.Player();

const url1 = "music/another_one_bites_the_dust_simple.mid";
const url2 = "music/hey_jude.mid";

let seq1; let seq2;

async function loadSequences() {
  seq1 = await core.urlToNoteSequence(url1);
  seq2 = await core.urlToNoteSequence(url2);
}

async function connectMelodies() {
  await loadSequences();
  const quantSeq1 = core.sequences.quantizeNoteSequence(seq1, 4);
  const quantSeq2 = core.sequences.quantizeNoteSequence(seq2, 4);
  
  vae.interpolate([quantSeq1, quantSeq2], 4).then((sample) => {
    const concatenated = core.sequences.concatenate(sample);
    player.start(concatenated);
  });
}

async function ButtonMelodyConnector() {
  return (
    <Button variant="contained" color="primary" onClick={connectMelodies}>
      Connect!
    </Button>
  );
}

export default ButtonMelodyConnector;
