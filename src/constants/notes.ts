export const OCTAVES = [
    'subcontra', 'contra', 'great', 'small', 'first', 'second', 'third',
    'fourth', 'fifth', 'sixth', 'seventh',
];
export const NOTES = [
    {
        'C0': 16.352, 'C0#': 17.324, 'D0': 18.354, 'D0#': 19.445,
        'E0': 20.602, 'F0': 21.827, 'F0#': 23.125, 'G0': 24.500,
        'G0#': 25.957, 'A0': 27.500, 'A0#': 29.135, 'B0': 30.868,
    },
    {
        'C1': 32.703, 'C1#': 34.648, 'D1': 36.708, 'D1#': 38.891,
        'E1': 41.203, 'F1': 43.654, 'F1#': 46.249, 'G1': 48.999,
        'G1#': 51.913, 'A1': 55.000, 'A1#': 58.270, 'B1': 61.735,
    },
    {
        'C2': 65.406, 'C2#': 69.296, 'D2': 73.416, 'D2#': 77.782,
        'E2': 82.407, 'F2': 87.307, 'F2#': 92.499, 'G2': 97.999,
        'G2#': 103.83, 'A2': 110.00, 'A2#': 116.54, 'B2': 123.47,
    },
    {
        'C3': 130.81, 'C3#': 138.59, 'D3': 146.83, 'D3#': 155.56,
        'E3': 164.81, 'F3': 174.61, 'F3#': 185.00, 'G3': 196.00,
        'G3#': 207.65, 'A3': 220.00, 'A3#': 233.08, 'B3': 246.94,
    },
    {
        'C4': 261.63, 'C4#': 277.18, 'D4': 293.66, 'D4#': 311.13,
        'E4': 329.63, 'F4': 349.23, 'F4#': 369.99, 'G4': 392.00,
        'G4#': 415.30, 'A4': 440.00, 'A4#': 466.16, 'B4': 493.88,
    },
    {
        'C5': 523.25, 'C5#': 554.37, 'D5': 587.33, 'D5#': 622.25,
        'E5': 659.26, 'F5': 698.46, 'F5#': 739.99, 'G5': 783.99,
        'G5#': 830.61, 'A5': 880.00, 'A5#': 932.33, 'B5': 987.77,
    },
    {
        'C6': 1046.5, 'C6#': 1108.7, 'D6': 1174.7, 'D6#': 1244.5,
        'E6': 1318.5, 'F6': 1396.9, 'F6#': 1480.0, 'G6': 1568.0,
        'G6#': 1661.2, 'A6': 1760.0, 'A6#': 1864.7, 'B6': 1975.5,
    },
    {
        'C7': 2093.0, 'C7#': 2217.5, 'D7': 2349.3, 'D7#': 2489.0,
        'E7': 2637.0, 'F7': 2793.8, 'F7#': 2960.0, 'G7': 3136.0,
        'G7#': 3322.4, 'A7': 3520.0, 'A7#': 3729.3, 'B7': 3951.1,
    },
    {
        'C8': 4186.0, 'C8#': 4434.9, 'D8': 4698.6, 'D8#': 4978.0,
        'E8': 5274.0, 'F8': 5587.7, 'F8#': 5919.9, 'G8': 6271.9,
        'G8#': 6644.9, 'A8': 7040.0, 'A8#': 7458.6, 'B8': 7902.1,
    },
    {
        'C9': 8372.0, 'C9#': 8869.8, 'D9': 9397.3, 'D9#': 9956.1,
        'E9': 10548.0, 'F9': 11175.0, 'F9#': 11840.0, 'G9': 12544.0,
        'G9#': 13290.0, 'A9': 14080.0, 'A9#': 14917.0, 'B9': 15804.0,
    },
    {
        'C10': 16744.0, 'C10#': 17739.7, 'D10': 18794.5, 'D10#': 19912.1,
        'E10': 21096.2, 'F10': 22350.6, 'F10#': 23679.6, 'G10': 25087.7,
        'G10#': 26579.5, 'A10': 28160.0, 'A10#': 29834.5, 'B10': 31608.5,
    },
];

// function getClosestNote(octave:number, value:any) {
//     let note = Object.keys(NOTES[octave])[0];
//     let frequency = NOTES[octave][note];
//     for (const key in NOTES[octave]) {
//         if (Math.abs(value - NOTES[octave][key]) < Math.abs(value - frequency)) {
//             frequency = NOTES[octave][key];
//             note = key;
//         }
//     }
//     return {
//         octave,
//         octaveName: OCTAVES[octave],
//         note,
//         frequency,
//     }
// }

// export function getNoteByValue(value:any) {
//     if (value < 31.7855) {
//         return getClosestNote(0, value);
//     } else if (value < 63.5705) {
//         return getClosestNote(1, value);
//     } else if (value < 127.14) {
//         return getClosestNote(2, value);
//     } else if (value < 254.285) {
//         return getClosestNote(3, value);
//     } else if (value < 508.565) {
//         return getClosestNote(4, value);
//     } else if (value < 1017.135) {
//         return getClosestNote(5, value);
//     } else if (value < 2034.25) {
//         return getClosestNote(6, value);
//     } else if (value < 4068.55) {
//         return getClosestNote(7, value);
//     } else if (value < 8137.05) {
//         return getClosestNote(8, value);
//     } else if (value < 16274) {
//         return getClosestNote(9, value);
//     } else {
//         return getClosestNote(10, value);
//     }    
// }