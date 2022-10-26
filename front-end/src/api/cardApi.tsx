import AxiosClient from "../shared/axios-client/axiosClient";
import { card, cardInfoResponse, cardCreateRequest, cardDeleteRequest } from "../shared/models/card";

const cardApi = {
    getCards: () => {
        return AxiosClient.get<cardInfoResponse[]>("/cards");
    },

    getCard: (id: string) => {
        return AxiosClient.get<cardInfoResponse>(`/cards/${id}`);
    },

    getCardByColumnId: (columnId: string) => {
        return AxiosClient.get<cardInfoResponse>(`/cards/column/${columnId}`);
    },
    
    
    createCardByColumnId: (request: cardCreateRequest, columnId: string) => {
        return AxiosClient.post<cardInfoResponse>(`/cards/column/${columnId}`, request);
    },

    createCard: (data: {}, p: string) => {
        return AxiosClient.post<cardInfoResponse>("/cards", data);
    }
}

export default cardApi;