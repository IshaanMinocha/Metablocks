// import React, { useState, useEffect, lazy, Suspense } from 'react';
// import Chair1 from '../components/Chair1';
// import Chair2 from '../components/Chair2';

// const Totalizer = () => {
//     const [buildingType, setBuildingType] = useState('flat');
//     const [bhk, setBHK] = useState('');
//     const [selectedComponents, setSelectedComponents] = useState([]);
//     const [showResults, setShowResults] = useState(false);
//     const [ChairComponent, setChairComponent] = useState(null);

//     useEffect(() => {
//         // Dynamically load Chair component based on bhk
//         if (selectedComponents.includes('chair') && bhk) {
//             import(`../components/Chair${bhk}`).then((module) => {
//                 setChairComponent(module.default);
//             });
//         } else {
//             setChairComponent(null);
//         }
//     }, [selectedComponents, bhk]);

//     const costEstimations = {
//         flat: {
//             '1bhk': 10000,
//             '2bhk': 15000,
//             '3bhk': 20000,
//         },
//         chair: 500,
//         clock: 200,
//         sofa: 1500,
//         tv: 1000,
//         bed: 1200,
//         almirah: 800,
//     };

//     const handleBHKChange = (bhk) => {
//         setBHK(bhk);
//     };

//     const handleComponentChange = (component) => {
//         if (showResults) {
//             setBuildingType('flat');
//             setBHK('');
//             setSelectedComponents([]);
//             setShowResults(false);
//         }

//         setSelectedComponents((prevSelected) => {
//             if (prevSelected.includes(component)) {
//                 return prevSelected.filter((item) => item !== component);
//             } else {
//                 return [...prevSelected, component];
//             }
//         });
//     };

//     const handleFormSubmit = (e) => {
//         e.preventDefault();
//         setShowResults(true);
//     };

//     const calculateTotalCost = () => {
//         const bhkCost = costEstimations[buildingType][bhk] || 0;
//         const componentsCost = selectedComponents.reduce((total, component) => {
//             return total + (costEstimations[component] || 0);
//         }, 0);

//         return bhkCost + componentsCost;
//     };

//     return (
//         <div className="container mx-auto my-8 p-8 bg-white rounded-lg shadow-md max-w-md">
//             <form onSubmit={handleFormSubmit}>
//                 <div className="mb-4">
//                     <label className="block text-lg font-bold mb-2">Building Type:</label>
//                     <p className="text-gray-800">{buildingType}</p>
//                 </div>

//                 <div className="mb-4">
//                     <label className="block text-lg font-bold mb-2">BHK:</label>
//                     <select
//                         className="border p-2 w-full"
//                         onChange={(e) => handleBHKChange(e.target.value)}
//                         disabled={showResults}
//                     >
//                         <option value="">Select</option>
//                         <option value="1bhk">1 BHK</option>
//                         <option value="2bhk">2 BHK</option>
//                         <option value="3bhk">3 BHK</option>
//                     </select>
//                 </div>

//                 <div className="mb-4">
//                     <label className="block text-lg font-bold mb-2">Choose Components:</label>
//                     <div className="flex items-center mb-2">
//                         <input
//                             type="checkbox"
//                             id="chair"
//                             value="chair"
//                             className="w-5 h-5 m-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
//                             checked={selectedComponents.includes('chair')}
//                             onChange={() => handleComponentChange('chair')}
//                         />
//                         <label htmlFor="chair" className="cursor-pointer">Chair</label>
//                     </div>
//                     <div className="flex items-center mb-2">
//                         <input
//                             type="checkbox"
//                             id="clock"
//                             value="clock"
//                             className="w-5 h-5 m-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
//                             checked={selectedComponents.includes('clock')}
//                             onChange={() => handleComponentChange('clock')}
//                         />
//                         <label htmlFor="clock" className="cursor-pointer">Clock</label>
//                     </div>
//                     <div className="flex items-center mb-2">
//                         <input
//                             type="checkbox"
//                             id="sofa"
//                             value="sofa"
//                             className="w-5 h-5 m-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
//                             checked={selectedComponents.includes('sofa')}
//                             onChange={() => handleComponentChange('sofa')}
//                         />
//                         <label htmlFor="sofa" className="cursor-pointer">Sofa</label>
//                     </div>
//                     <div className="flex items-center mb-2">
//                         <input
//                             type="checkbox"
//                             id="almirah"
//                             value="almirah"
//                             className="w-5 h-5 m-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
//                             checked={selectedComponents.includes('almirah')}
//                             onChange={() => handleComponentChange('almirah')}
//                         />
//                         <label htmlFor="almirah" className="cursor-pointer">Almirah</label>
//                     </div>
//                     <div className="flex items-center mb-2">
//                         <input
//                             type="checkbox"
//                             id="tv"
//                             value="tv"
//                             className="w-5 h-5 m-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
//                             checked={selectedComponents.includes('tv')}
//                             onChange={() => handleComponentChange('tv')}
//                         />
//                         <label htmlFor="tv" className="cursor-pointer">TV</label>
//                     </div>
//                     <div className="flex items-center mb-2">
//                         <input
//                             type="checkbox"
//                             id="bed"
//                             value="bed"
//                             className="w-5 h-5 m-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
//                             checked={selectedComponents.includes('bed')}
//                             onChange={() => handleComponentChange('bed')}
//                         />
//                         <label htmlFor="bed" className="cursor-pointer">Bed</label>
//                     </div>
//                 </div>

