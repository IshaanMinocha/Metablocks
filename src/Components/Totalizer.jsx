import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

const Totalizer = () => {
    const navigate = useNavigate();
    const [buildingType, setBuildingType] = useState('flat');
    const [bhk, setBHK] = useState('');
    const [selectedComponents, setSelectedComponents] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [ChairComponent, setChairComponent] = useState(null);

    useEffect(() => {
        if (selectedComponents.includes('chair') && bhk) {
            import(`../components/Chair${bhk}`).then((module) => {
                setChairComponent(module.default);
            });
        } else {
            setChairComponent(null);
        }
    }, [selectedComponents, bhk]);

    const costEstimations = {
        flat: {
            '1bhk': 100000,
            '2bhk': 150000,
            '3bhk': 200000,
        },
        table: 5000,
        chair: 3000,
        sofa: 10000,
        bed: 8000,
        wardrobe: 7000,
        dining: 12000,

    };


    const handleBHKChange = (bhk) => {
        setBHK(bhk);
    };

    const handleComponentChange = (component) => {
        if (showResults) {
            setBuildingType('flat');
            setBHK('');
            setSelectedComponents([]);
            setShowResults(false);
        }

        setSelectedComponents((prevSelected) => {
            if (prevSelected.includes(component)) {
                return prevSelected.filter((item) => item !== component);
            } else {
                return [...prevSelected, component];
            }
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setShowResults(true);
    };

    const calculateTotalCost = () => {
        const bhkCost = costEstimations[buildingType][bhk] || 0;
        const componentsCost = selectedComponents.reduce((total, component) => {
            return total + (costEstimations[component] || 0);
        }, 0);

        return bhkCost + componentsCost;
    };

    const renderFlatTypeButtons = () => {
        const flatTypeButtons = [];
        if (bhk === '1bhk') {
            flatTypeButtons.push(
                <button
                    key="1bhk"
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 mr-4"
                    onClick={() => navigate(`/1bhk`)}
                >
                    1 BHK
                </button>
            );
        } else if (bhk === '2bhk') {
            flatTypeButtons.push(
                <button
                    key="2bhk"
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 mr-4"
                    onClick={() => navigate(`/2bhk`)}
                >
                    2 BHK
                </button>
            );
        } else if (bhk === '3bhk') {
            flatTypeButtons.push(
                <button
                    key="3bhk"
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 mr-4"
                    onClick={() => navigate(`/3bhk`)}
                >
                    3 BHK
                </button>
            );
        }
        return flatTypeButtons;
    };

    return (
        <div className="container mx-auto my-8 p-8 bg-white rounded-lg shadow-md max-w-md">
            <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                    <label className="block text-lg font-bold mb-2">Building Type:</label>
                    <p className="text-gray-800">{buildingType}</p>
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-bold mb-2">BHK:</label>
                    <select
                        className="border p-2 w-full"
                        onChange={(e) => handleBHKChange(e.target.value)}
                        disabled={showResults}
                    >
                        <option value="">Select</option>
                        <option value="1bhk">1 BHK</option>
                        <option value="2bhk">2 BHK</option>
                        <option value="3bhk">3 BHK</option>
                    </select>
                </div>

                <label className="block text-lg font-bold mb-2">Choose Components:</label>
                <div className="mb-4 grid grid-cols-3">
                    <div className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            id="chair"
                            value="chair"
                            className="w-5 h-5 m-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                            checked={selectedComponents.includes('chair')}
                            onChange={() => handleComponentChange('chair')}
                        />
                        <label htmlFor="chair" className="cursor-pointer">Chair</label>
                    </div>
                    <div className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            id="wardrobe"
                            value="wardrobe"
                            className="w-5 h-5 m-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                            checked={selectedComponents.includes('wardrobe')}
                            onChange={() => handleComponentChange('wardrobe')}
                        />
                        <label htmlFor="chair" className="cursor-pointer">Almirah</label>
                    </div>
                    <div className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            id="table"
                            value="table"
                            className="w-5 h-5 m-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                            checked={selectedComponents.includes('table')}
                            onChange={() => handleComponentChange('table')}
                        />
                        <label htmlFor="chair" className="cursor-pointer">Table</label>
                    </div>
                    <div className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            id="sofa"
                            value="sofa"
                            className="w-5 h-5 m-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                            checked={selectedComponents.includes('sofa')}
                            onChange={() => handleComponentChange('sofa')}
                        />
                        <label htmlFor="chair" className="cursor-pointer">Sofa</label>
                    </div>
                    <div className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            id="bed"
                            value="bed"
                            className="w-5 h-5 m-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                            checked={selectedComponents.includes('bed')}
                            onChange={() => handleComponentChange('bed')}
                        />
                        <label htmlFor="chair" className="cursor-pointer">Bedframe</label>
                    </div>
                    <div className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            id="dining"
                            value="dining"
                            className="w-5 h-5 m-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                            checked={selectedComponents.includes('dining')}
                            onChange={() => handleComponentChange('dining')}
                        />
                        <label htmlFor="chair" className="cursor-pointer">Dining Set</label>
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                    disabled={showResults}
                >
                    Submit
                </button>
            </form>

            {showResults && (
                <div className="mt-4">
                    <h2 className="text-xl font-bold mb-2">Total Estimated Cost:</h2>
                    <p className="text-2xl font-bold">₹{calculateTotalCost()}</p>
                </div>
            )}

            {showResults && (
                <div className="mt-4">
                    <h3 className="text-lg font-bold mb-2">Choose Flat Type:</h3>
                    {renderFlatTypeButtons()}
                </div>
            )}

            {showResults && selectedComponents.includes('chair') && bhk && ChairComponent && (
                <div className="mt-4">
                    <h3 className="text-lg font-bold mb-2">Selected Chair Component:</h3>
                    <Suspense fallback={<div>Loading...</div>}>
                        <ChairComponent />
                    </Suspense>
                </div>
            )}
        </div>
    );
};

export default Totalizer;

