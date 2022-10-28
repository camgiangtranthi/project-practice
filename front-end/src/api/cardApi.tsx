import AxiosClient from "../shared/axios-client/axiosClient";
import {cardInfoResponse, cardCreateRequest, cardDeleteRequest, cardUpdateRequest} from "../shared/models/card";

const cardApi = {
    getCards: () => {
        return AxiosClient.get<cardInfoResponse[]>("/cards");
    },

    getCardById: (id: string) => {
        return AxiosClient.get<cardInfoResponse>(`/cards/${id}`);
    },
    
    createCardByColumnId: (request: cardCreateRequest, columnId: string) => {
        return AxiosClient.post<cardInfoResponse>(`/cards/columnId/${columnId}`, request);
    },

    updateCard: (id: string, data: cardCreateRequest) => {
        return AxiosClient.post<cardInfoResponse>(`/cards/${id}`, {...data});
    },

    updateCardDetail: (id: string, data: cardUpdateRequest) => {
        return AxiosClient.post<cardInfoResponse>(`/cards/${id}`, {...data});
    },

    deleteCard: (id: string) => {
        return AxiosClient.delete<cardDeleteRequest>(`/cards/${id}`);
    }
}

export default cardApi;