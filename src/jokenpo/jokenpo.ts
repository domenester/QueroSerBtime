import { IJoKenPoPlay, IPossibilities, PlayTypes, ResultsTypes } from './jokenpo.interface';

export default class JoKenPoPlay implements IJoKenPoPlay {

    possibilities: IPossibilities = {
        rock: {
            rock: 'draw', sissors: 'win', paper: 'lose',
        },
        sissors: {
            rock: 'lose', sissors: 'draw', paper: 'win',
        },
        paper: {
            rock: 'win', sissors: 'lose', paper: 'draw',
        },
    };

    constructor( public firstPlay: PlayTypes, public secondPlay: PlayTypes ) { }

    result: () => ResultsTypes = () => this.possibilities[this.firstPlay.toString()][this.secondPlay.toString()];
}
