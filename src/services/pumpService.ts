export type Pump = {
  potencia_cv: number;
  potencia_kwatts: number;
  npsh: number;
  rpm: number;
  vazao_max_ls: number;
};

export const pumpList: Map<string, Pump> = new Map([
  [
    "PH BOMBAS CFRA 1x3/4x4",
    {
      npsh: 2.5,
      potencia_cv: 0.5,
      potencia_kwatts: 0.36,
      rpm: 3500,
      vazao_max_ls: 278,
    },
  ],
]);
