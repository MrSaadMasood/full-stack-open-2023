export interface DiaryEntry {
    id : string;
    date : string;
    weather : string;
    visibility : string;
}

export interface DataToSent {
    date : string,
    weather : string,
    comment? : string,
    visibility : string
}
