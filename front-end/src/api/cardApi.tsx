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

    createCard: (data: cardCreateRequest) => {
        return AxiosClient.post<cardInfoResponse>("/cards", data);
    }
}

export default cardApi;