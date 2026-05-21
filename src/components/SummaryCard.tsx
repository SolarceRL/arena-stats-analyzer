import React from 'react';
import { StatsSummary } from '../types/arena';

interface SummaryCardProps {
  stats: StatsSummary | null;
  isLoading: boolean;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ stats, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-lg mb-8 animate-pulse">
        <div className="h-8 bg-blue-600 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-6 bg-blue-600 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-gray-100 text-gray-600 p-6 rounded-lg mb-8 text-center">
        Enter a summoner name and select a champion to see stats
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-lg mb-8">
      <h1 className="text-3xl font-bold mb-4">{stats.champion_name} Arena Stats</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-blue-100 text-sm">Total Matches</p>
          <p className="text-2xl font-bold">{stats.total_matches}</p>
        </div>
        <div>
          <p className="text-blue-100 text-sm">Win Rate</p>
          <p className="text-2xl font-bold">{stats.win_rate.toFixed(1)}%</p>
        </div>
        <div>
          <p className="text-blue-100 text-sm">Avg Placement</p>
          <p className="text-2xl font-bold">{stats.avg_placement.toFixed(1)}</p>
        </div>
        <div>
          <p className="text-blue-100 text-sm">Total Wins</p>
          <p className="text-2xl font-bold">{stats.wins}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
