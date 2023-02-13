import {api} from "../api";
import {STORAGE} from "../../../constants/localStorage";

interface IPagination {
    page?: number;
    limit?: number;
}

export const productRequests = {
    list: async ({page = 0, limit = 5}: IPagination, templateId?: string): Promise<any> => {
        const token = window.localStorage.getItem(STORAGE.TOKEN);
        const response = await api.get(
            `/products/?page${page}&limit${limit}&product_template_id=${templateId}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        return response.data;
    },
}
