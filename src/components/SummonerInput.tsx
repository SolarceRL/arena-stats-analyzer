import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SummonerInputProps {
  onSearch: (summonerName: string) => void;
  isLoading: boolean;
}

const SummonerInput: React.FC<SummonerInputProps> = ({ onSearch, isLoading }) => {
  const [input, setInput] = useState('Alfalfa-BoGuh');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Enter summoner name (e.g., SummonerName-Region)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 flex items-center gap-2 transition-colors"
        >
          <Search size={20} />
          {isLoading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>
    </form>
  );
};

export default SummonerInput;
