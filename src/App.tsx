import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart } from "recharts";

import "./App.css";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import * as functionService from "./services/functionService";

function App() {
  //const [count, setCount] = useState(0)

  //CONFIG BOMBA PARAMS

  const [alturaMaxima, setAlturaMaxima] = useState(0.0);
  const [coeficientePerda, setCoeficientePerda] = useState(0.0);
  const [eficienciaMax, setEficienciaMax] = useState(0.0);
  const [curvaEficiencia, setCurvaEficiencia] = useState(0.0);
  const [vazaoOtima, setVazaoOtima] = useState(0.0);
  const [alturaSuccao, setAlturaSuccao] = useState(0.0);
  const [perdaCargaSuccao, setPerdaCargaSuccao] = useState(0.0);
  const [pressaoAgua, setPressaoAgua] = useState(0.0);
  const [pressaoAtm, setPressaoAtm] = useState(0.0);

  const rangeEfi = functionService.generateNumberRange(0, 30);

  const getEficiencia = () => {
    return functionService.eficiencia(
      rangeEfi,
      eficienciaMax,
      vazaoOtima,
      curvaEficiencia
    );
  };

  // CONFIG CHART
  const chartData: unknown[] = [];
  rangeEfi.forEach((n) => {
    chartData.push({
      step: `${n}`,
      eficiencia: 186,
    });
  });

  const chartConfig = {
    eficiencia: {
      label: "Eficiencia",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;

  return (
    <div className="w-full h-dvh flex flex-col justify-center items-center p-48">
      <h1>Teste</h1>
      <div className="w-full flex justify-center items-center gap-6">
        <div className="w-full">
          <ChartContainer
            config={chartConfig}
            className="min-h-[700px] w-full max-w-[1000px] border-2 border-gray-200 rounded-lg"
          >
            <LineChart accessibilityLayer data={chartData}>
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <CartesianGrid vertical={false} />
              <Line
                dataKey="desktop"
                type="monotone"
                stroke="#ff0000"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="mobile"
                type="monotone"
                stroke="var(--color-mobile)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </div>
        <div className="w-full h-full flex flex-col justify-start items-center gap-4">
          <h2>Parametros Bomba</h2>
          <div className="grid w-full max-w-sm items-center gap-1">
            <Label htmlFor="alt_max">Altura máxima (H0) [m]</Label>
            <Input
              id="alt_max"
              type="number"
              placeholder="00.00"
              onChange={(e) => setAlturaMaxima(e.target.valueAsNumber)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1">
            <Label htmlFor="coe_perda">Coeficiente de perda (k)</Label>
            <Input
              id="coe_perda"
              type="number"
              placeholder="00.00"
              onChange={(e) => setCoeficientePerda(e.target.valueAsNumber)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1">
            <Label htmlFor="efi_max">Eficiência máxima (%)</Label>
            <Input
              id="efi_max"
              type="number"
              placeholder="00.00"
              onChange={(e) => setEficienciaMax(e.target.valueAsNumber)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1">
            <Label htmlFor="curv_efi">Largura da Curva de Eficiência</Label>
            <Input
              id="curv_efi"
              type="number"
              placeholder="00.00"
              onChange={(e) => setCurvaEficiencia(e.target.valueAsNumber)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1">
            <Label htmlFor="vaz_oti">Vazão ótima (Q_opt) [L/s]</Label>
            <Input
              id="vaz_oti"
              type="number"
              placeholder="00.00"
              onChange={(e) => setVazaoOtima(e.target.valueAsNumber)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1">
            <Label htmlFor="alt_suc">Altura de sucção (hs) [m]</Label>
            <Input
              id="alt_suc"
              type="number"
              placeholder="00.00"
              onChange={(e) => setAlturaSuccao(e.target.valueAsNumber)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1">
            <Label htmlFor="perd_suc">Perda de carga na sucção (hfs) [m]</Label>
            <Input
              id="perd_suc"
              type="number"
              placeholder="00.00"
              onChange={(e) => setPerdaCargaSuccao(e.target.valueAsNumber)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1">
            <Label htmlFor="pres_agua">Pressão de vapor da água (Pv) [m]</Label>
            <Input
              id="pres_agua"
              type="number"
              placeholder="00.00"
              onChange={(e) => setPressaoAgua(e.target.valueAsNumber)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1">
            <Label htmlFor="pres_atm">Pressão atmosférica (Patm) [m]</Label>
            <Input
              id="pres_atm"
              type="number"
              placeholder="00.00"
              onChange={(e) => setPressaoAtm(e.target.valueAsNumber)}
            />
          </div>
          <Button
            className="w-full"
            onClick={() => console.log(getEficiencia())}
          >
            Calcular
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
