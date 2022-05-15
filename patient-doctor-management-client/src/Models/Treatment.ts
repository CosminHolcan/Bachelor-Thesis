export interface ITreatment {
    patient: string;
    doctor: string;
    disease: string;
    medicines: string[];
    startingDate: Date;
    observations: string;
}