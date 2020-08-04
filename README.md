# Guitar Trainer

https://guitar-trainer.herokuapp.com/

Guitar Trainer helps you learn guitar by practicing the intervals on the fretboard, individual notes, and different chords.
You can see your accuracy on different chords, intervals, and notes on the stats page.
Customized practice generates the notes or intervals that you tend to get wrong more often than the ones you have a higher accuracy on.

## Interval Trainer

Interval Trainer generates random intervals on the fretboard for each turn.
By clicked on the gear icon, the intervals can be customized to be either ascending, descending, or both, and you can choose which intervals you want to be generated

## Note Trainer

Note Trainer generates random notes on the fretboard and can also be enabled or disabled in the settings menu.

## Chord Trainer

Chord Trainer generates random chords on the fretboard.
In the settings menu (gear icon), you can enable or disable individual chord root notes, and choose whether to only generate major chords, minor chords, or both.

## Goals

The server keeps track of how many notes, intervals, and chords you've gotten correct each day.
In the goal panel, you can set a new goal that you want to reach for the day.

## Stats

The server also keeps track of all the notes, chords, and intervals you've ever gotten wrong or correct and shows graphs showing your accuracy in each area.
You can activate practice mode from the stats page or from the settings menu in the different game modes, and can be turned off in the settings menu.

## Built With

React/Redux used for the frontend
Node.js (Express.js) and MongoDB (mongoose) used for the backend
