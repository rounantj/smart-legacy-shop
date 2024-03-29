import axios, { AxiosResponse } from 'axios';

export class ShipayPayment {
    private apiKey: string;
    private apiUrl: string;

    constructor(apiKey: string, apiUrl: string = 'https://api-staging.shipay.com.br') {
        this.apiKey = apiKey;
        this.apiUrl = apiUrl;
    }

    async authenticate(email: string, password: string): Promise<any> {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const response = await axios.post(
                `${this.apiUrl}/authenticate`,
                { email, password },
                config
            )
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async refreshToken(refresh_token: string): Promise<AxiosResponse> {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const response = await axios.post(`${this.apiUrl}/refresh`, { refresh_token }, config);
            return response;
        } catch (error) {
            throw error;
        }
    }


    async createPayment(order: any): Promise<AxiosResponse> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            };

            const response = await axios.post(`${this.apiUrl}/instant`, order, config);

            return response;
        } catch (error) {
            throw error;
        }
    }

    async getPayment(id: string): Promise<AxiosResponse> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`
                }
            };

            const response = await axios.get(`${this.apiUrl}/instant/${id}`, config);

            return response;
        } catch (error) {
            throw error;
        }
    }

    async cancelPayment(id: string): Promise<AxiosResponse> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`
                }
            };

            const response = await axios.delete(`${this.apiUrl}/instant/${id}`, config);

            return response;
        } catch (error) {
            throw error;
        }
    }

    async capturePayment(id: string, amount: number): Promise<AxiosResponse> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            };

            const response = await axios.post(`${this.apiUrl}/instant/${id}/capture`, { amount }, config);

            return response;
        } catch (error) {
            throw error;
        }
    }

    async refundPayment(id: string, amount: number): Promise<AxiosResponse> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            };

            const response = await axios.post(`${this.apiUrl}/instant/${id}/refund`, { amount }, config);

            return response;
        } catch (error) {
            throw error;
        }
    }

    async listPaymentsByDate(start_date: string, end_date: string, limit: number = 10, offset: number = 0): Promise<AxiosResponse> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`
                },
                params: {
                    start_date: start_date,
                    end_date: end_date,
                    limit: limit,
                    offset: offset
                }
            };

            const response = await axios.get(`${this.apiUrl}/instant`, config);

            return response;
        } catch (error) {
            throw error;
        }
    }


}
