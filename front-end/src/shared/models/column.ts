export interface column {
    id: string;
    title: string;
    order: number;
    onSave?: any,
}

export interface columnInfoResponse extends column {
    id: string;
    title: string;
}

export interface columnResponse extends column {
    id: string;
}

export interface columnCreateRequest {
    id: string;
    title: string;
}

export interface columnUpdateRequest {
    id: any;
    title: string;
}

export interface columnDeleteRequest {
    id: string;
}

export interface columnDetailProp {
    activeColumn: boolean;
    onAddNote: () => void;
}