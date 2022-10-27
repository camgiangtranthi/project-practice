import AxiosClient from "../shared/axios-client/axiosClient";
import { cardInfoResponse, cardCreateRequest, cardDeleteRequest } from "../shared/models/card";

const cardApi = {
    getCards: () => {
        return AxiosClient.get<cardInfoResponse[]>("/cards");
    },
    
    createCardByColumnId: (request: cardCreateRequest, columnId: string) => {
        return AxiosClient.post<cardInfoResponse>(`/cards/columnId/${columnId}`, request);
    },

    updateCard: (id: string, data: cardCreateRequest) => {
        return AxiosClient.post<cardInfoResponse>(`/cards/${id}`, {...data});
    },

    deleteCard: (id: string) => {
        return AxiosClient.delete<cardDeleteRequest>(`/cards/${id}`);
    }
}

export default cardApi;