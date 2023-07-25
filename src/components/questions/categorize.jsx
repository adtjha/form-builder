import React from 'react';

const CategorizeQuestion = ({ content, image }) => {
    return (
        <div className="m-4">
            {image && <img src={image} alt="Question Image" />}
            <label class="block">
                <span class="text-gray-700">Question</span>
                <input type="text" class="h-12 p-3 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="Type your question here..." />
            </label>
            {/* Additional logic and UI elements specific to Categorize questions can be added here */}
        </div>
    );
};

export default CategorizeQuestion;
