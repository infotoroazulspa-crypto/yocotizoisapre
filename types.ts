export type Portal = 'publico' | 'asesor' | 'admin';

export interface Plan {
  id: string;
  codigo: string;
  nombre: string;
  isapre: string;
  modalidad: string;
  baseUf: number;
  gesUf: number;
  hospitalaria: number;
  ambulatoria: number;
  prestadores: string[];
  pdfDisponible: boolean;
}
