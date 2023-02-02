import {api} from "../api";
import {STORAGE} from "../../../constants/localStorage";

interface IPagination {
    page?: number;
    limit?: number;
}

export const templateRequests = {
    list: async ({page = 0, limit = 5}: IPagination): Promise<any> => {
        const token = window.localStorage.getItem(STORAGE.TOKEN);
        const response = await api.get(
            `/templates/?page${page}&limit${limit}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        return response.data;
    },
}
