import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router'; // or useNavigation() from react-navigation

const api = axios.create({
    baseURL: 'https://testgithubactions-jx4x.onrender.com',
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig ): Promise<InternalAxiosRequestConfig> => {
    const token = await AsyncStorage.getItem('accessToken')

    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }

    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(token => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch(err => Promise.reject(err));
            }

            isRefreshing = true;

            try {
                const refreshToken = await AsyncStorage.getItem('refreshToken');

                console.log("Refresh Token: ", refreshToken)

                if (!refreshToken) throw new Error('No refresh token');

                const url = `https://testgithubactions-jx4x.onrender.com/auth/resignAccessToken?Refresh%20Token=${refreshToken}`

                const response: AxiosResponse<{ accessToken: string}> = await axios.post(url);
                
                console.log("Reassign response: ", response.data)

                const newAccessToken = response.data.accessToken;

                await AsyncStorage.setItem('accessToken', newAccessToken);

                api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                processQueue(null, newAccessToken);

                return api(originalRequest);
            } catch (err) {
                processQueue(err, null);
                await AsyncStorage.clear();
                router.replace('/(root)/(auth)/login'); // Or navigation.navigate('Login')
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;