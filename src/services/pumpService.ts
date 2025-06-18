export type Pump = {
  potencia_cv: number;
  potencia_kwatts: number;
  npshr: number;
  npsha: number;
  rpm: number;
  vazao_max_ls: number;
  altura_max: number;
};

export const pumpList: Map<string, Pump> = new Map([
  [
    "PH BOMBAS CFRA 1x3/4x4",
    {
      npshr: 2.87,
      npsha: 18.28,
      potencia_cv: 0.5,
      potencia_kwatts: 0.36,
      rpm: 3500,
      vazao_max_ls: 1.5,
      altura_max: 20,
    },
  ],
  [
    "Bomba Sulzer SMD Series",
    {
      npshr: 30,
      npsha: 18.28,
      potencia_cv: 335,
      potencia_kwatts: 250,
      rpm: 3600,
      vazao_max_ls: 1390,
      altura_max: 700,
    },
  ],
  [
    "Schneider BCS-32",
    {
      npshr: 2.0,
      npsha: 18.28,
      potencia_cv: 4,
      potencia_kwatts: 2.9,
      rpm: 3500,
      vazao_max_ls: 21,
      altura_max: 20,
    },
  ],
]);
