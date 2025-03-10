import React from 'react';

const aiTools = [
  {
    name: 'Health Suggestion - AI',
    description: 'Advanced AI system that analyzes symptoms and provides potential diagnoses with recommended actions.',
    icon: '🔍',
    link: 'https://example.com/health-suggestion' // Add your link here
  },
  {
    name: 'Medical Report Analysis',
    description: 'AI-powered tool for analyzing medical images including X-rays, MRIs, and CT scans.',
    icon: '🔬',
    link: 'https://example.com/medical-report-analysis' // Add your link here
  },
  {
    name: 'Find Nearest Hospital',
    description: 'Smart system for finding the best hospitals near your location.',
    icon: '🗺️',
    link: '/maps' // Add your link here
  },
  {
    name: 'Medication Reminder',
    description: 'AI tool that checks for potential drug interactions and side effects.',
    icon: '💊',
    link: 'https://example.com/medication-reminder' // Add your link here
  },
  {
    name: 'Mental Health Assistant',
    description: 'AI-powered mental health screening and support system.',
    icon: '🧠',
    link: 'https://example.com/mental-health-assistant' // Add your link here
  },
  {
    name: 'Diet & Nutrition AI',
    description: 'Personalized nutrition recommendations based on health data and goals.',
    icon: '🥗',
    link: 'https://example.com/diet-nutrition-ai' 
  }
];

function AITools() {
  const handleLearnMoreClick = (link) => {
    window.open(link, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          AI-Powered Healthcare Tools
        </h2>
        <p className="mt-4 text-xl text-gray-500">
          Explore our suite of advanced AI tools designed to revolutionize healthcare
        </p>
      </div>

      <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {aiTools.map((tool, index) => (
          <div
            key={index}
            className="relative bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="text-4xl mb-4">{tool.icon}</div>
            <h3 className="text-lg font-medium text-gray-900">{tool.name}</h3>
            <p className="mt-2 text-base text-gray-500">{tool.description}</p>
            <button 
              onClick={() => handleLearnMoreClick(tool.link)}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200"
            >
              Learn more
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AITools;