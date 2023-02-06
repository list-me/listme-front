/* eslint-disable */
import {api} from "../api";

interface IAuthLogin {
    email: string;
    password: string;
}

export const authRequests = {
    login: async ({email, password}: IAuthLogin): Promise<any> => {
        const response = await api.post(
            `/login`,
            {email: email, password: password},
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        return response.data;
    },
}
