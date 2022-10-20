import AxiosClient from "../shared/axios-client/axiosClient";
import { columnInfoResponse } from "../shared/models/column";

const columnApi = {
  getColumns: () => {
    return AxiosClient.get<columnInfoResponse[]>("/columns");
  },

  getColumn: (id: string) => {
    return AxiosClient.get<columnInfoResponse>(`/columns/${id}`);
  },

  createColumn: (title: string) => {
    return AxiosClient.post<columnInfoResponse>(`/columns`, { title });
  },

  updateColumn: (id: string, title: string) => {
    return AxiosClient.patch<columnInfoResponse>(`/columns/${id}`, { title });
  },

  deleteColumn: (id: string) => {
    return AxiosClient.delete<columnInfoResponse>(`/columns/${id}`);
  },
};

export default columnApi;
