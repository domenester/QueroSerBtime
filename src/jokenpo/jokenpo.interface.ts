export type PlayTypes = 'rock' | 'sissors' | 'paper';

export type ResultsTypes = 'win' | 'lose' | 'draw';

export type ResultsStatus = 'active' | 'inactive';

export interface IPossibilitie {
    rock: ResultsTypes;
    sissors: ResultsTypes;
    paper: ResultsTypes;
}

export interface IPossibilities {
    rock: IPossibilitie;
    sissors: IPossibilitie;
    paper: IPossibilitie;
}

export interface IJoKenPoPlay {
    firstPlay: PlayTypes;
    secondPlay: PlayTypes;
    possibilities: IPossibilities;
    result: () => ResultsTypes;
}
