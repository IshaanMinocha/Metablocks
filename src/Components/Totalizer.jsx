import React, { useState } from 'react';

const Totalizer = () => {
  const [buildingType, setBuildingType] = useState('');
  const [bhk, setBHK] = useState('');
  const [planType, setPlanType] = useState('');
  const [selectedComponents, setSelectedComponents] = useState({
    chairs: '',
    clock: '',
    sofa: '',
    tv: '',
    bed: '',
    gilmirah: '',
  });

  // Generic cost estimations and component prices
  const costEstimations = {
    flat: {
      '1bhk': 10000,
      '2bhk': 15000,
      '3bhk': 20000,
    },
    villa: {
      '1bhk': 20000,
      '2bhk': 25000,
      '3bhk': 30000,
    },
  };

  const componentPrices = {
    chairs: {
      option1: 50,
      option2: 75,
      option3: 100,
    },
    clock: {
      option1: 30,
      option2: 45,
      option3: 60,
    },
    sofa: {
      option1: 100,
      option2: 150,
      option3: 200,
    },
    tv: {
      option1: 200,
      option2: 300,
      option3: 400,
    },
    bed: {
      option1: 80,
      option2: 120,
      option3: 160,
    },
    gilmirah: {
      option1: 150,
      option2: 225,
      option3: 300,
    },
  };

  const handleBuildingTypeChange = (type) => {
    setBuildingType(type);
    setBHK('');
    setPlanType('');
  };

  const handleBHKChange = (bhk) => {
    setBHK(bhk);
  };

  const handlePlanTypeChange = (type) => {
    setPlanType(type);
  };

  const handleComponentChange = (type, option) => {
    setSelectedComponents({
      ...selectedComponents,
      [type]: option,
    });
  };

  const calculateTotalCost = () => {
    const buildingCost = costEstimations[buildingType][bhk];
    const componentCosts = Object.keys(selectedComponents).reduce(
      (total, component) => total + componentPrices[component][selectedComponents[component]],
      0
    );

    return buildingCost + componentCosts;
  };

  return (
    <div className="container mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="text-lg font-bold">Building Type:</label>
        <select
          className="border p-2 ml-2"
          onChange={(e) => handleBuildingTypeChange(e.target.value)}
        >
          <option value="">Select</option>
          <option value="flat">Flat</option>
          <option value="villa">Villa</option>
        </select>
      </div>

      {buildingType === 'flat' && (
        <div className="mb-4">
          <label className="text-lg font-bold">BHK:</label>
          <select
            className="border p-2 ml-2"
            onChange={(e) => handleBHKChange(e.target.value)}
          >
            <option value="">Select</option>
            <option value="1bhk">1 BHK</option>
            <option value="2bhk">2 BHK</option>
            <option value="3bhk">3 BHK</option>
          </select>
        </div>
      )}

      <div className="mb-4">
        <label className="text-lg font-bold">Plan Type:</label>
        <select
          className="border p-2 ml-2"
          onChange={(e) => handlePlanTypeChange(e.target.value)}
        >
          <option value="">Select</option>
          <option value="plan1">Plan 1</option>
          <option value="plan2">Plan 2</option>
          <option value="plan3">Plan 3</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="text-lg font-bold">Choose Components:</label>
        {Object.keys(selectedComponents).map((component) => (
          <div key={component} className="flex items-center mb-2">
            <label className="mr-2">{component}:</label>
            <select
              className="border p-2"
              onChange={(e) => handleComponentChange(component, e.target.value)}
            >
              <option value="">Select</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
        ))}
      </div>

      {buildingType && bhk && planType && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Total Estimated Cost:</h2>
          <p className="text-2xl font-bold">${calculateTotalCost()}</p>
        </div>
      )}
    </div>
  );
};

export default Totalizer;
