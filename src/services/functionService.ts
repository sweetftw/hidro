/**
 * Calcula a altura manométrica da bomba em função da vazão.
 *
 * H(Q) = H0 - k * Q²
 */
export function alturaMano(Q: number[], H0: number, k: number): number[] {
  const calcAlt = (q: number) => {
    const square2 = Math.pow(q, 2);
    return H0 - k * square2;
  };

  if (Array.isArray(Q)) {
    return Q.map(calcAlt);
  } else {
    return [];
  }
}

/**
 * Calcula a eficiência da bomba com base em uma curva parabólica.
 *
 * @param Q - vazão ou array de vazões
 * @param etaMax - eficiência máxima (0.80, por exemplo)
 * @param QOpt - vazão de eficiência máxima
 * @param largura - controle da largura da curva (padrão 0.5)
 * @returns eficiência para cada Q
 */
export function eficiencia(
  Q: number | number[],
  etaMax: number,
  QOpt: number,
  largura: number = 0.5
): number[] {
  const calcEta = (q: number): number => {
    const eta = etaMax * Math.exp(-Math.pow((q - QOpt) / (QOpt * largura), 2));
    return Math.max(0.01, Math.min(eta, etaMax)); // evita valores menores que 1%
  };

  /* if (Array.isArray(Q)) {
    return Q.map(calcEta);
  } else {
    return calcEta(Q);
  } */

  if (Array.isArray(Q)) {
    return Q.map(calcEta);
  } else {
    return [];
  }
}

/**
 * Calcula a potência hidráulica da bomba.
 *
 * P = ρ * g * Q * H
 */
export function potenciaHidraulica(
  QLps: number[],
  H: number[],
  rho: number = 997,
  g: number = 9.81
): number[] {
  /* const calcPH = (q: number): number => {
    const QM3s = q / 1000; // Converte L/s para m³/s
    return rho * g * QM3s * H; // Em Watts
  };
 */

  if (Array.isArray(QLps)) {
    return QLps.map((qL, i) => {
      const q = qL / 1000; // Convertendo L/s para m³/s
      const h = H[i];
      const p = rho * g * q * h; // Potência em watts
      return p / 1000; // Potência em kW
    });
  } else {
    return [];
  }
}

/**
 * Calcula a potência da bomba considerando a eficiência.
 */
export function potenciaBomba(PHidraulica: number, eta: number): number {
  return PHidraulica / eta; // Em Watts
}

/**
 * Converte potência de Watts para cavalos-vapor (CV).
 */
export function potenciaCv(PWatts: number): number {
  return PWatts / 735.5;
}

/**
 * Calcula o NPSHa disponível.
 * NPSH = Patm - Pv + hs - hfs
 */
export function npshDisponivel(
  hs: number,
  hfs: number,
  Pv: number,
  Patm: number = 1
): number {
  return Patm - Pv + hs - hfs;
}

/**
 * Estima o NPSHr (requerido) como uma função crescente da vazão.
 */
export function npshRequerido(
  Q: number,
  NPSHrMin: number = 2.87,
  coef: number = 0.015
): number {
  return NPSHrMin + coef * Q;
}

// Utility functions for array operations (replacing numpy functionality)
export const PumpUtils = {
  /**
   * Creates an array of numbers from start to stop with specified step
   */
  linspace: (start: number, stop: number, num: number): number[] => {
    const step = (stop - start) / (num - 1);
    return Array.from({ length: num }, (_, i) => start + step * i);
  },

  /**
   * Creates an array of numbers from start to stop with specified step
   */
  arange: (start: number, stop: number, step: number = 1): number[] => {
    const result: number[] = [];
    for (let i = start; i < stop; i += step) {
      result.push(i);
    }
    return result;
  },

  /**
   * Applies a function to each element in an array
   */
  map: <T, U>(arr: T[], fn: (value: T, index: number) => U): U[] => {
    return arr.map(fn);
  },

  /**
   * Clips values in an array to be within min and max bounds
   */
  clip: (arr: number[], min: number, max: number): number[] => {
    return arr.map((val) => Math.max(min, Math.min(val, max)));
  },
};

// Example usage:
/*
const Q = PumpUtils.linspace(0, 100, 50);
const H0 = 50;
const k = 0.005;

const alturas = Q.map(q => alturaMano(q, H0, k));
const eficiencias = eficiencia(Q, 0.8, 60, 0.5) as number[];
const potenciasHid = Q.map((q, i) => potenciaHidraulica(q, alturas[i]));
const potenciasBomba = potenciasHid.map((p, i) => potenciaBomba(p, eficiencias[i]));
const potenciasCV = potenciasBomba.map(p => potenciaCv(p));
*/

export function generateNumberRange(start: number, end: number) {
  if (start > end) {
    return [...Array(start - end - 1).keys()].map((n) => start - n);
  }
  return [...Array(end - start + 1).keys()].map((n) => n + start);
}
