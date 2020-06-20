import { aScale, intervals } from './intervalFuncs';

const colors = ['rgb(213, 31, 31)', 'rgb(226, 99, 41)', 'rgb(221, 140, 24)', 'rgb(231, 222, 63)', 'rgb(85, 205, 46)'];

export const createNoteOptions = (notesCorrect, notesWrong) => {
  // eg: [10, 20, 31, etc...];
  const notePerc = aScale.map(key => {
    let total = notesCorrect[key] + notesWrong[key];
    return total === 0 ? 0 : +((notesCorrect[key] / total) * 100).toFixed(2);
  });

  // red if <20%, red-orange if <40%, orange if <60%, yellow if <80%, green if >80%
  const noteColors = notePerc.map((y, i) => (
    y < 20 ? colors[0] : y < 40 ? colors[1] : y < 60 ? colors[2] : y < 80 ? colors[3] : colors[4]
  ));

  const noteData = aScale.map((note, i) => ({ label: note, y: notePerc[i], color: noteColors[i] }));

  const noteOptions = {
    animationEnabled: true,
    theme: 'light2',
    title: { text: 'Note Accuracy' },
    axisY: { valueFormatString: "0'%'", maximum: 100 },
    axisX: { interval: 1 },
    exportEnabled: false,
    data: [{
      type: 'column',
      indexLabelFontColor: '#5A5757',
      indexLabelPlacement: 'outside',
      toolTipContent: "{label}: {y}%",
      dataPoints: noteData
    }]
  };

  return noteOptions;
};

export const createIntOptions = (intervalsCorrect, intervalsWrong) => {
  const intPerc = intervals.map(int => {
    let total = intervalsCorrect[int] + intervalsWrong[int];
    return total === 0 ? 0 : +((intervalsCorrect[int] / total) * 100).toFixed(2);
  });

  const intColors = intPerc.map((y, i) => (
    y < 20 ? colors[0] : y < 40 ? colors[1] : y < 60 ? colors[2] : y < 80 ? colors[3] : colors[4]
  ));

  const intervalData = intervals.map((interval, i) => ({ label: interval, y: intPerc[i], color: intColors[i] }));

  const intervalOptions = {
		animationEnabled: true,
		theme: 'light2',
		title: { text: 'Interval Accuracy' },
    axisY: { valueFormatString: "0'%'", maximum: 100 },
    axisX: { interval: 1 },
    exportEnabled: false,
		data: [{
			type: 'column',
			indexLabelFontColor: '#5A5757',
			indexLabelPlacement: 'outside',
      toolTipContent: "{label}: {y}%",
      dataPoints: intervalData
		}]
	};

  return intervalOptions;
};

export const initialIntervals = {
  'b2': 0,
  '2': 0,
  'b3': 0,
  '3': 0,
  '4': 0,
  'b5': 0,
  '5': 0,
  'b6': 0,
  '6': 0,
  'b7': 0,
  '7': 0,
  '8': 0
};

export const initialNotes = {
  'A': 0,
  'Bb': 0,
  'B': 0,
  'C': 0,
  'Db': 0,
  'D': 0,
  'Eb': 0,
  'E': 0,
  'F': 0,
  'Gb': 0,
  'G': 0,
  'Ab': 0
};
