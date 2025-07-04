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
import { type Pump, pumpList } from "./services/pumpService";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

function App() {
  //const [count, setCount] = useState(0)

  //CONFIG BOMBA PARAMS
  const [pump, setPump] = useState<Pump>();
  const [vazaoMax, setVazaoMax] = useState(0.0);
  const [alturaMaxima, setAlturaMaxima] = useState(0.0);
  const [coeficientePerda, setCoeficientePerda] = useState(5.6);
  const [eficienciaMax, setEficienciaMax] = useState(90);
  const [vazaoOtima, setVazaoOtima] = useState(0.7);
  const [alturaSuccao, setAlturaSuccao] = useState(18);
  const [perdaCargaSuccao, setPerdaCargaSuccao] = useState(0.003);
  const [pressaoAgua, setPressaoAgua] = useState(-1.24);
  const [potenciaHidraulica, setPotenciaHidraulica] = useState(0.0);
  //const [potenciaCv, setPotenciaCv] = useState(0.0);

  const rangeVazao = functionService.generateNumberRange(0, vazaoMax, 0.05);

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
      vazaoOtima
    );

    const calcPH: number[] = functionService.potenciaHidraulica(
      rangeVazao,
      calcAlt
    );

    const calcNpshr: number[] = functionService.npshRequerido(rangeVazao);

    const maxPH = Math.max(...calcPH);
    const maxFixed = maxPH.toFixed(2);
    setPotenciaHidraulica(Number(maxFixed));

    /* setNpsh(
      functionService.npshDisponivel(
        alturaSuccao,
        perdaCargaSuccao,
        pressaoAgua
      )
    ); */

    for (let i = 0; i < rangeVazao.length; i++) {
      const tick = rangeVazao[i];
      const tickEfi = calcEfi[i];
      const tickVazao = calcPH[i];
      const tickAltura = calcAlt[i];
      const tickNpshr = calcNpshr[i];

      dataChart.push({
        key: tick,
        eficiencia: tickEfi,
        potencia_hidro: tickVazao,
        altura_mano: tickAltura,
        npshr: tickNpshr,
      });
    }

    setChartData(dataChart);
  };

  const onValuePumpChange = (value: string) => {
    const selectedPump = pumpList.get(value);
    setPump(selectedPump);

    setVazaoMax(selectedPump!.vazao_max_ls);
    setAlturaMaxima(selectedPump!.altura_max);
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
    npshr: {
      label: "NPSH requerido ",
      color: "#B6F500",
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
              <Line
                dataKey="npshr"
                type="monotone"
                stroke="#B6F500"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </div>
        <div className="w-full h-full flex flex-col justify-start items-center gap-4">
          {/* <h2>Parâmetros Bomba Hidráulica</h2> */}
          <div className="grid w-full max-w-sm min-w-3xs items-center gap-1">
            <Label htmlFor="pump">Selecione um Bomba Hidráulica</Label>
            <Select onValueChange={(value) => onValuePumpChange(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent id="pump">
                <SelectGroup>
                  {Array.from(pumpList.keys()).map((e) => (
                    <SelectItem value={e}>{e}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full max-w-sm min-w-3xs items-center gap-1">
            <Label htmlFor="vazao">Vazão Máxima (Q) [L/s]</Label>
            <Input
              id="vazao"
              type="number"
              placeholder="00.00"
              onChange={(e) => setVazaoMax(e.target.valueAsNumber)}
              value={vazaoMax}
            />
          </div>
          <div className="grid w-full max-w-sm min-w-3xs items-center gap-1">
            <Label htmlFor="alt_max">Altura máxima (H0) [m]</Label>
            <Input
              id="alt_max"
              type="number"
              placeholder="00.00"
              onChange={(e) => setAlturaMaxima(e.target.valueAsNumber)}
              value={alturaMaxima}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1">
            <Label htmlFor="coe_perda">Coeficiente de perda (k)</Label>
            <Input
              id="coe_perda"
              type="number"
              placeholder="00.00"
              onChange={(e) => setCoeficientePerda(e.target.valueAsNumber)}
              value={coeficientePerda}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1">
            <Label htmlFor="efi_max">Eficiência máxima (%)</Label>
            <Input
              id="efi_max"
              type="number"
              placeholder="00.00"
              onChange={(e) => setEficienciaMax(e.target.valueAsNumber)}
              value={eficienciaMax}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1">
            <Label htmlFor="vaz_oti">Vazão ótima (Q_opt) [L/s]</Label>
            <Input
              id="vaz_oti"
              type="number"
              placeholder="00.00"
              onChange={(e) => setVazaoOtima(e.target.valueAsNumber)}
              value={vazaoOtima}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1">
            <Label htmlFor="alt_suc">Altura de sucção (hs) [m]</Label>
            <Input
              id="alt_suc"
              type="number"
              placeholder="00.00"
              onChange={(e) => setAlturaSuccao(e.target.valueAsNumber)}
              value={alturaSuccao}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1">
            <Label htmlFor="perd_suc">Perda de carga na sucção (hfs) [m]</Label>
            <Input
              id="perd_suc"
              type="number"
              placeholder="00.00"
              onChange={(e) => setPerdaCargaSuccao(e.target.valueAsNumber)}
              value={perdaCargaSuccao}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1">
            <Label htmlFor="pres_agua">Pressão de vapor da água (Pv) [m]</Label>
            <Input
              id="pres_agua"
              type="number"
              placeholder="00.00"
              onChange={(e) => setPressaoAgua(e.target.valueAsNumber)}
              value={pressaoAgua}
            />
          </div>
          <Button className="w-full max-w-sm" onClick={() => getLinesChart()}>
            Calcular
          </Button>
        </div>
      </div>
      <div
        className={
          "w-full flex flex-col self-start items-center gap-6 mt-4 p-4 rounded-md " +
          (pump != undefined
            ? pump?.npsha > pump?.npshr
              ? "bg-emerald-200"
              : "bg-red-200"
            : "border-2 border-gray-200 rounded-lg")
        }
      >
        <div className="flex justify-center items-center gap-6">
          <div className="flex flex-col justify-center items-start">
            <h1>Potência Hidráulica</h1>
            <span className="text-2xl font-bold">{potenciaHidraulica} kW</span>
          </div>
          <div className="flex flex-col justify-center items-start">
            <h1>Potência da Bomba (kW)</h1>
            <span className="text-2xl font-bold">
              {pump?.potencia_kwatts || 0} kW
            </span>
          </div>
          <div className="flex flex-col justify-center items-start mr-8">
            <h1>Potência da Bomba (CV)</h1>
            <span className="text-2xl font-bold">
              {pump?.potencia_cv || 0} CV
            </span>
          </div>
          <div className="flex flex-col justify-center items-start mr-8">
            <span>
              NPSH Disponível (NPSHa): <b>{pump?.npsha || 0} m</b>
            </span>
            <span>
              NPSH Requerido mínimo (NPSHr): <b>{pump?.npshr || 0} m</b>
            </span>
          </div>
          {pump != undefined ? (
            pump?.npsha > pump?.npshr ? (
              <div className="flex flex-col justify-center items-start">
                <span className="self-start font-bold">
                  ✅ Bomba operando na região segura
                </span>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-start">
                <span className="self-start font-bold">
                  ❌ Bomba operando na região insegura
                </span>
              </div>
            )
          ) : (
            <></>
          )}
        </div>
        {/* <span className="self-start font-bold">
          ✅ Bomba operando na região segura
        </span> */}
      </div>
    </div>
  );
}

export default App;
