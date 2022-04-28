import axios, { AxiosResponse } from "axios";
import { ILoginDTO } from "../DTO/LoginDTO";
import { IRegisterDTO } from "../DTO/RegisterDTO";

const BASE_URL = "https://localhost:44368/api/";

export namespace AuthorizationService {
    export const IsUserLoggedIn = (): boolean => {
        return localStorage.getItem('userType') != null;
    }

    export const LoginUser =(loginDTO: ILoginDTO) => {
        return axios.post(`${BASE_URL}Authorization/login`, loginDTO);
    }

    export const RegisterUser = (registerDTO: IRegisterDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Authorization/register`, registerDTO);
    }

    export const LogoutUser = (): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Authorization/logout`);
    }
}