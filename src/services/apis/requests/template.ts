import {api} from "../api";

interface IPagination {
    page?: number;
    limit?: number;
}

export const templateRequests = {
    list: async ({page = 0, limit = 5}: IPagination): Promise<any> => {
        const response = await api.get(
            `/templates/?page${page}&limit${limit}`,
            {
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWdlbnQiLCJ1c2VySWQiOiIxMTUwZWIxZS1iNWQxLTQ0OTUtOGY4NC05NWVmNDNlZjk1ODQiLCJpYXQiOjE2NzQxNjU4NjQsImV4cCI6MTY3NDI1MjI2NH0.Ab_Zp2nCNjXwazqs6jtTOiS6ARsmO0bR7ROiBUznqzc`
                }
            }
        );

        return response.data;
    },
}
