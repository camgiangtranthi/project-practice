export interface card {
    id: string;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    status: boolean;
    card: any;
}

export interface cardInfoResponse extends card {
    id: string;
    title: string;
    description: string;
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
    id: any;
    title: string;
    description: string;
}

export interface cardDeleteRequest {
    id: string;
}