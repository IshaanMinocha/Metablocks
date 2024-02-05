import React from 'react';

const Bhk1 = () => {
  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4">Flat Type: 1 BHK</h2>
      <p className="text-gray-600">
        Components Selected:
      </p>

      <ul className="list-disc mt-4 ml-6">
        <li>{1}</li>
        <li>{2}</li>
        <li>{3}</li>
      </ul>

      <div className="mt-8 z-10">
        <h3 className="text-xl font-bold mb-4">Visualize Sustainability</h3>
        <model-viewer
          src='/1bhk.glb'
          style={{
            width: '80%',
            margin: "auto",
            height: '400px',
            backgroundColor: '#70BCD1',
            '--poster-color': '#ffffff00',
          }}
          ios-src="https://cdn.glitch.com/36cb8393-65c6-408d-a538-055ada20431b/Astronaut.usdz?v=1569545377878"
          poster="logo.png"
          alt="mgcms"
          shadow-intensity="1"
          camera-controls
          auto-rotate
          ar
        />
      </div>

      <div className="my-8">
        <a
          href="your_vr_house_url"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Visit House in VR/3D/Metaverse
        </a>
      </div>
    </div>
  );
};

export default Bhk1;
