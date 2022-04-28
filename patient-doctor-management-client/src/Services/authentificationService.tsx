import axios, { AxiosResponse } from "axios";
import { IRegisterDTO } from "../DTO/RegisterDTO";
import { BASE_URL } from "./constants";

export const isUserLoggedIn = (): boolean => {
    return localStorage.getItem('userType') != null;
}

export const RegisterUser = (registerDTO: IRegisterDTO): Promise<AxiosResponse<any, any>> => {
    return axios.post(`${BASE_URL}Authorization/register`, registerDTO);
}

export const LogoutUser = (): Promise<AxiosResponse<any, any>> => {
    return axios.post(`${BASE_URL}Authorization/logout`);
}