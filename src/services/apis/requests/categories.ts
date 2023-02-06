import {STORAGE} from "../../../constants/localStorage";
import {api} from "../api";

export const categoriesRequest = {
    list: async (): Promise<any> => {
        const token = window.localStorage.getItem(STORAGE.TOKEN);
        const response = await api.get(
            `/categories`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        return response.data;
    },
}
