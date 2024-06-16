export interface Date{
    id:           string;
    pacienteId:   string;
    medicoId:     string;
    hora:         string;
    dia:          string;
    especialidad: string;
    estado:       string;
}

export interface PostDate{
    pacienteId:   string;
    medicoId:     string;
    hora:         string;
    dia:          string;
    especialidad: string;
    estado:       string;
}

export interface DateResponse {
    medicalHistory: MedicalHistory;
    medico:         Medico;
}

export interface MedicalHistory {
    id:            string;
    patientId:     string;
    medico:        Medico;
    fechaCreacion: Date;
    diagnostics:   Diagnostic[];
    treatments:    Diagnostic[];
    procedures:    Diagnostic[];
}

export interface Diagnostic {
    id:          string;
    description: string;
    date:        string;
}

export interface Medico {
    id:           string;
    nombre:       string;
    especialidad: string;
}
