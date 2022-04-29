import axios, { AxiosResponse } from "axios";
import { IAddSpecializationDTO } from "../DTO/AddSpecializationDTO";
import { IUpdateSpecializationDTO } from "../DTO/IUpdateSpecializationDTO";
import { ILoginDTO } from "../DTO/LoginDTO";
import { IRegisterDTO } from "../DTO/RegisterDTO";

const BASE_URL = "https://localhost:44368/api/";

export namespace AuthorizationService {
    export const IsUserLoggedIn = (): boolean => {
        return localStorage.getItem('jwt') != null;
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

export namespace SpecializationService {
    export const AddSpecialization = (addSpecializationDTO: IAddSpecializationDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Specializations/add`, addSpecializationDTO);
    }

    export const UpdateSpecialization = (updateSpecializationDTO: IUpdateSpecializationDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Specializations/update`, updateSpecializationDTO);
    }

    export const GetSpecializationsNames = (): Promise<AxiosResponse<any, any>> => {
        return axios.get(`${BASE_URL}Specializations/all`);
    }
}