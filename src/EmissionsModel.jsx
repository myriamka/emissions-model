import React, { useState } from "react";
import { Card, CardContent, Slider, Input, TextField } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

const EmissionsModel = () => {
  const [totalDeliveries, setTotalDeliveries] = useState(2500); // en millions
  const [reductionDeliveries, setReductionDeliveries] = useState(20); // %
  const [thermique, setThermique] = useState(10); // %
  const [electrique, setElectrique] = useState(70); // %
  const [modeDoux, setModeDoux] = useState(20); // %

  const [emissionThermique, setEmissionThermique] = useState(500); // g CO2/livraison
  const [emissionElectrique, setEmissionElectrique] = useState(50); // g CO2/livraison
  const [emissionModeDoux, setEmissionModeDoux] = useState(10); // g CO2/livraison

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

          {/* Facteurs d'émission ajoutés */}
          <h3>Facteurs d'émission (g CO₂ par livraison)</h3>
          <div>
            <TextField
              label="Facteur Thermique"
              type="number"
              value={emissionThermique}
              onChange={(e) => setEmissionThermique(Number(e.target.value))}
              sx={{ margin: 1 }}
            />
            <TextField
              label="Facteur Électrique"
              type="number"
              value={emissionElectrique}
              onChange={(e) => setEmissionElectrique(Number(e.target.value))}
              sx={{ margin: 1 }}
            />
            <TextField
              label="Facteur Mode Doux"
              type="number"
              value={emissionModeDoux}
              onChange={(e) => setEmissionModeDoux(Number(e.target.value))}
              sx={{ margin: 1 }}
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

