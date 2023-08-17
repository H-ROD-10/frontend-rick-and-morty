export interface Characters {
    characters:{
        info: Info;
        results: Character[];
    }
}

export interface Info {
    count: number;
    pages: number;
    next: string;
    prev: string;
}

export interface Character {
    id: number;
    name: string;
    image: string;
    species: string;
    status: string;
}