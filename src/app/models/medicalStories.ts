export interface MedicalHistories {
    id:                 string;
    patientId:          string;
    medicoId:           string;
    medicoNombre:       string;
    medicoEspecialidad: string;
    diagnostics:        Diagnostic[];
    treatments:         Diagnostic[];
    procedures:         Diagnostic[];
    fechaCreacion:      string;
}

export interface Diagnostic {
    id:          string;
    description: string;
    date:        string;
}
