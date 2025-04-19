import "./Cri.css";
import { useState } from "react";
import { useEffect } from "react";
import drugData from "../data/drugData";

const Cri = () => {
  const [weight, setWeight] = useState(10);
  const [species, setSpecies] = useState("Canine");
  const [rate, setRate] = useState(5);
  const [dose, setDose] = useState(4);
  const [doseRecom, setDoseRecom] = useState(0);
  const [concUnit, setConcUnit] = useState("mg/ml");
  const [doseUnit, setDoseUnit] = useState("ug/kg/min");
  const [calUnit, setCalUnit] = useState("ug/ml");

  const [selectedType, setSelectedType] = useState("CARDIO");
  const [selectedDrug, setSelectedDrug] = useState("Epinephrine (Adrenaline)");
  const [fluidSize, setFluidSize] = useState(100); // default to 100 mL
  const [volume, setVolume] = useState();

  const [errorFluidRate, setErrorFluidRate] = useState("");
  const [errorConc, setErrorConc] = useState("");
  const [errorDose, setErrorDose] = useState("");
  const [errorWeight, setErrorWeight] = useState("");

  let info;
  const emoji = species === "Canine" ? "🐶 " : "😺 ";

  const selectedDrugInfo = () => {
    const data = drugData.find(
      (d) => d.drug === selectedDrug && d.type === selectedType
    );
    console.log("data ja", data);
    return data;
  };

  const convertUnit = () => {
    info = selectedDrugInfo();
    console.log("aaa : ", info?.concUnit.toLowerCase());
    if (info?.concUnit.toLowerCase() === "mg/ml") {
      console.log("conc", concentration);
      const converted = concentration * 1000; // convert to ug/ml
      console.log("converted ", converted);
      return converted;
    }
    return concentration;
  };

  const [concentration, setConcentration] = useState("10000");

  const maintenanceRate =
    (weight ** 0.75 * (species === "Canine" ? 132 : 80)) / 24;
  const halfMaintenanceRate = maintenanceRate / 2;
  const pediatricRate = weight * 4.7;
  const infusionTime = rate ? fluidSize / rate : 0;

  const clearData = () => {
    setConcentration(0);
    setWeight(0);
    setRate(0);
    setDose(0);
    setDoseRecom(0);
    setVolume(0);
    setErrorFluidRate("");
    setErrorConc("");
    setErrorDose("");
    setErrorWeight("");
  };

  const calculate = async (e) => {
    e.preventDefault();
    const formValidity = await validateForm();
    let calcConc = convertUnit();
    setCalUnit(calcConc);
    console.log("cal cal", calcConc);
    if (weight && dose && concentration && infusionTime) {
      console.log("w", weight);
      console.log("d", dose);
      console.log("c", concentration);
      console.log("time", infusionTime);
      setVolume((weight * dose * 60 * infusionTime) / calcConc);
    } else {
      setVolume(0);
    }
  };

  const setDefault = () => {
    if (selectedType) {
      info = selectedDrugInfo();
      console.log(info);
      if (info) {
        setSelectedDrug(info.drug);
        setConcentration(info.basicConc);
        setDoseUnit(info.doseUnit);
        setConcUnit(info.concUnit);
        setVolume(0);
        setDose(species === "Canine" ? info.dogMin : info.catMin);
        setDoseRecom(
          species === "Canine"
            ? info.dogMin + " - " + info.dogMax
            : info.catMin + " - " + info.catMax
        );
        setErrorFluidRate("");
        setErrorConc("");
        setErrorDose("");
        setErrorWeight("");
      }
    }
  };

  useEffect(() => {
    if (selectedType) {
      const info = selectedDrugInfo();
      if (info) {
        setSelectedDrug(info.drug);
        setConcentration(info.basicConc);
        setDose(info ? (species === "Canine" ? info.dogMin : info.catMin) : 0);
        setDoseRecom(
          species === "Canine"
            ? info.dogMin + " - " + info.dogMax
            : info.catMin + " - " + info.catMax
        );
        setDoseUnit(info.doseUnit);
        setConcUnit(info.concUnit);
        setVolume(0);
      }
    }
  }, [selectedType, selectedDrug, species]);

  useEffect(() => {
    setVolume(0);
  }, [concentration, dose, rate, fluidSize]);

  const validateForm = () => {
    setErrorFluidRate(rate === 0 ? "please fill data" : "");
    setErrorConc(concentration === 0 ? "please fill data" : "");
    setErrorDose(dose === 0 ? "please fill data" : "");
    setErrorWeight(weight === 0 ? "please fill data" : "");
  };

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
            {errorWeight && (
              <small className="text-red-600">This field is required.</small>
            )}
          </div>
          <div>
            <label className="block font-medium">Species</label>
            <select
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option>Canine 🐶</option>
              <option>Feline 😺</option>
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

      <div className="mt-6 bg-slate-200 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">CRI Infusion Details</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-fuchsia-300 rounded m-3">
            <div className="p-3">
              <label className="block font-medium p-2">Drug Type</label>
              <select
                className="w-full border p-2 rounded"
                value={selectedType}
                onChange={(e) => {
                  const newType = e.target.value;
                  setSelectedType(newType);
                  setSelectedDrug(
                    drugData.find((d) => d.type === newType).drug
                  );
                }}
              >
                {[...new Set(drugData.map((d) => d.type))].map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="bg-fuchsia-300 rounded m-3">
            <div className="p-3">
              <label className="block font-medium p-2">Drug</label>
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
          </div>

          <div>
            <label className="block font-medium">Fluid Rate (mL/hr)</label>
            <input
              type="number"
              value={rate}
              help
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full border p-2 rounded"
            />
            {errorFluidRate && (
              <small className="text-red-600">This field is required.</small>
            )}
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
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">
              Concentration ({concUnit || "?"})
            </label>

            <input
              type="number"
              value={concentration}
              onChange={(e) => setConcentration(parseFloat(e.target.value))}
              className="w-full border p-2 rounded"
            />
            {errorConc && (
              <small className="text-red-600">This field is required.</small>
            )}
          </div>
          <div>
            <label className="block font-medium">
              <label className="block font-medium">
                Dose ({doseUnit || "?"})
              </label>
            </label>
            <input
              type="number"
              value={dose}
              onChange={(e) => setDose(parseFloat(e.target.value))}
              className="w-full border p-2 rounded"
            />
            <label className="text-orange-900">
              dose recommend : {doseRecom}
            </label>
            {errorDose && (
              <small className="text-red-600">This field is required.</small>
            )}
          </div>
        </div>

        <div>
          <button className="bg-red-300 p-2 m-3" onClick={setDefault}>
            DEFAULT
          </button>
          <button className="bg-slate-400 p-2 m-3" onClick={clearData}>
            CLEAR
          </button>
          <button className="bg-green-400 p-2 m-3" onClick={calculate}>
            CALCULATE
          </button>
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">
          {emoji}CRI Drug Calculation {emoji}
        </h2>
        <div>
          {" "}
          (weight {weight} x dose {dose} x infusionTime{" "}
          {infusionTime.toFixed(2)}) / conc {calUnit}
        </div>
        <div className="bg-yellow-100 p-3 rounded">
          <p>
            <strong>REMOVE </strong>
            <span className="text-red-700 font-bold">
              {volume ? volume.toFixed(2) : "-"}
            </span>{" "}
            mL of drug
          </p>
          <p>
            <strong>ADD </strong>
            <span className="text-red-700 font-bold">
              {volume ? volume.toFixed(2) : "-"}
            </span>{" "}
            mL of drug
            <strong> IN </strong>{" "}
            <span className="text-red-700 font-bold">{fluidSize}</span> mL of
            fluid
          </p>
        </div>
      </div>
      <div>
        {species === "CANINE" ? info?.noteDog || "" : info?.noteCat || ""}
      </div>
      <div>
        w{weight}, dose{dose}, conc{concentration}, time
        {infusionTime.toFixed(2)}
      </div>
      <div>
        {selectedDrug}, {selectedType}
      </div>
    </div>
  );
};

export default Cri;
