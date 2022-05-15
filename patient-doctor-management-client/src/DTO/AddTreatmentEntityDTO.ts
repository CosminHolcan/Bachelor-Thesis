export interface IAddTreatmentEntityDTO {
    patientId: string;
    diseaseId: string;
    medicinesId: string[];
    startingDate: Date;
    observations: string;
}