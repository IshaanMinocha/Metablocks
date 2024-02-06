import React, { useState, useEffect } from 'react';

const TextTo3D = () => {
  const [textInput, setTextInput] = useState('');
  const [taskId, setTaskId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const createTextTo3DTask = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://api.meshy.ai/v1/text-to-3d', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer msy_NzPvL01Z0bKIi0ziGhvGKafY7kzX5i7z0ts3',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            object_prompt: textInput,
            style_prompt: 'Your style prompt here',
            enable_pbr: true,
            resolution: '1024',
            art_style: 'realistic',
            negative_prompt: 'Avoid these characteristics',
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create Text to 3D task');
        }

        const result = await response.json();
        setTaskId(result.result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (textInput) {
      createTextTo3DTask();
    }
  }, [textInput]);

  const retrieveTextTo3DTask = async () => {
    if (taskId) {
      try {
        const response = await fetch(`https://api.meshy.ai/v1/text-to-3d/${taskId}`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer msy_NzPvL01Z0bKIi0ziGhvGKafY7kzX5i7z0ts3',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to retrieve Text to 3D task');
        }

        const result = await response.json();
        console.log(result);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <input
        type="text"
        placeholder="Enter text for 3D model"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        className="p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={retrieveTextTo3DTask}
        disabled={loading || !textInput}
        className={`bg-blue-500 text-white p-2 rounded ${loading && 'cursor-not-allowed'}`}
      >
        {loading ? 'Loading...' : 'Generate 3D Model'}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default TextTo3D;
