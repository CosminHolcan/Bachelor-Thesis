import axios, { AxiosResponse } from "axios";
import { IAddBaseDTO } from "../DTO/AddBaseDTO";
import { IAddSpecializationDTO } from "../DTO/AddSpecializationDTO";
import { IUpdateSpecializationDTO } from "../DTO/UpdateSpecializationDTO";
import { ILoginDTO } from "../DTO/LoginDTO";
import { IRegisterDTO } from "../DTO/RegisterDTO";
import { IUpdateBaseDTO } from "../DTO/UpdateBaseDTO";
import { IAddDoctorDTO } from "../DTO/AddDoctor";
import { IBaseDTO } from "../DTO/BaseDTO";
import { IAddAppointmentDTO } from "../DTO/AddAppointmentDTO";
import { IGetAppointmentByDoctorForPatientDTO } from "../DTO/GetAppointmentByDoctorForPatientDTO";
import { IGetFeedbacksByDoctorDTO } from "../DTO/GetFeedbacksByDoctorDTO";
import { IGetFeedbacksByPatientDTO } from "../DTO/GetFeedbacksByPatientDTO";
import { IAddFeedbackDTO } from "../DTO/AddFeedbackDTO";
import { IAddTreatmentDTO } from "../DTO/AddTreatmentDTO";
import { IUpdateUserDTO } from "../DTO/UpdateUserDTO";

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

    export const RefreshToken = (dto: IBaseDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Authorization/refreshToken`, dto);
    }
}

export namespace UsersService {
    export const GetUser = (dto: IBaseDTO): Promise<AxiosResponse< any, any>> => {
        return axios.post(`${BASE_URL}Users/user`, dto);
    }

    export const UpdateUser = (dto: IUpdateUserDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Users/updateUser`, dto);
    }
}

export namespace SpecializationService {
    export const AddSpecialization = (addSpecializationDTO: IAddSpecializationDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Specializations/add`, addSpecializationDTO);
    }

    export const UpdateSpecialization = (updateSpecializationDTO: IUpdateSpecializationDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Specializations/update`, updateSpecializationDTO);
    }

    export const GetAllSpecializations = (baseDTO: IBaseDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Specializations/all`, baseDTO);
    }
}

export namespace DiseasesService {
    export const AddDisease = (addDiseaseDTO: IAddBaseDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Diseases/add`, addDiseaseDTO);
    }

    export const UpdateDisease = (updateDiseaseDTO: IUpdateBaseDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Diseases/update`, updateDiseaseDTO);
    }

    export const GetAllDiseases = (dto: IBaseDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Diseases/all`, dto);
    }
}

export namespace MedicinesService {
    export const AddMedicine = (addMedicineDTO: IAddBaseDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Medicines/add`, addMedicineDTO);
    }

    export const UpdateMedicine = (updateMedicineDTO: IUpdateBaseDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Medicines/update`, updateMedicineDTO);
    }

    export const GetAllMedicines = (dto: IBaseDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Medicines/all`, dto);
    }
}

export namespace DoctorsService {
    export const AddDoctor = (addDoctorDTO: IAddDoctorDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Doctors/add`, addDoctorDTO);
    }

    export const GetAllDoctors = (dto: IBaseDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Doctors/all`, dto);
    }
}

export namespace PatientsService {
    export const GetAllPatients = (dto: IBaseDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Patients/all`, dto);
    }
}

export namespace AppointmentsService {
    export const AddAppointment = (addAppointmentDTO: IAddAppointmentDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Appointments/add`, addAppointmentDTO);
    }

    export const GetAppointmentsByDoctorForPatient = (dto: IGetAppointmentByDoctorForPatientDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Appointments/getByDoctorForPatient`, dto);
    }

    export const GetAppointmentByDoctor = (dto: IBaseDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Appointments/getByDoctor`, dto);
    }
}

export namespace MessagesService {
    export const GetMessagesForUser = (dto: IBaseDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Messages/forUser`, dto);
    }
}

export namespace FeedbacksService {
    export const GetFeedbacksByPatient = (dto: IGetFeedbacksByPatientDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Feedbacks/byPatient`, dto)
    }

    export const GetFeedbacksByDoctor = (dto: IGetFeedbacksByDoctorDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Feedbacks/byDoctor`, dto)
    }

    export const AddFeedback = (dto: IAddFeedbackDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Feedbacks/add`, dto)
    }
}

export namespace TreatmentsService {
    export const GetTreatmentsByPatient = (dto: IBaseDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Treatments/getByPatient`, dto)
    }

    export const GetTreatmentsByDoctor = (dto: IBaseDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Treatments/getByDoctor`, dto)
    }

    export const AddTreatment = (dto: IAddTreatmentDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Treatments/add`, dto)
    }
}