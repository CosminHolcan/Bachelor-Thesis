import axios, { AxiosResponse } from "axios";
import { IAddBaseDTO } from "../DTO/AddBaseDTO";
import { IAddSpecializationDTO } from "../DTO/AddSpecializationDTO";
import { IUpdateSpecializationDTO } from "../DTO/UpdateSpecializationDTO";
import { ILoginDTO } from "../DTO/LoginDTO";
import { IRegisterDTO } from "../DTO/RegisterDTO";
import { IUpdateBaseDTO } from "../DTO/UpdateBaseDTO";
import { IAddDoctorDTO } from "../DTO/AddDoctor";

const BASE_URL = "https://localhost:44368/api/";

export namespace AuthorizationService {
    export const LoginUser = (loginDTO: ILoginDTO) => {
        return axios.post(`${BASE_URL}Authorization/login`, loginDTO);
    }

    export const RegisterUser = (registerDTO: IRegisterDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Authorization/register`, registerDTO);
    }

    export const LogoutUser = (): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Authorization/logout`);
    }

    export const IsUserLoggedIn = (jwt: string): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Authorization/isUserLoggedIn`);
    }
}

export namespace SpecializationService {
    export const AddSpecialization = (addSpecializationDTO: IAddSpecializationDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Specializations/add`, addSpecializationDTO);
    }

    export const UpdateSpecialization = (updateSpecializationDTO: IUpdateSpecializationDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Specializations/update`, updateSpecializationDTO);
    }

    export const GetAllSpecializations = (): Promise<AxiosResponse<any, any>> => {
        return axios.get(`${BASE_URL}Specializations/all`);
    }
}

export namespace DiseasesService {
    export const AddDisease = (addDiseaseDTO: IAddBaseDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Diseases/add`, addDiseaseDTO);
    }

    export const UpdateDisease = (updateDiseaseDTO: IUpdateBaseDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Diseases/update`, updateDiseaseDTO);
    }

    export const GetAllDiseases = (): Promise<AxiosResponse<any, any>> => {
        return axios.get(`${BASE_URL}Diseases/all`);
    }
}

export namespace MedicinesService {
    export const AddMedicine = (addMedicineDTO: IAddBaseDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Medicines/add`, addMedicineDTO);
    }

    export const UpdateMedicine = (updateMedicineDTO: IUpdateBaseDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Medicines/update`, updateMedicineDTO);
    }

    export const GetAllMedicines = (): Promise<AxiosResponse<any, any>> => {
        return axios.get(`${BASE_URL}Medicines/all`);
    }
}

export namespace DoctorsService {
    export const AddDoctor = (addDoctorDTO: IAddDoctorDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Doctors/add`, addDoctorDTO);
    }
}