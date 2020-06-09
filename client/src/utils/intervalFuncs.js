export const notes = [
  'ER1', 'F1', 'Gb1', 'G1', 'Ab1', 'A1', 'Bb1', 'B1', 'C1', 'Db1', 'D1', 'Eb1', 'E1',
  'AR2', 'Bb2', 'B2', 'C2', 'Db2', 'D2', 'Eb2', 'E2', 'F2', 'Gb2', 'G2', 'Ab2', 'A2',
  'DR3', 'Eb3', 'E3', 'F3', 'Gb3', 'G3', 'Ab3', 'A3', 'Bb3', 'B3', 'C3', 'Db3', 'D3',
  'GR4', 'Ab4', 'A4', 'Bb4', 'B4', 'C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4',
  'BR5', 'C5', 'Db5', 'D5', 'Eb5', 'E5', 'F5', 'Gb5', 'G5', 'Ab5', 'A5', 'Bb5', 'B5',
  'ER6', 'F6', 'Gb6', 'G6', 'Ab6', 'A6', 'Bb6', 'B6', 'C6', 'Db6', 'D6', 'Eb6' ,'E6'
];

const intervals = ['b2', '2', 'b3', '3', '4', 'b5', '5', 'b6', '6', 'b7', '7', '8'];

const eScale = ['F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E'];

export const calcInterval = (root, other) => {
  // eg Ab6 -> Ab, ER1 -> E
  const rootNote = root.includes('R') || root.length === 2 ?
  root.slice(0, 1) : root.slice(0, 2);

  const otherNote = other.includes('R') || other.length === 2 ?
  other.slice(0, 1) : other.slice(0, 2);

  const rootPos = notes.indexOf(root);
  const otherPos = notes.indexOf(other);

  const rootScalePos = eScale.indexOf(rootNote);
  const otherScalePos = eScale.indexOf(otherNote);

  // octaves
  if (rootNote === otherNote) { return '8'; }
  // ascending interval
  if (rootPos < otherPos) {
    return intervals[Math.abs(11 - rootScalePos + otherScalePos) % 12];
  } else {
    // descending interval
    return intervals[Math.abs(11 - otherScalePos + rootScalePos) % 12];
  }
};

// continues finding 2 random notes till they aren't the same,
// and are at least 30 notes apart
export const getRandNotes = () => {
  let rand1 = Math.floor(Math.random() * 78);
  let rand2 = Math.floor(Math.random() * 78);
  while(rand1 === rand2 && Math.abs(rand1 - rand2) > 30) {
    rand2 = Math.floor(Math.random() * 78);
  }
  return [notes[rand1], notes[rand2]];
};

// return random notes & their interval
export const generateInterval = () => {
  const [note1, note2] = getRandNotes();
  const interval = calcInterval(note1, note2);
  return [note1, note2, interval];
};
