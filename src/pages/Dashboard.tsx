import React, { useState } from 'react';
import ChampionSelect from '../components/ChampionSelect';
import SummonerInput from '../components/SummonerInput';
import SummaryCard from '../components/SummaryCard';
import StatsTable from '../components/StatsTable';
import { StatsSummary } from '../types/arena';

const Dashboard: React.FC = () => {
  const [selectedChampion, setSelectedChampion] = useState('');
  const [stats, setStats] = useState<StatsSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (summonerName: string) => {
    if (!selectedChampion) {
      setError('Please select a champion first');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          summonerName,
          championName: selectedChampion,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze summoner');
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Arena Stats Analyzer</h1>
          <p className="text-gray-600">Analyze League of Legends Arena statistics by player and champion</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Champion</label>
              <ChampionSelect onChampionSelect={setSelectedChampion} selectedChampion={selectedChampion} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Summoner Name</label>
              <SummonerInput onSearch={handleSearch} isLoading={isLoading} />
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-8">
            {error}
          </div>
        )}

        <SummaryCard stats={stats} isLoading={isLoading} />

        {stats && (
          <>
            <StatsTable
              title="Augments"
              data={stats.augments}
              columns={[
                { label: 'Augment', key: 'augment_name' },
                { label: 'Pick Count', key: 'pick_count' },
                { label: 'Pick %', key: 'pick_rate', format: (v) => `${v.toFixed(1)}%` },
                { label: 'Win %', key: 'win_rate', format: (v) => `${v.toFixed(1)}%` },
                { label: 'Avg Placement', key: 'avg_placement', format: (v) => v.toFixed(1) },
              ]}
            />

            <StatsTable
              title="Items"
              data={stats.items}
              columns={[
                { label: 'Item', key: 'item_name' },
                { label: 'Pick Count', key: 'pick_count' },
                { label: 'Pick %', key: 'pick_rate', format: (v) => `${v.toFixed(1)}%` },
                { label: 'Win %', key: 'win_rate', format: (v) => `${v.toFixed(1)}%` },
                { label: 'Avg Placement', key: 'avg_placement', format: (v) => v.toFixed(1) },
              ]}
            />

            <StatsTable
              title="Summoner Spells"
              data={stats.summoner_spells}
              columns={[
                { label: 'Spell', key: 'spell_name' },
                { label: 'Pick Count', key: 'pick_count' },
                { label: 'Pick %', key: 'pick_rate', format: (v) => `${v.toFixed(1)}%` },
                { label: 'Win %', key: 'win_rate', format: (v) => `${v.toFixed(1)}%` },
                { label: 'Avg Placement', key: 'avg_placement', format: (v) => v.toFixed(1) },
              ]}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
