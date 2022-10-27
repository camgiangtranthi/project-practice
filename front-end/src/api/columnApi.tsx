import AxiosClient from "../shared/axios-client/axiosClient";
import {
    columnCreateRequest,
    columnInfoResponse,
} from "../shared/models/column";

const columnApi = {
    getColumns: () => {
        return AxiosClient.get<columnInfoResponse[]>("/columns");
    },

    getColumn: (id: string) => {
        return AxiosClient.get<columnInfoResponse>(`/columns/${id}`);
    },

    createColumn: (title: columnCreateRequest) => {
        return AxiosClient.post<columnInfoResponse>(`/columns`, { title });
    },

    updateColumn: (id: string, column: columnCreateRequest) => {
        return AxiosClient.post<columnInfoResponse>(`/columns/${id}`, {...column});
    },

    deleteColumn: (id: string) => {
        return AxiosClient.delete<columnInfoResponse>(`/columns/${id}`);
    },
};

export default columnApi;
