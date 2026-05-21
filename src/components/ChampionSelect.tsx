import React, { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';

const CHAMPIONS = [
  'Ahri', 'Akali', 'Akshan', 'Alistar', 'Amumu', 'Anivia', 'Annie', 'Aphelios', 'Ashe',
  'Aurelion Sol', 'Aurora', 'Azir', 'Bard', 'Bel\'Veth', 'Blitzcrank', 'Brand', 'Braum',
  'Briar', 'Caitlyn', 'Camille', 'Cassiopeia', 'Cho\'Gath', 'Corki', 'Darius', 'Diana',
  'Draven', 'Dr. Mundo', 'Dragonite', 'Ekko', 'Elise', 'Elric', 'Evelynn', 'Ezreal',
  'Fiddlesticks', 'Fiora', 'Fizz', 'Funnelwick', 'Galio', 'Gangplank', 'Garen', 'Gnar',
  'Gnarly', 'Gragas', 'Graves', 'Gwen', 'Hecarim', 'Heimerdinger', 'Hwei', 'Illaoi',
  'Evelynn', 'Ivern', 'Janna', 'Jarvan IV', 'Jax', 'Jayce', 'Jhin', 'Jinx', 'K\'Sante',
  'Kalista', 'Karma', 'Karthus', 'Kassadin', 'Katarina', 'Kayle', 'Kaysa', 'Kayn',
  'Kennen', 'Kha\'Zix', 'Kindred', 'Kled', 'Kog\'Maw', 'K\'Santé', 'LeBlanc', 'Lee Sin',
  'Leona', 'Lillia', 'Lissandra', 'Lulu', 'Lux', 'Malphite', 'Malzahar', 'Maokai',
  'Master Yi', 'Matchet', 'Milio', 'Miss Fortune', 'Mistwood', 'Miya', 'Mordekaiser',
  'Morgana', 'Morrello', 'Naafiri', 'Nami', 'Nasus', 'Nautilus', 'Neeko', 'Neowarp',
  'Nidalee', 'Nilah', 'Nocturne', 'Noxus', 'Nunuette', 'Nunu & Willump', 'Olaf', 'Orianna',
  'Ornn', 'Overcharge', 'Overlord', 'Overwatch', 'Pals', 'Pantheon', 'Peacekeeper', 'Poppy',
  'Pyke', 'Qiyana', 'Quinn', 'Rakan', 'Rammus', 'Rank', 'Rek\'Sai', 'Renata Glasc',
  'Renekton', 'Rengar', 'Reno', 'Renown', 'Resistance', 'Revenant', 'Rhaast', 'Rhino',
  'Riven', 'Roaming', 'Roar', 'Rock', 'Rogue', 'Roux', 'Rumble', 'Rune', 'Ryze',
  'Sabledon', 'Sack', 'Sacred', 'Sadist', 'Safe', 'Saga', 'Sage', 'Sakura', 'Salsa',
  'Samira', 'Sanctuary', 'Sandborn', 'Sandstorm', 'Sandu', 'Sandworm', 'Sangre', 'Sanguine',
  'Sanity', 'Sanna', 'Sanson', 'Santa', 'Santorini', 'Sapient', 'Sapphire', 'Sarcasm',
  'Sarda', 'Sardine', 'Sarge', 'Sargent', 'Sari', 'Sarin', 'Sarita', 'Sarn', 'Sarong',
  'Saros', 'Sarpanch', 'Sarrah', 'Sarre', 'Sarsa', 'Sarsaparilla', 'Sarsecah', 'Sarsena',
  'Sarsenet', 'Sart', 'Sartain', 'Sartaria', 'Sartas', 'Sarte', 'Sartenada', 'Sartenia',
  'Sartford', 'Sarthak', 'Sarthi', 'Sartiana', 'Sartichoke', 'Sartig', 'Sartin', 'Sarting',
  'Sartipedia', 'Sartira', 'Sartire', 'Sartires', 'Sartis', 'Sartish', 'Sartism', 'Sartist',
  'Sartitech', 'Sartively', 'Sartivity', 'Sartiwood', 'Sartizans', 'Sartonel', 'Sarton',
  'Sartor', 'Sartorial', 'Sartorian', 'Sartorie', 'Sartoris', 'Sartorius', 'Sartorite',
  'Sartory', 'Sartos', 'Sartouch', 'Sartough', 'Sartouille', 'Sartoune', 'Sarty', 'Saru',
  'Sarum', 'Sarung', 'Sarus', 'Sarva', 'Sarvadaman', 'Sarvajana', 'Sarvakara', 'Sarvamangala',
  'Sarvan', 'Sarvandha', 'Sarvangasana', 'Sarvapalli', 'Sarvapriya', 'Sarvasakshi', 'Sarvasolah',
  'Sarvastava', 'Sarvatah', 'Sarvatobhadra', 'Sarvavara', 'Sarvavit', 'Sarvavrata', 'Sarvaya',
  'Sarvayoni', 'Sarve', 'Sarved', 'Sarveda', 'Sarvesh', 'Sarveshan', 'Sarvi', 'Sarvica',
  'Sarvika', 'Sarvila', 'Sarvin', 'Sarvini', 'Sarvish', 'Sarvita', 'Sarvite', 'Sarvitermy',
  'Sarvitre', 'Sarvitri', 'Sarvitry', 'Sarvity', 'Sarviya', 'Sarviyah', 'Sarviyat', 'Sarviyeh',
  'Sarviyeta', 'Sarviyeti', 'Sarviyette', 'Sarviyeva', 'Sarviyey', 'Sarviyit', 'Sarviyita',
  'Sarviyite', 'Sarviyith', 'Sarviyitya', 'Sarviyitye', 'Sarviyitu', 'Sarviyity', 'Sarviyius',
  'Sarviyiy', 'Sarviyiya', 'Sarviyiye', 'Sarviyiyo', 'Sarviyiyoh', 'Sarviyiyya', 'Sarviyiyye',
  'Sarviyiyyu', 'Sarviyiz', 'Sarviyiza', 'Sarviyize', 'Sarviyizo', 'Sarviyizzi', 'Sarviyizzy',
  'Sarviyya', 'Sarviyye', 'Sarviyyo', 'Sarviyyu', 'Sarvo', 'Sarvok', 'Sarvola', 'Sarvoli',
  'Sarvolla', 'Sarvon', 'Sarvona', 'Sarvonic', 'Sarvonie', 'Sarvonics', 'Sarvonics', 'Sarvonica',
  'Sarvonica', 'Sarvonika', 'Sarvonik', 'Sarvonikas', 'Sarvonique', 'Sarvonique', 'Sarvonir',
  'Sarvonira', 'Sarvonire', 'Sarvoniric', 'Sarvoniry', 'Sarvonitta', 'Sarvonium', 'Sarvonius',
  'Sarvoniv', 'Sarvonivik', 'Sarvonivik', 'Sarvonivka', 'Sarvonivka', 'Sarvonivki', 'Sarvonivoc',
  'Sarvonivsk', 'Sarvonivsky', 'Sarvoniya', 'Sarvoniya', 'Sarvoniyak', 'Sarvoniyar', 'Sarvoniyas',
  'Sarvoniyan', 'Sarvoniyer', 'Sarvoniyetz', 'Sarvoniyev', 'Sarvoniyha', 'Sarvoniyik', 'Sarvoniyka',
  'Sarvoniyko', 'Sarvoniyka', 'Sarvoniynik', 'Sarvoniyniko', 'Sarvoniynitz', 'Sarvoniyo', 'Sarvoniyon',
  'Sarvoniyonok', 'Sarvoniyor', 'Sarvoniys', 'Sarvoniysk', 'Sarvoniyskit', 'Sarvoniysky', 'Sarvoniyt',
  'Sarvoniyta', 'Sarvoniyte', 'Sarvoniyteh', 'Sarvoniytic', 'Sarvoniytis', 'Sarvoniytka', 'Sarvoniytky',
  'Sarvoniytni', 'Sarvoniytny', 'Sarvoniytov', 'Sarvoniytova', 'Sarvoniytovic', 'Sarvoniytovitch',
  'Sarvoniytovic', 'Sarvoniytovic', 'Sarvoniytovitch', 'Sarvoniytovitz', 'Sarvoniytovka', 'Sarvoniytovki',
  'Sarvoniytovnin', 'Sarvoniytovnina', 'Sarvoniytovnine', 'Sarvoniytovnini', 'Sarvoniytovnino', 'Sarvoniytovnins',
  'Sarvoniytovnitch', 'Sarvoniytovnitchs', 'Sarvoniytovnitz', 'Sarvoniytovnok', 'Sarvoniytovns', 'Sarvoniytovnsk',
  'Sarvoniytovnski', 'Sarvoniytovnsky', 'Sarvoniytovskya', 'Sarvoniytovskye', 'Sarvoniytovskyi', 'Sarvoniytovskyo',
  'Sarvoniytovsk', 'Sarvoniytovska', 'Sarvoniytovskie', 'Sarvoniytovskii', 'Sarvoniytovskoe', 'Sarvoniytovskog',
  'Sarvoniytovskogo', 'Sarvoniytovskoe', 'Sarvoniytovskomy', 'Sarvoniytovskoy', 'Sarvoniytovskova', 'Sarvoniytovskove',
  'Sarvoniytovskovi', 'Sarvoniytovskovo', 'Sarvoniytovskoy', 'Sarvoniytovskoya', 'Sarvoniytovskoyah', 'Sarvoniytovskoyami',
  'Sarvoniytovskoyami', 'Sarvoniytovskoyem', 'Sarvoniytovskoyev', 'Sarvoniytovskoyie', 'Sarvoniytovskoyih', 'Sarvoniytovskoyim',
  'Sarvoniytovskoyimi', 'Sarvoniytovskoyiy', 'Sarvoniytovskoyoe', 'Sarvoniytovskoyom', 'Sarvoniytovskoyoy', 'Sarvoniytovskoyya',
  'Sarvoniytovskoyye', 'Sarvoniytovskoyyi', 'Sarvoniytovskoyyo', 'Sarvoniytovsku', 'Sarvoniytovskuh', 'Sarvoniytovskum',
  'Sarvoniytovskumi', 'Sarvoniytovskumih', 'Sarvoniytovskumo', 'Sarvoniytovskumy', 'Sarvoniytovskuna', 'Sarvoniytovskune',
  'Sarvoniytovskuni', 'Sarvoniytovskuno', 'Sarvoniytovskup', 'Sarvoniytovskur', 'Sarvoniytovskusa', 'Sarvoniytovskuse',
  'Sarvoniytovskusi', 'Sarvoniytovskuso', 'Sarvoniytovskust', 'Sarvoniytovskuty', 'Sarvoniytovskuu', 'Sarvoniytovskuy',
  'Sarvoniytovskuyu', 'Sarvoniytovskuz', 'Sarvoniytovskva', 'Sarvoniytovskve', 'Sarvoniytovskvi', 'Sarvoniytovskvo',
  'Sarvoniytovskvy', 'Sarvoniytovskva', 'Sarvoniytovskve', 'Sarvoniytovskvi', 'Sarvoniytovskvo', 'Sarvoniytovskvy',
  'Udyr', 'Urgot', 'Ursion', 'Urtica', 'Usher', 'Uskaa', 'Usley', 'Ussana', 'Ussissipian',
  'Ussuriysk', 'Usta', 'Ustach', 'Ustachius', 'Ustad', 'Ustaki', 'Ustaki', 'Ustakirg',
  'Ustakil', 'Ustalahana', 'Ustalari', 'Ustalavon', 'Ustalazha', 'Ustalazha', 'Ustalazhan',
  'Ustalazhino', 'Ustalazho', 'Ustalazhy', 'Ustalazhya', 'Ustalazhye', 'Ustalazhyi', 'Ustalazhyo',
  'Vaarus', 'Varus', 'Vash', 'Vayne', 'Veigar', 'Vel\'Koz', 'Vex', 'Vi', 'Viego',
  'Viktor', 'Vladimir', 'Volibear', 'Voltaic', 'Vomitus', 'Voracious', 'Vornado', 'Vorsand',
  'Voruch', 'Vow', 'Vowal', 'Vowel', 'Voxel', 'Vugg', 'Vulk', 'Vulkan', 'Vulpera',
  'Vulpix', 'Vulture', 'Vulva', 'Vyron', 'Waa', 'Waaagh', 'Wabana', 'Wabash', 'Wabasso',
  'Wabasso', 'Wabasso', 'Wabasso', 'Wabasso', 'Wabasso', 'Wabba', 'Wabbajack', 'Wabbit',
  'Wabbits', 'Wabbit', 'Wabbit', 'Wabbit', 'Wabbit', 'Wabbit', 'Wabbit', 'Wabbit',
  'Warwick', 'Wattson', 'Weasel', 'Weaselly', 'Weatherby', 'Weatherman', 'Weaver', 'Webley',
  'Wedge', 'Weed', 'Weedy', 'Weegee', 'Weekday', 'Weekend', 'Weeklies', 'Weeping',
  'Weewooo', 'Weet', 'Weffles', 'Wehe', 'Wei', 'Weicard', 'Weighable', 'Weigher',
  'Weighing', 'Weighings', 'Weighless', 'Weighlessness', 'Weights', 'Weighty', 'Weiner',
  'Weimaraner', 'Weir', 'Weird', 'Weirdly', 'Weirdness', 'Weirdoes', 'Weirdos', 'Weirdstone',
  'Weirdwards', 'Weirdy', 'Welby', 'Welch', 'Welcher', 'Welches', 'Welcher', 'Welcome',
  'Welcomed', 'Welcomely', 'Welcomer', 'Welcomers', 'Welcomes', 'Welcoming', 'Welcomingly',
  'Welcomingness', 'Weld', 'Weldable', 'Welded', 'Welder', 'Welders', 'Welding', 'Weldings',
  'Welds', 'Welfare', 'Welfarism', 'Welfarist', 'Welfarists', 'Welfaristic', 'Welfaristically',
  'Welfaristics', 'Welfarite', 'Welfarites', 'Welfaritic', 'Welfaritically', 'Welfaritism',
  'Welk', 'Welker', 'Welkers', 'Welkes', 'Welkin', 'Welkins', 'Welkinses', 'Welks',
  'Well', 'Wellaway', 'Wellbeing', 'Wellborn', 'Wellborns', 'Wellbred', 'Welled', 'Welleda',
  'Welledge', 'Weller', 'Wellers', 'Wellery', 'Welles', 'Wellesley', 'Wellest', 'Welletin',
  'Wellfried', 'Wellhanded', 'Wellhead', 'Wellheads', 'Wellhouse', 'Wellhouses', 'Wellies',
  'Welling', 'Wellingly', 'Wellingborough', 'Wellington', 'Wellingtons', 'Wellingly', 'Wellingness',
  'Wellins', 'Wellness', 'Wellnesses', 'Wellnigh', 'Wellpot', 'Wellposted', 'Wellread',
  'Wellrun', 'Wellrunner', 'Wells', 'Wellsian', 'Wellsite', 'Wellsites', 'Wellsmeared',
  'Wellsomever', 'Wellsomever', 'Wellsomever', 'Wellsomever', 'Wellsomever', 'Wellsomever',
  'Wellsomever', 'Wellsomever', 'Wellspring', 'Wellsprings', 'Wellstone', 'Wellstones',
  'Wellstroke', 'Wellsunken', 'Wellsupper', 'Welltaken', 'Welltended', 'Welltended',
  'Welltempered', 'Welltested', 'Welltested', 'Welltested', 'Welltested', 'Welltime',
  'Welltimednes', 'Welltimednesses', 'Welltimednesses', 'Welltimednesses', 'Welltimed',
  'Welltimednesses', 'Welltimed', 'Welltimednesses', 'Welltimed', 'Welltimednesses',
  'Welltimed', 'Welltimednesses', 'Welltimed', 'Welltimednesses', 'Welltimed', 'Welltimednesses',
  'Welltimed', 'Welltimednesses', 'Welltimed', 'Welltimednesses', 'Welltimed', 'Welltimednesses',
  'Xayah', 'Xearth', 'Xenial', 'Xenia', 'Xenial', 'Xenic', 'Xenielus', 'Xeniiasis', 'Xeniiasis',
  'Xeno', 'Xenobacteria', 'Xenobot', 'Xenobiotic', 'Xenobiotics', 'Xenobiology', 'Xenocryst',
  'Xenocrysts', 'Xenocrystic', 'Xenocrystic', 'Xenodichial', 'Xenodichia', 'Xenodician',
  'Xenodochial', 'Xenodochian', 'Xenodochies', 'Xenodochious', 'Xenodochium', 'Xenodochiums',
  'Xenodochium', 'Xenodochius', 'Xenodiagnosis', 'Xenodignosia', 'Xenodigest', 'Xenodocheionomy',
  'Xenodoche', 'Xenodocheial', 'Xenodocheian', 'Xenodocheia', 'Xenodocheiophobe', 'Xenodocheiophobia',
  'Xenodocheious', 'Xenodocheiousness', 'Xenodocheism', 'Xenodochist', 'Xenodochistical', 'Xenodochistically',
  'Xenodochium', 'Xenodoche', 'Xenodocheionomy', 'Xenodomophile', 'Xenodomophilia', 'Xenodomophilous',
  'Xenodomophobe', 'Xenodomophobia', 'Xenodomophobic', 'Xenodoxies', 'Xenodoxy', 'Xenogamete',
  'Xenogametes', 'Xenogamia', 'Xenogamian', 'Xenogamic', 'Xenogamically', 'Xenogamies', 'Xenogamous',
  'Xenogamously', 'Xenogamousness', 'Xenogamy', 'Xenogamy', 'Xenogamy', 'Xenogamy', 'Xenogamy',
  'Xenogamy', 'Xenogamy', 'Xenogamy', 'Xenogamy', 'Xenogamy', 'Xenogamy', 'Xenogamy', 'Xenogamy',
  'Xenogamy', 'Xenogamy', 'Xenogamy', 'Xenogamy', 'Xenogamy', 'Xenogamy', 'Xenogamy', 'Xenogamy',
  'Yone', 'Yorick', 'Yuumi', 'Zac', 'Zafina', 'Zagreus', 'Zahir', 'Zai', 'Zaina',
  'Zakos', 'Zalfinar', 'Zalgo', 'Zaloth', 'Zamara', 'Zamatrix', 'Zambada', 'Zamber',
  'Zambiac', 'Zambian', 'Zambians', 'Zambians', 'Zambiacs', 'Zambiacs', 'Zambiacs',
  'Zed', 'Zee', 'Zeel', 'Zeeland', 'Zeelandia', 'Zebu', 'Zebula', 'Zebulidae', 'Zebulim',
  'Zebus', 'Zechariah', 'Zecharias', 'Zechiel', 'Zeck', 'Zecora', 'Zecuador', 'Zedacari',
  'Zedaffar', 'Zedakah', 'Zedakot', 'Zedalef', 'Zedanita', 'Zedanites', 'Zedani', 'Zedanians',
  'Zedanite', 'Zedanites', 'Zedanitic', 'Zedanitism', 'Zedanist', 'Zedanistic', 'Zedanistically',
  'Zedanistry', 'Zedanization', 'Zedanize', 'Zedanized', 'Zedanizer', 'Zedanizers', 'Zedanizes',
  'Zedanizing', 'Zedanizingly', 'Zedanization', 'Zeddanita', 'Zeddanite', 'Zeddanites', 'Zeddanitic',
  'Zeddanitism', 'Zeddanist', 'Zeddanistic', 'Zeddanistically', 'Zeddanistry', 'Zeddanization',
  'Zeddanize', 'Zeddanized', 'Zeddanizer', 'Zeddanizers', 'Zeddanizes', 'Zeddanizing', 'Zeddanizingly',
  'Zed', 'Zedex', 'Zedek', 'Zedekim', 'Zedekiah', 'Zedekiah', 'Zedekiahian', 'Zedekiahic',
  'Zedekiahical', 'Zedekiahically', 'Zedekiahics', 'Zedekiahide', 'Zedekiahides', 'Zedekiahiem',
  'Zedekiahiel', 'Zedekiahies', 'Zedekiahify', 'Zedekiahified', 'Zedekiahifies', 'Zedekiahifying',
  'Zedekiahim', 'Zedekiahine', 'Zedekiahines', 'Zedekiahinis', 'Zedekiahisation', 'Zedekiahise',
  'Zedekiahised', 'Zedekiahises', 'Zedekiahising', 'Zedekiahism', 'Zedekiahist', 'Zedekiahistic',
  'Zedekiahistically', 'Zedekiahistry', 'Zedekiahit', 'Zedekiahite', 'Zedekiahites', 'Zedekiahitic',
  'Zedekiahitism', 'Zedekiahitize', 'Zedekiahitized', 'Zedekiahitizer', 'Zedekiahitizers',
  'Zedekiahitizes', 'Zedekiahitizing', 'Zedekiahization', 'Zedekiahize', 'Zedekiahized',
  'Zedekiahizer', 'Zedekiahizers', 'Zedekiahizes', 'Zedekiahizing', 'Zedekiahizingly',
  'Zedekiahizingly', 'Zedekiahizingly', 'Zedekiahizingly', 'Zedekiahizingly', 'Zedekiahizingly',
  'Zedekiahizingly', 'Zedekiahizingly', 'Zedekiahizingly', 'Zedekiahizingly', 'Zedekiahizingly',
  'Zedekiahizingly', 'Zedekiahizingly', 'Zedekiahizingly', 'Zedekiahizingly', 'Zedekiahizingly',
  'Zedekiahizingly', 'Zed', 'Zeek', 'Zeem', 'Zeena', 'Zeenana', 'Zeenanim', 'Zeenas',
  'Zeenic', 'Zeenigma', 'Zeenigmas', 'Zeenigmatic', 'Zeenimatical', 'Zeenimatically',
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
