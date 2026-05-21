import React, { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';

const CHAMPIONS = [
  'Aatrox', 'Ahri', 'Akali', 'Akshan', 'Alistar', 'Amumu', 'Anivia', 'Annie', 'Aphelios',
  'Ashe', 'Aurelion Sol', 'Aurora', 'Azir', 'Bard', "Bel'Veth", 'Blitzcrank', 'Brand',
  'Braum', 'Briar', 'Caitlyn', 'Camille', 'Cassiopeia', "Cho'Gath", 'Corki', 'Darius',
  'Diana', 'Draven', 'Dr. Mundo', 'Ekko', 'Elise', 'Evelynn', 'Ezreal', 'Fiddlesticks',
  'Fiora', 'Fizz', 'Galio', 'Gangplank', 'Garen', 'Gnar', 'Gragas', 'Graves', 'Gwen',
  'Hecarim', 'Heimerdinger', 'Hwei', 'Illaoi', 'Ivern', 'Janna', 'Jarvan IV', 'Jax',
  'Jayce', 'Jhin', 'Jinx', "K'Sante", 'Kalista', 'Karma', 'Karthus', 'Kassadin',
  'Katarina', 'Kayle', 'Kayn', 'Kennen', "Kha'Zix", 'Kindred', 'Kled', "Kog'Maw",
  'LeBlanc', 'Lee Sin', 'Leona', 'Lillia', 'Lissandra', 'Lulu', 'Lux', 'Malphite',
  'Malzahar', 'Maokai', 'Master Yi', 'Milio', 'Miss Fortune', 'Mordekaiser', 'Morgana',
  'Naafiri', 'Nami', 'Nasus', 'Nautilus', 'Neeko', 'Nidalee', 'Nilah', 'Nocturne',
  'Nunu & Willump', 'Olaf', 'Orianna', 'Ornn', 'Pantheon', 'Poppy', 'Pyke', 'Qiyana',
  'Quinn', 'Rakan', 'Rammus', "Rek'Sai", 'Renata Glasc', 'Renekton', 'Rengar', 'Riven',
  'Rumble', 'Ryze', 'Samira', 'Sejuani', 'Senna', 'Seraphine', 'Sett', 'Shaco',
  'Shen', 'Shyvana', 'Singed', 'Sion', 'Sivir', 'Skarner', 'Sona', 'Soraka', 'Swain',
  'Sylas', 'Syndra', 'Tahm Kench', 'Taliyah', 'Talon', 'Taric', 'Teemo', 'Thresh',
  'Tristana', 'Trundle', 'Tryndamere', 'Twisted Fate', 'Twitch', 'Udyr', 'Urgot',
  'Ursion', 'Varus', 'Vayne', 'Veigar', "Vel'Koz", 'Vex', 'Vi', 'Viego', 'Viktor',
  'Vladimir', 'Volibear', 'Warwick', 'Wukong', 'Xayah', 'Xerath', 'Xin Zhao', 'Yasuo',
  'Yone', 'Yorick', 'Yuumi', 'Zac', 'Zed', 'Zeri', 'Ziggs', 'Zilean', 'Zoe', 'Zyra'
];

interface ChampionSelectProps {
  onChampionSelect: (champion: string) => void;
  selectedChampion: string;
}

const ChampionSelect: React.FC<ChampionSelectProps> = ({ onChampionSelect, selectedChampion }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChampions = useMemo(() => {
    return CHAMPIONS.filter((champ) =>
      champ.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-between bg-white hover:bg-gray-50"
      >
        <span>{selectedChampion || 'Select Champion'}</span>
        <ChevronDown size={20} />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
          <input
            type="text"
            placeholder="Search champion..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border-b border-gray-200 focus:outline-none"
          />
          <div className="max-h-64 overflow-y-auto">
            {filteredChampions.map((champ) => (
              <button
                key={champ}
                onClick={() => {
                  onChampionSelect(champ);
                  setIsOpen(false);
                  setSearchTerm('');
                }}
                className="w-full text-left px-4 py-2 hover:bg-blue-100 transition-colors"
              >
                {champ}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChampionSelect;
