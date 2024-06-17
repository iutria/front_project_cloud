export interface Date{
    id:           string;
    patientId:          string;
    medicoId:           string;
    medicoNombre:       string;
    medicoEspecialidad: string;
    diagnostics:        Diagnostic[];
    treatments:         Diagnostic[];
    procedures:         Diagnostic[];
    fechaCreacion:      string;
}

export interface PostDate{
    pacienteId:   string;
    medicoId:     string;
    nombrePaciente:     string;
    hora:         string;
    dia:          string;
    especialidad: string;
    estado:       string;
}

export interface DateResponse {
    medicalHistory: MedicalHistory;
    medicoNombre:       string;
    medicoEspecialidad:       string;
    patientId:     string;
    medico:        Medico;
    fechaCreacion: string;
    diagnostics:   Diagnostic[];
    treatments:    Diagnostic[];
    procedures:    Diagnostic[];
}

export interface MedicalHistory {
    id:            string;
    
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


export interface DateResponseSpanish{
    id:             string;
    pacienteId:     string;
    nombrePaciente: string;
    medicoId:       string;
    hora:           string;
    dia:            string;
    especialidad:   string;
    estado:         string;
}