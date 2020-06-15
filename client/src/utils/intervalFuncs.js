export const notes = [
  'ER1', 'F1', 'Gb1', 'G1', 'Ab1', 'A1', 'Bb1', 'B1', 'C1', 'Db1', 'D1', 'Eb1', 'E1',
  'AR2', 'Bb2', 'B2', 'C2', 'Db2', 'D2', 'Eb2', 'E2', 'F2', 'Gb2', 'G2', 'Ab2', 'A2',
  'DR3', 'Eb3', 'E3', 'F3', 'Gb3', 'G3', 'Ab3', 'A3', 'Bb3', 'B3', 'C3', 'Db3', 'D3',
  'GR4', 'Ab4', 'A4', 'Bb4', 'B4', 'C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4',
  'BR5', 'C5', 'Db5', 'D5', 'Eb5', 'E5', 'F5', 'Gb5', 'G5', 'Ab5', 'A5', 'Bb5', 'B5',
  'ER6', 'F6', 'Gb6', 'G6', 'Ab6', 'A6', 'Bb6', 'B6', 'C6', 'Db6', 'D6', 'Eb6' ,'E6'
];

export const getNoteShorthand = (note) => {
  return note.includes('R') || note.length === 2 ?
  note.slice(0, 1) : note.slice(0, 2);
};

export const intervals = ['b2', '2', 'b3', '3', '4', 'b5', '5', 'b6', '6', 'b7', '7', '8'];

const eScale = ['F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E'];

export const aScale = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'];

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

// takes optional arr of notes not to use
export const getRandNote = (disabledNotes) => {
  let rand = Math.floor(Math.random() * 78);
  if (!disabledNotes) { return notes[rand]; }
  while (disabledNotes.includes(getNoteShorthand(notes[rand]))) {
    rand = Math.floor(Math.random() * 78);
  }
  return notes[rand];
};

// continues finding 2 random notes till they aren't the same
// takes optional intervalType for ascending/descending intervals only
export const getRandNotes = (intervalType) => {
  let rand1 = Math.floor(Math.random() * 78);
  let rand2 = Math.floor(Math.random() * 78);
  if (intervalType === 'Ascending') {
    while(rand1 >= rand2) {
      rand1 = Math.floor(Math.random() * 78);
      rand2 = Math.floor(Math.random() * 78);
    }
  } else if (intervalType === 'Descending') {
    while(rand1 <= rand2) {
      rand1 = Math.floor(Math.random() * 78);
      rand2 = Math.floor(Math.random() * 78);
    }
  } else {
    while(rand1 === rand2) {
      rand1 = Math.floor(Math.random() * 78);
      rand2 = Math.floor(Math.random() * 78);
    }
  }
  return [notes[rand1], notes[rand2]];
};

// return random notes & their interval
// takes optional disabledIntervals which includes intervals not to use
export const generateInterval = (disabledIntervals, intervalType) => {
  let [note1, note2] = getRandNotes(intervalType);
  let interval = calcInterval(note1, note2);
  if (disabledIntervals.length > 0) {
    while (disabledIntervals.includes(interval)) {
      [note1, note2] = getRandNotes();
      interval = calcInterval(note1, note2);
    }
  }
  return [note1, note2, interval];
};

// returns 3 random notes & their chord name
// takes optional arr of notes not to use
// takes optional string of chordType to use (Major/Minor/Both)
export const getMajMinChord = (disabledRoots, chordType) => {
  const root = getRandNote(disabledRoots);
  let third = getRandNote();
  let fifth = getRandNote();
  const intervals = chordType === 'Both' ? ['b3', '3'] : chordType === 'Major' ? ['3'] : ['b3'];
  // interval bw root & third must be b3/3 & must be on diff strings
  while (!intervals.includes(calcInterval(root, third)) || third.slice(third.length - 1) === root.slice(root.length - 1)) {
    third = getRandNote();
  }
  // interval bw root & fifth must be 5 & fifth must be on diff string than root/third
  while (calcInterval(root, fifth) !== '5' || root.slice(root.length - 1) === fifth.slice(fifth.length - 1) ||
  fifth.slice(fifth.length - 1) === third.slice(third.length - 1)) {
    fifth = getRandNote();
  }
  const chord = calcInterval(root, third);
  return [root, third, fifth, chord];
}
