import "./Cri.css";
import { useState } from "react";
import drugData from "../data/drugData";

const Cri = () => {
  const [weight, setWeight] = useState(10);
  const [species, setSpecies] = useState("Feline");
  const [rate, setRate] = useState(5);
  const [dose, setDose] = useState(4);

  const [selectedType, setSelectedType] = useState("CARDIO");
  const [selectedDrug, setSelectedDrug] = useState("Epinephrine (Adrenaline)");
  const [fluidSize, setFluidSize] = useState(50); // default to 50 mL

  const selectedDrugInfo = () => {
    const data = drugData.find(
      (d) => d.drug === selectedDrug && d.type === selectedType
    );
    console.log(data);
    return data;
  };

  const calculateConcentration = () => {
    const info = selectedDrugInfo();
    console.log("abc", info?.concUnit); // See what the actual value is
  
    if (info?.concUnit.toLowerCase() === "mg/ml") {
      console.log("conc", concentration);
      const converted = concentration * 1000;
      console.log("converted ", converted);
      return converted;
    }
    return concentration;
  };
  

  const [concentration, setConcentration] = useState(selectedDrugInfo()?.basicConc);

  const maintenanceRate =
    (weight ** 0.75 * (species === "Canine" ? 132 : 80)) / 24;
  const halfMaintenanceRate = maintenanceRate / 2;
  const pediatricRate = weight * 4.7;

  const infusionTime = rate ? fluidSize / rate : 0;
  const calcConc = calculateConcentration();
  const addVolume =
    weight && dose && concentration && infusionTime
      ? (weight * dose * 60 * infusionTime) / calcConc
      : 0;

  const removeVolume = addVolume;

  return (
    <div className="p-6 bg-red min-h-screen flex flex-col items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Patient Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Patient BW (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Species</label>
            <select
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option>Canine</option>
              <option>Feline</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Maintenance Rates</h2>
        <div className="bg-blue-100 p-3 rounded">
          <p>
            <strong>1 Maintenance Rate:</strong> {maintenanceRate.toFixed(2)}{" "}
            mL/h
          </p>
          <p>
            <strong>0.5 Maintenance Rate:</strong>{" "}
            {halfMaintenanceRate.toFixed(2)} mL/h
          </p>
          <p>
            <strong>Pediatric Feline:</strong> {pediatricRate.toFixed(2)} mL/h
          </p>
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">CRI Infusion Details</h2>

        <div  className="bg-fuchsia-300 rounded m-3">
          <div className="p-3">
            <label className="block font-medium p-2">Drug Type</label>
            <select
              className="w-full border p-2 rounded"
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setSelectedDrug(""); // Reset drug on type change
              }}
            >
              {[...new Set(drugData.map((d) => d.type))].map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Drug</label>
            <select
              className="w-full border p-2 rounded"
              value={selectedDrug}
              onChange={(e) => setSelectedDrug(e.target.value)}
            >
              {drugData
                .filter((d) => d.type === selectedType)
                .map((drug) => (
                  <option key={drug.drug}>{drug.drug}</option>
                ))}
            </select>
          </div>

          <div>
            <label className="block font-medium">Fluid Rate (mL/hr)</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">
              Concentration ({selectedDrugInfo()?.concUnit || "?"})
            </label>

            <input
              type="number"
              // value={selectedDrugInfo()?.basicConc || "?"}
              value={concentration}
              onChange={(e) => setConcentration(parseFloat(e.target.value))}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">
              <label className="block font-medium">
                Dose ({selectedDrugInfo()?.doseUnit || "?"})
              </label>
            </label>
            <input
              type="number"
              value={dose}
              onChange={(e) => setDose(parseFloat(e.target.value))}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium">Fluid Size (mL)</label>
          <select
            className="w-full border p-2 rounded"
            value={fluidSize}
            onChange={(e) => setFluidSize(parseFloat(e.target.value))}
          >
            {[20, 50, 100, 500, 1000].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">CRI Drug Calculation</h2>
        <div className="bg-yellow-100 p-3 rounded">
          <p>
            <strong>REMOVE </strong>{" "}
            {removeVolume
              ? `${removeVolume.toFixed(2)} mL of fluid`
              : "Fill all required fields"}
          </p>
          <p>
            <strong>ADD </strong>{" "}
            {addVolume
              ? `${addVolume.toFixed(2)} mL of drug`
              : "Fill all required fields"}
              <strong> IN </strong> {fluidSize} mL of fluid
          </p>
        </div>
      </div>
      <div>
        {species === "CANINE"
          ? selectedDrugInfo()?.noteDog || ""
          : selectedDrugInfo()?.noteCat || ""}
      </div>
      <div>{weight}, {dose}, {concentration}, {calcConc}, {infusionTime}</div>
    </div>
  );
};

export default Cri;
