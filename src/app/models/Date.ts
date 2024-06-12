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