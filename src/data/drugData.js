const drugData = [
    {
      type: "CARDIO",
      drug: "Dobutamine",
      dogMin: 2.5,
      dogMax: 5,
      catMin: 1,
      catMax: 5,
      doseUnit: "μg/kg/min",
      concUnit: "mg/ml",
      basicConc: 12.5,
      noteDog:
        "Start at the bottom end of the dose range, Tachycardia, arrhythmia are more commonly seen at doses >10 μg/kg/min, Dilute in D5W, NSS,0.45 NaCl, LRS",
      noteCat:
        "Start at the bottom end of the dose range, Adverse effects are more commonly seen at doses >2.5 μg/kg/min, >5μg/kg/min may cause seizures, Dilute in D5W, NSS,0.45 NaCl, LRS",
      reference: "some book",
    },
    // {
    //   type: "CARDIO",
    //   drug: "Norepinephrine",
    //   dogMin: 0.2,
    //   dogMax: 2,
    //   catMin: 0.2,
    //   catMax: 2,
    //   doseUnit: "μg/kg/min",
    //   concUnit: "mg/ml",
    //   basicConc: "",
    //   noteDog:
    //     "Dilute in D5W , Dextrose 5%. **ห้าม Dilute กับ NSS อย่างเดียว (Oxidation)**",
    //   noteCat:
    //     "Dilute in D5W , Dextrose 5%. **ห้าม Dilute กับ NSS อย่างเดียว (Oxidation)**",
    //   reference: "some book",
    // },
    {
      type: "CARDIO",
      drug: "Epinephrine (Adrenaline)",
      dogMin: 0.1,
      dogMax: 1,
      catMin: 0.1,
      catMax: 1,
      doseUnit: "μg/kg/min",
      concUnit: "mg/ml",
      basicConc: 1,
      noteDog:
        "Compatible with NSS, LRI, AR, Dextrose 2.5-5%, D51/2S, Dobutamine. ห้ามให้กับ 5% NaCl, Bicarb",
      noteCat:
        "Compatible with NSS, LRI, AR, Dextrose 2.5-5%, D51/2S, Dobutamine. ห้ามให้กับ 5% NaCl, Bicarb",
      reference: "some book",
    },
    // {
    //   type: "CARDIO",
    //   drug: "Vasopressin",
    //   dogMin: 0.5,
    //   dogMax: 4,
    //   catMin: 0.5,
    //   catMax: 4,
    //   doseUnit: "mU/kg/min",
    //   concUnit: "mg/ml",
    //   basicConc: 5,
    //   noteDog:
    //     "Dilute in NSS or D5W. ห้ามฉีดเข้า port เดียวกันกับ Furosemide, regular insulin, diazepam",
    //   noteCat:
    //     "Dilute in NSS or D5W. ห้ามฉีดเข้า port เดียวกันกับ Furosemide, regular insulin, diazepam",
    //   reference: "some book",
    // },
    {
      type: "CARDIO",
      drug: "Dopamine",
      dogMin: 0.5,
      dogMax: 15,
      catMin: 0.5,
      catMax: 15,
      doseUnit: "μg/kg/min",
      concUnit: "mg/ml",
      basicConc: 20,
      noteDog: "Dilute in D5W, D5 1/2S, NSS, 0.45 NaCl, LRS, Mannitol",
      noteCat: "Dilute in D5W, D5 1/2S, NSS, 0.45 NaCl, LRS, Mannitol",
      reference: "some book",
    },
    {
      type: "CARDIO",
      drug: "Lidocaine",
      dogMin: 0.01,
      dogMax: 0.04,
      catMin: 0.025,
      catMax: 0.1,
      doseUnit: "mg/kg/min",
      concUnit: "mg/ml",
      basicConc: 20,
      noteDog:
        "Loading: 2–8 mg/kg i.v. in 2 mg/kg boluses, Dilute in D5W, D5 1/2S, NSS, 0.45 NaCl, LRS",
      noteCat:
        "Loading: 0.25–2.0 mg/kg i.v. slowly in 0.25–0.5 mg/kg boluses, Dilute in D5W, D5 1/2S, NSS, 0.45 NaCl, LRS",
      reference: "some book",
    },

    // PAIN
    {
      type: "PAIN",
      drug: "Fentanyl",
      dogMin: 2.5,
      dogMax: 10,
      catMin: 2.5,
      catMax: 10,
      doseUnit: "μg/kg/h",
      concUnit: "mg/ml",
      basicConc: 0.05,
      noteDog:
        "Loading dose slow i.v. 2.5–10 μg/kg, Dilute in NSS or D5W",
      noteCat:
        "Loading dose slow i.v. 1–2 μg/kg, Dilute in NSS or D5W",
      reference: "some book",
    },
    {
      type: "PAIN",
      drug: "Morphine",
      dogMin: 0.15,
      dogMax: 0.2,
      catMin: 0,
      catMax: 0,
      doseUnit: "mg/kg/h",
      concUnit: "mg/ml",
      basicConc: 2,
      noteDog:
        "0.2–0.5 mg/kg slow IV loading bolus, Rapid IV = Hypotension, Dilute in D5W, D5 1/2S, NSS, 0.45 NaCl, LRS",
      noteCat: "CRI use has not been widely evaluated in cats.",
      reference: "some book",
    },
    {
      type: "PAIN",
      drug: "Lidocaine",
      dogMin: 20,
      dogMax: 100,
      catMin: 0,
      catMax: 0,
      doseUnit: "ug/kg/min",
      concUnit: "mg/ml",
      basicConc: 20,
      noteDog:
        "1 mg/kg loading dose (given slowly over 10–15 min), Dilute in D5W, D5 1/2S, NSS, 0.45 NaCl, LRS",
      noteCat:
        "Avoid systemic lidocaine for analgesia in cats — risk of drug accumulation, toxicity and negative haemodynamic effects",
      reference: "some book",
    },

    // NEURO
  {
    type: "NEURO",
    drug: "Diazepam",
    dogMin: 0.1,
    dogMax: 0.5,
    catMin: 0.1,
    catMax: 0.5,
    doseUnit: "mg/kg/h",
    concUnit: "mg/ml",
    basicConc: 5,
    noteDog: "**Propylene glycol toxicity**",
    noteCat:
      "2nd choice to Midazolam, *** จับกับสาย plastic, light sensitive, ไม่แนะนำ dilute, Propylene glycol toxicity",
    reference: "some book",
  },
  {
    type: "NEURO",
    drug: "Midazolam",
    dogMin: 0.2,
    dogMax: 0.5,
    catMin: 0.2,
    catMax: 0.5,
    doseUnit: "mg/kg/h",
    concUnit: "mg/ml",
    basicConc: 5,
    noteDog: "0.2–0.5 mg/kg IV loading, Dilute in D5W, NSS",
    noteCat: "0.2–0.5 mg/kg IV loading, Dilute in D5W, NSS",
    reference: "some book",
  },
  {
    type: "NEURO",
    drug: "Ketamine",
    dogMin: 0.1,
    dogMax: 0.5,
    catMin: 0.1,
    catMax: 0.5,
    doseUnit: "mg/kg/h",
    concUnit: "mg/ml",
    basicConc: 50,
    noteDog:
      "3–5 mg/kg IV loading, in NSS, D5W, Sterile water, โดนแสงสีจะเข้มแต่ไม่ส่งผล potency",
    noteCat:
      "3–5 mg/kg IV loading, in NSS, D5W, Sterile water, โดนแสงสีจะเข้มแต่ไม่ส่งผล potency",
    reference: "some book",
  },
  {
    type: "NEURO",
    drug: "Dexmedetomidine",
    dogMin: 0.5,
    dogMax: 3,
    catMin: 0.5,
    catMax: 3,
    doseUnit: "μg/kg/h",
    concUnit: "mg/ml",
    basicConc: 0.5,
    noteDog: "0.5 μg/kg IV loading",
    noteCat: "0.5 μg/kg IV loading",
    reference: "some book",
  },

  // GI
  {
    type: "GI",
    drug: "Ondansetron",
    dogMin: 0.5,
    dogMax: 0.5,
    catMin: 0.5,
    catMax: 0.5,
    doseUnit: "mg/kg/h",
    concUnit: "mg/ml",
    basicConc: 2,
    noteDog:
      "0.5 mg/kg i.v. loading dose, in Dextrose, Saline, LRI",
    noteCat:
      "0.5 mg/kg i.v. loading dose, in Dextrose, Saline, LRI",
    reference: "some book",
  },
  {
    type: "GI",
    drug: "Metoclopramide",
    dogMin: 0.04,
    dogMax: 0.08,
    catMin: 0.04,
    catMax: 0.08,
    doseUnit: "mg/kg/h",
    concUnit: "mg/ml",
    basicConc: 5,
    noteDog:
      "**light sensitive -> COVER fluid bag**, Dilute in D5W, NSS, LRS",
    noteCat:
      "**light sensitive -> COVER fluid bag**, IF change in mentation and behaviour -> discontinue drug, Dilute in D5W, NSS, LRS",
    reference: "some book",
  },
//   {
//     type: "GI",
//     drug: "Magnesium sulphate",
//     dogMin: 0.75,
//     dogMax: 1,
//     catMin: 0.75,
//     catMax: 1,
//     doseUnit: "mEq/kg/d",
//     concUnit: "mg/ml",
//     basicConc: "",
//     noteDog:
//       "then later 0.3–0.5 mEq/kg/d for 3–5 days, in 5% dextrose",
//     noteCat:
//       "then later 0.3–0.5 mEq/kg/d for 3–5 days, in 5% dextrose",
//     reference: "some book",
//   },
  ];
  
  export default drugData;
  