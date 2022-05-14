export interface IFeedback {
    patientId: string;
    doctorId: string;
    diseaseId: string;
    timeStamp: Date;
    text: string;
    givenByPatient: boolean;
}