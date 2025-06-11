/* eslint-disable */
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
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import "./App.css";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import * as functionService from "./services/functionService";

function App() {
  //const [count, setCount] = useState(0)

  //CONFIG BOMBA PARAMS

  const [vazao, setVazao] = useState(0.0);
  const [alturaMaxima, setAlturaMaxima] = useState(0.0);
  const [coeficientePerda, setCoeficientePerda] = useState(0.0);
  const [eficienciaMax, setEficienciaMax] = useState(0.0);
  const [curvaEficiencia, setCurvaEficiencia] = useState(0.0);
  const [vazaoOtima, setVazaoOtima] = useState(0.0);
  const [alturaSuccao, setAlturaSuccao] = useState(0.0);
  const [perdaCargaSuccao, setPerdaCargaSuccao] = useState(0.0);
  const [pressaoAgua, setPressaoAgua] = useState(0.0);
  const [pressaoAtm, setPressaoAtm] = useState(0.0);

  const [npsh, setNpsh] = useState(0.0);
  const [potenciaHidraulica, setPotenciaHidraulica] = useState(0.0);
  //const [potenciaCv, setPotenciaCv] = useState(0.0);

  const rangeVazao = functionService.generateNumberRange(0, vazao);

  // CONFIG CHART
  const [chartData, setChartData] = useState<any[]>([]);

  const getLinesChart = () => {
    let dataChart = [];

    const calcAlt: number[] = functionService.alturaMano(
      rangeVazao,
      alturaMaxima,
      coeficientePerda
    );

    const calcEfi: number[] = functionService.eficiencia(
      rangeVazao,
      eficienciaMax,
      vazaoOtima,
      curvaEficiencia
    );

    const calcPH: number[] = functionService.potenciaHidraulica(
      rangeVazao,
      calcAlt
    );

    const maxPH = Math.max(...calcPH);
    const maxFixed = maxPH.toFixed(2);
    setPotenciaHidraulica(Number(maxFixed));
    //setPotenciaCv(functionService.potenciaCv(maxPH));

    setNpsh(
      functionService.npshDisponivel(
        alturaSuccao,
        perdaCargaSuccao,
        pressaoAgua,
        pressaoAtm
      )
    );

    for (let i = 0; i < rangeVazao.length; i++) {
      const tick = rangeVazao[i];
      const tickEfi = calcEfi[i];
      const tickVazao = calcPH[i];
      const tickAltura = calcAlt[i];

      dataChart.push({
        key: tick,
        eficiencia: tickEfi,
        potencia_hidro: tickVazao,
        altura_mano: tickAltura,
      });
    }

    setChartData(dataChart);
  };

  const chartConfig = {
    eficiencia: {
      label: "Eficiência (%) ",
      color: "#2563eb",
    },
    potencia_hidro: {
      label: "Potência Hidráulica (kW) ",
      color: "#60a5fa",
    },
    altura_mano: {
      label: "Altura manométrica (m) ",
      color: "#4f772d",
    },
  } satisfies ChartConfig;

  return (
    <div className="w-full h-dvh flex flex-col justify-center items-center p-48">
      <h1 className="self-start font-semibold text-2xl flex justify-center items-center gap-4">
        Simulador de Bomba Hidráulica
        <img src="/droplets.svg" alt="Logo" className="w-6 h-6" />
      </h1>
      <div className="w-full flex justify-center items-center gap-6">
        <div className="w-full">
          <ChartContainer
            config={chartConfig}
            className="min-h-[700px] w-full max-w-[1000px] border-2 border-gray-200 rounded-lg"
          >
            <LineChart accessibilityLayer data={chartData}>
              <ChartTooltip content={<ChartTooltipContent labelKey="a" />} />
              <ChartLegend content={<ChartLegendContent />} />
              <CartesianGrid vertical={false} />
              <YAxis
                tickLine={false}
                axisLine={false}
                type="number"
                domain={[0, 100]}
                allowDataOverflow
              />
              <XAxis dataKey="key" tickLine={false} axisLine={false} />
              <Line
                dataKey="eficiencia"
                type="monotone"
                stroke="#ff0000"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="potencia_hidro"
                type="monotone"
                stroke="#60a5fa"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="altura_mano"
                type="monotone"
                stroke="#4f772d"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </div>
        <div className="w-full h-full flex flex-col justify-start items-center gap-4">
          {/* <h2>Parâmetros Bomba Hidráulica</h2> */}
          <div className="grid w-full max-w-sm min-w-3xs items-center gap-1">
            <Label htmlFor="vazao">Vazão (Q) [L/s]</Label>
            <Input
              id="vazao"
              type="number"
              placeholder="00.00"
              onChange={(e) => setVazao(e.target.valueAsNumber)}
            />
          </div>
          <div className="grid w-full max-w-sm min-w-3xs items-center gap-1">
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
          <Button className="w-full max-w-sm" onClick={() => getLinesChart()}>
            Calcular
          </Button>
        </div>
      </div>
      <div className="flex flex-col self-start items-center gap-6 bg-emerald-200 mt-4 p-4 rounded-md">
        <div className="flex self-start items-center gap-6">
          <div className="flex flex-col justify-center items-start">
            <h1>Potência Hidráulica</h1>
            <span className="text-2xl font-bold">{potenciaHidraulica} kW</span>
          </div>
          <div className="flex flex-col justify-center items-start">
            <h1>Potência da Bomba (kW)</h1>
            <span className="text-2xl font-bold">49.44 kW</span>
          </div>
          <div className="flex flex-col justify-center items-start">
            <h1>Potência da Bomba (CV)</h1>
            <span className="text-2xl font-bold">67.21 CV</span>
          </div>
          <div className="flex flex-col justify-center items-start">
            <span>
              NPSH Disponível (NPSHa): <b>{npsh} m</b>
            </span>
            <span>
              NPSH Requerido mínimo (NPSHr): <b>2.00 m</b>
            </span>
          </div>
        </div>
        {/* TODO: this shit */}
        {/* <span className="self-start font-bold">
          ✅ Bomba operando na região segura
        </span> */}
      </div>
    </div>
  );
}

export default App;
