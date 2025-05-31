export interface RecordType {
    fields: string[];
}

export interface GetRecordsAnswer extends APIAnswer {
    records: RecordType[] | undefined;
}

export interface PostRecordAnswer extends APIAnswer {
    record: RecordType | undefined;
}

export interface APIAnswer {
    status: number;
}
