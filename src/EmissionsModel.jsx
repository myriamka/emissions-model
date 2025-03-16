import React, { useState } from "react";
import { Card, CardContent } from "@mui/material";
import { Slider } from "@mui/material";
import { Input } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

const EmissionsModel = () => {
  const [totalDeliveries, setTotalDeliveries] = useState(2500); // en millions
  const [reductionDeliveries, setReductionDeliveries] = useState(20); // %
  const [thermique, setThermique] = useState(10); // %
  const [electrique, setElectrique] = useState(70); // %
  const [modeDoux, setModeDoux] = useState(20); // %

  const emissionThermique = 500; // g CO2/livraison
  const emissionElectrique = 50; // g CO2/livraison
  const emissionModeDoux = 10; // g CO2/livraison

  const calculateEmissions = () => {
    const adjustedDeliveries = totalDeliveries * (1 - reductionDeliveries / 100);
    const emissionsThermique = (adjustedDeliveries * (thermique / 100) * emissionThermique) / 1e6;
    const emissionsElectrique = (adjustedDeliveries * (electrique / 100) * emissionElectrique) / 1e6;
    const emissionsModeDoux = (adjustedDeliveries * (modeDoux / 100) * emissionModeDoux) / 1e6;
    const totalEmissions = emissionsThermique + emissionsElectrique + emissionsModeDoux;

    return {
      emissionsThermique,
      emissionsElectrique,
      emissionsModeDoux,
      totalEmissions,
    };
  };

  const results = calculateEmissions();

  const data = [
    { name: "Thermique", emissions: results.emissionsThermique },
    { name: "Electrique", emissions: results.emissionsElectrique },
    { name: "Mode Doux", emissions: results.emissionsModeDoux },
  ];

  return (
    <div>
      <h1>Modélisation des émissions de CO2</h1>
      <Card>
        <CardContent>
          <div>
            <label>Total Livraisons (en millions): </label>
            <Input
              type="number"
              value={totalDeliveries}
              onChange={(e) => setTotalDeliveries(e.target.value)}
            />
          </div>
          <div>
            <label>Réduction des livraisons (%): </label>
            <Slider
              value={reductionDeliveries}
              onChange={(e, value) => setReductionDeliveries(value)}
              min={0}
              max={100}
              step={1}
            />
          </div>
          <div>
            <label>Répartition Thermique (%): </label>
            <Slider
              value={thermique}
              onChange={(e, value) => setThermique(value)}
              min={0}
              max={100}
              step={1}
            />
          </div>
          <div>
            <label>Répartition Electrique (%): </label>
            <Slider
              value={electrique}
              onChange={(e, value) => setElectrique(value)}
              min={0}
              max={100}
              step={1}
            />
          </div>
          <div>
            <label>Répartition Mode Doux (%): </label>
            <Slider
              value={modeDoux}
              onChange={(e, value) => setModeDoux(value)}
              min={0}
              max={100}
              step={1}
            />
          </div>
          <div>
            <h3>Emissions Totales: {results.totalEmissions.toFixed(2)} tonnes de CO2</h3>
          </div>
          <BarChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="emissions" fill="#8884d8" />
          </BarChart>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmissionsModel;
