export interface Player {
    name: string;
    in?: number;
    out?:number;
    total?:number
}

export interface Games {
    id?: string;
    players: Array<Player>;
    tee: string;
}