//                 <button
//                     type="submit"
//                     className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
//                     disabled={showResults}
//                 >
//                     Submit
//                 </button>
//             </form>

//             {showResults && (
//                 <div className="mt-4">
//                     <h2 className="text-xl font-bold mb-2">Total Estimated Cost:</h2>
//                     <p className="text-2xl font-bold">₹{calculateTotalCost()}</p>
//                 </div>
//             )}

//             {showResults && selectedComponents.includes('chair') && bhk && ChairComponent && (
//                 <div className="mt-4">
//                     <h3 className="text-lg font-bold mb-2">Selected Chair Component:</h3>
//                     <Suspense fallback={<div>Loading...</div>}>
//                         <ChairComponent />
//                     </Suspense>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Totalizer;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Totalizer = () => {
    const navigate = useNavigate();
    const [buildingType, setBuildingType] = useState('1bhk');
    const [selectedAddons, setSelectedAddons] = useState([]);
    const [showModel, setShowModel] = useState(false);
    const [numFloors, setNumFloors] = useState(1);
    const [factorySize, setFactorySize] = useState('small');

    const handleBuildingTypeChange = (event) => {
        setBuildingType(event.target.value);
        setSelectedAddons([]);
        setNumFloors(1);
        setFactorySize('small');
    };

    const handleAddonChange = (addon) => {
        const updatedAddons = selectedAddons.includes(addon)
            ? selectedAddons.filter((selectedAddon) => selectedAddon !== addon)
            : [...selectedAddons, addon];

        setSelectedAddons(updatedAddons);
    };

    const handleSubmit = () => {
        switch (buildingType) {
            case '1bhk':
                navigate('/1bhk');
                break;
            case '2bhk':
                navigate('/2bhk');
                break;
            case '3bhk':
                navigate('/3bhk');
                break;
            default:
                console.error('Invalid flat type');
                break;
        }
    };


    useEffect(() => {
        setShowModel(false);
    }, [buildingType, selectedAddons, numFloors, factorySize]);

    const renderModel = () => {
        return (
            <div className="mt-4">
                <Canvas>
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <Box args={[1, 1, 1]} rotation={[0, 0.01, 0]} />
                </Canvas>
            </div>
        );
    };

    return (
        <div className="container mx-auto my-10 max-w-2xl p-4 bg-gray-100 rounded-lg">
            <label htmlFor="buildingType" className="block text-2xl font-bold mb-2">
                Flat Type:
            </label>
            <select
                id="buildingType"
                value={buildingType}
                onChange={handleBuildingTypeChange}
                className="w-full p-2 border border-gray-300 rounded-md"
            >
                <option value="1bhk">1 BHK</option>
                <option value="2bhk">2 BHK</option>
                <option value="3bhk">3 BHK</option>
            </select>


            <p className="text-2xl font-bold my-4 ">Interior Design Add ons: </p>
            <div className="mt-4 grid grid-cols-3">
                <label className="flex items-center mb-2 text-lg">
                    <input
                        type="checkbox"
                        checked={selectedAddons.includes('table')}
                        onChange={() => handleAddonChange('table')}
                        className="w-5 h-5 m-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    />
                    Table
                </label>
                <label className="flex items-center mb-2 text-lg">
                    <input
                        type="checkbox"
                        checked={selectedAddons.includes('chair')}
                        onChange={() => handleAddonChange('chair')}
                        className="w-5 h-5 m-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    />
                    Chair
                </label>
                <label className="flex items-center mb-2 text-lg">
                    <input
                        type="checkbox"
                        checked={selectedAddons.includes('sofa')}
                        onChange={() => handleAddonChange('sofa')}
                        className="w-5 h-5 m-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    />
                    Sofa
                </label>
                <label className="flex items-center mb-2 text-lg">
                    <input
                        type="checkbox"
                        checked={selectedAddons.includes('bed')}
                        onChange={() => handleAddonChange('bed')}
                        className="w-5 h-5 m-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    />
                    Bed
                </label>
                <label className="flex items-center mb-2 text-lg">
                    <input
                        type="checkbox"
                        checked={selectedAddons.includes('wardrobe')}
                        onChange={() => handleAddonChange('wardrobe')}
                        className="w-5 h-5 m-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    />
                    Wardrobe
                </label>
                <label className="flex items-center mb-2 text-lg">
                    <input
                        type="checkbox"
                        checked={selectedAddons.includes('dining')}
                        onChange={() => handleAddonChange('dining')}
                        className="w-5 h-5 m-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    />
                    Dining Set
                </label>
            </div>

            {showModel && renderModel()}

            <button
                onClick={handleSubmit}
                className="mt-4 bg-slate-500 text-white py-2 px-4 text-xl rounded-md hover:bg-slate-700 focus:outline-none focus:shadow-outline-blue mx-auto text-center"
            >
                Submit
            </button>
        </div>
    );
};

export default Totalizer;
