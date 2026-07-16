import type { Plan } from '../types';

export const demoPlans: Plan[] = [
  { id: '1', codigo: 'BNCU241102', nombre: 'Salud Clásico Regional Norte', isapre: 'Banmédica', modalidad: 'Preferente', baseUf: 2.34, gesUf: 0.778, hospitalaria: 80, ambulatoria: 50, prestadores: ['Clínica San José', 'Clínica Dávila'], pdfDisponible: true },
  { id: '2', codigo: '13-CORE101-26', nombre: 'Plan Core Preferente', isapre: 'Consalud', modalidad: 'Preferente', baseUf: 2.12, gesUf: 0.731, hospitalaria: 90, ambulatoria: 70, prestadores: ['Red Salud', 'Clínica Bicentenario'], pdfDisponible: true },
  { id: '3', codigo: 'COL-PLUS-01', nombre: 'Colmena Plus', isapre: 'Colmena', modalidad: 'Libre elección', baseUf: 2.76, gesUf: 1.036, hospitalaria: 80, ambulatoria: 70, prestadores: ['Clínica Santa María', 'Clínica Indisa'], pdfDisponible: true },
];
