export interface card {
    id: string;
    title: string;
    description: string;
    start_date: string;
    due_date: string;
    status: boolean;
    card: any;
}

export interface cardInfoResponse extends card {
    id: string;
    title: string;
    description: string;
    start_date: string;
    due_date: string;
    status: boolean;
}

export interface cardResponse extends card {
    id: string;
}

export interface cardCreateRequest {
    id: string;
    title: string;
    column_id: string;
}

export interface cardUpdateRequest {
    title: string;
    description: string;
    start_date: string;
    due_date: string;
    status: boolean;
}

export interface cardDeleteRequest {
    id: string;
}