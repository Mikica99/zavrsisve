import { useState, useEffect } from 'react';
import styles from '../styles/WeddingDresses.module.css';

interface Shop {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  website?: string;
  rating: number;
  description: string;
  priceRange: 'Povoljno' | 'Srednje' | 'Luksuzno';
  price?: string;
  specialties: string[];
}

const WeddingDresses = () => {
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [filterCities, setFilterCities] = useState<string[]>([]);
  const [filterPrices, setFilterPrices] = useState<string[]>([]);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const [displayedShops, setDisplayedShops] = useState<number>(20);

  // Hardkodovana lista salona venčanica u Srbiji
  const shops: Shop[] = [
    {
      id: '1',
      name: 'Čarolija',
      address: 'Maršala Birjuzova 16, Beograd',
      city: 'Beograd',
      phone: '011/2629-022',
      website: '',
      rating: 5,
      description: 'Unikatne venčanice brendova kao što su Pronovias, Maggie Sottero, Sherri Hill. Nudimo i svečane haljine, aksesoare i muška odela Carlo Pignatelli',
      priceRange: 'Srednje',
      price: '300-700 eur',
      specialties: ['Luksuzni brendovi']
    },
    {
      id: '2',
      name: 'La Perla',
      address: 'Novi Beograd',
      city: 'Beograd',
      phone: '011/405-0000',
      website: '',
      rating: 4,
      description: 'Venčanice sa detaljima poput perli i čipke. Besplatne prepravke.',
      priceRange: 'Srednje',
      price: '250-700 eur',
      specialties: ['Ručno rađeni detalji', 'Besplatne prepravke']
    },
    {
      id: '3',
      name: 'Reina en ti',
      address: 'Joze Šćurle 28v, Zemun',
      city: 'Beograd',
      phone: '060/3500-320',
      website: '',
      rating: 5,
      description: 'Venčanice brendova LA Sposa, White One, Katy Corso. Besplatan veo, torbica, kruna i nakit uz iznajmljivanje.',
      priceRange: 'Srednje',
      price: '300-700 eur',
      specialties: ['Besplatni aksesoari']
    },
    {
      id: '4',
      name: 'Miss Bride',
      address: 'Ilije Stojadinovića 63, Beograd',
      city: 'Beograd',
      phone: '064/116-1012',
      website: '',
      rating: 5,
      description: 'Venčanice brenda Nicole Aurora. Sve haljine su nove. Besplatne prepravke.',
      priceRange: 'Srednje',
      price: '300-700 eur',
      specialties: ['Besplatne prepravke']
    },
    {
      id: '5',
      name: 'Cloud Nine',
      address: 'Beograd',
      city: 'Beograd',
      phone: '011/405-0000',
      website: '',
      rating: 4,
      description: 'Kolekcija Milla by Lorenzo Rossi 2022.',
      priceRange: 'Srednje',
      price: '300-700 eur',
      specialties: ['Moderni modeli']
    },
    {
      id: '6',
      name: 'City Brides',
      address: 'Beograd',
      city: 'Beograd',
      phone: '011/268-7023',
      website: '',
      rating: 5,
      description: 'Venčanice brenda Luce Sposa. Raznovrsni modeli sa 3D čipkom i perlicama.',
      priceRange: 'Srednje',
      price: '300-700 eur',
      specialties: ['Romantični dizajn']
    },
    {
      id: '7',
      name: 'Mademoiselle Koko',
      address: 'Beograd',
      city: 'Beograd',
      phone: '011/405-0000',
      website: '',
      rating: 4,
      description: 'Venčanica Sofia - elegantan kroj sa detaljima.',
      priceRange: 'Srednje',
      price: '350 eur',
      specialties: ['Elegantni kroj']
    },
    {
      id: '8',
      name: 'Afrodita',
      address: 'Jurija Gagarina 151A, Beograd',
      city: 'Beograd',
      phone: '069/518-2798',
      website: '',
      rating: 4,
      description: 'Venčanice različitih stilova.',
      priceRange: 'Povoljno',
      price: '200-500 eur',
      specialties: ['Raznovrsni stilovi']
    },
    {
      id: '9',
      name: 'Alegria',
      address: 'Jug Bogdanova 16, Beograd',
      city: 'Beograd',
      phone: '060/3500-320',
      website: '',
      rating: 4,
      description: 'Venčanice sa modernim dizajnom.',
      priceRange: 'Srednje',
      price: '250-600 eur',
      specialties: ['Moderni dizajn']
    },
    {
      id: '10',
      name: 'Aleksandra M.M',
      address: 'Jurija Gagarina 151A, Beograd',
      city: 'Beograd',
      phone: '011/228-0909',
      website: '',
      rating: 4,
      description: 'Venčanice sa klasičnim krojevima.',
      priceRange: 'Povoljno',
      price: '200-500 eur',
      specialties: ['Klasični krojevi']
    },
    {
      id: '11',
      name: 'Amor',
      address: 'Zahumska 65, Beograd',
      city: 'Beograd',
      phone: '011/2423-332',
      website: '',
      rating: 4,
      description: 'Venčanice sa romantičnim detaljima.',
      priceRange: 'Srednje',
      price: '250-600 eur',
      specialties: ['Romantični detalji']
    },
    {
      id: '12',
      name: 'Ana',
      address: 'Bratstva i jedinstva 89, Borča',
      city: 'Borča',
      phone: '011/332-0270',
      website: '',
      rating: 4,
      description: 'Venčanice za mlade u Borči.',
      priceRange: 'Povoljno',
      price: '200-500 eur',
      specialties: ['Lokalni izbor']
    },
    {
      id: '13',
      name: 'Andrea',
      address: 'Jurija Gagarina 151A, Beograd',
      city: 'Beograd',
      phone: '011/405-0000',
      website: '',
      rating: 4,
      description: 'Venčanice sa modernim detaljima.',
      priceRange: 'Srednje',
      price: '250-600 eur',
      specialties: ['Moderni detalji']
    },
    {
      id: '14',
      name: 'Bella',
      address: 'Makedonska 24, Beograd',
      city: 'Beograd',
      phone: '011/334-9133',
      website: '',
      rating: 4,
      description: 'Venčanice sa elegantnim dizajnom.',
      priceRange: 'Povoljno',
      price: '200-500 eur',
      specialties: ['Elegantni dizajn']
    },
    {
      id: '15',
      name: 'Didier',
      address: 'Dositejeva 17, Beograd',
      city: 'Beograd',
      phone: '011/328-1190',
      website: '',
      rating: 4,
      description: 'Venčanice sa sofisticiranim detaljima.',
      priceRange: 'Srednje',
      price: '250-600 eur',
      specialties: ['Sofisticirani detalji']
    },
    {
      id: '16',
      name: 'Dora',
      address: 'Zrenjaninski put 74, Beograd',
      city: 'Beograd',
      phone: '066/5588-088',
      website: '',
      rating: 4,
      description: 'Venčanice sa klasičnim dizajnom.',
      priceRange: 'Povoljno',
      price: '200-500 eur',
      specialties: ['Klasični dizajn']
    },
    {
      id: '17',
      name: 'Kallee Bride',
      address: 'Trg mladenaca 8, Novi Sad',
      city: 'Novi Sad',
      phone: '021/451-507',
      website: '',
      rating: 5,
      description: 'Salon sa modernim, rustičnim i luksuznim venčanicama. Nudi venčanice brendova kao što su San Patrick, Demetrios, White One.',
      priceRange: 'Srednje',
      price: '250-700 eur',
      specialties: ['Luksuzni brendovi']
    },
    {
      id: '18',
      name: 'EN Venčanice',
      address: 'Boška Petrovića 4, Novi Sad',
      city: 'Novi Sad',
      phone: '064/299-42-65',
      website: '',
      rating: 5,
      description: 'Novi salon sa pažljivo odabranim venčanicama brendova kao što su Pronovias, Milla Nova, Demetrios. Nudi besplatne prepravke i dodatke poput vela, torbice i dijademe.',
      priceRange: 'Srednje',
      price: '300-700 eur',
      specialties: ['Besplatne prepravke i dodatci']
    },
    {
      id: '19',
      name: 'Pepeljuga',
      address: 'Železnička 17, Novi Sad',
      city: 'Novi Sad',
      phone: '021/661-7365',
      website: '',
      rating: 4,
      description: 'Dugi niz godina prisutan na tržištu, nudi širok asortiman venčanica različitih stilova.',
      priceRange: 'Povoljno',
      price: '200-500 eur',
      specialties: ['Raznovrsni stilovi']
    },
    {
      id: '20',
      name: 'Kruna',
      address: 'Jevrejska 25, Novi Sad',
      city: 'Novi Sad',
      phone: '064/2781-070',
      website: '',
      rating: 4,
      description: 'Specijalizovan za šivenje venčanica po meri, uključujući i dodatke poput šešira, torbica i buketa.',
      priceRange: 'Srednje',
      price: '250-600 eur',
      specialties: ['Šivenje po meri i dodatci']
    },
    {
      id: '21',
      name: 'Lana M',
      address: 'Železnička 20, Novi Sad',
      city: 'Novi Sad',
      phone: '',
      website: '',
      rating: 4,
      description: 'Nudi venčanice vrhunskog kvaliteta direktno iz Nemačke, uključujući modele u stilu sirene, grčke boginje i princeze.',
      priceRange: 'Srednje',
      price: '300-700 eur',
      specialties: ['Venčanice iz Nemačke']
    },
    {
      id: '22',
      name: 'Blanche',
      address: 'Obrenovićeva 34, Niš',
      city: 'Niš',
      phone: '018/250-444',
      website: 'blanche.rs',
      rating: 5,
      description: 'Tradicija duga 40 godina. Venčanice brendova kao što su WONÁ Concept, Justin Alexander, Lanesta, Tina Valerdi, Innocentia, Crystal Design, Pronovias, Atelier Pronovias i Rosa Clara.',
      priceRange: 'Luksuzno',
      price: '300-800 eur',
      specialties: ['Luksuzni brendovi']
    },
    {
      id: '23',
      name: 'Cloud Nine',
      address: 'Sestara Baković 10, Niš',
      city: 'Niš',
      phone: '061/603-3339',
      website: 'cloudnine.rs',
      rating: 4,
      description: 'Moderni modeli sa naglaskom na eleganciju.',
      priceRange: 'Srednje',
      price: '250-700 eur',
      specialties: ['Moderni dizajn']
    },
    {
      id: '24',
      name: 'I Do',
      address: 'Generala Milojka Lešjanina 29/1, Niš',
      city: 'Niš',
      phone: '067/731-3394',
      website: 'ido.rs',
      rating: 5,
      description: 'Salon sa pažljivim odabirom venčanica, pruža personalizovanu korisničku podršku.',
      priceRange: 'Srednje',
      price: '300-700 eur',
      specialties: ['Personalizovana usluga']
    },
    {
      id: '25',
      name: 'Gracia',
      address: 'Kneginje Ljubice 2, Niš',
      city: 'Niš',
      phone: '018/510-210',
      website: '',
      rating: 4,
      description: 'Venčanice različitih stilova, od klasičnih do modernih.',
      priceRange: 'Srednje',
      price: '200-600 eur',
      specialties: ['Raznovrsni stilovi']
    },
    {
      id: '26',
      name: 'Bride to Be',
      address: 'Obrenovićeva 34, Niš',
      city: 'Niš',
      phone: '067/750-3344',
      website: 'vencanice.co.rs',
      rating: 4,
      description: 'Salon za iznajmljivanje i prodaju venčanica, nudi modele u stilu sirene, princeze, uske i A-kroj.',
      priceRange: 'Povoljno',
      price: '150-500 eur',
      specialties: ['Raznovrsni krojevi']
    },
    {
      id: '27',
      name: 'Letisija Plus',
      address: 'Obrenovićeva bb, TC Kalča II sprat A II 7 i 6, Niš',
      city: 'Niš',
      phone: '018/522-741',
      website: '',
      rating: 4,
      description: 'Venčanice različitih stilova, sa mogućnošću prepravki.',
      priceRange: 'Srednje',
      price: '200-600 eur',
      specialties: ['Prepravke po meri']
    },
    {
      id: '28',
      name: 'Dva Anđela',
      address: 'Toplički partizanski odred 40, Novo selo, Palilula, Niš',
      city: 'Niš',
      phone: '018/4289-442',
      website: '',
      rating: 4,
      description: 'Specijalizovan za izradu i iznajmljivanje venčanica po meri.',
      priceRange: 'Povoljno',
      price: '150-500 eur',
      specialties: ['Šivenje po meri']
    },
    {
      id: '29',
      name: 'Orthodox Fashion',
      address: 'Obrenovićeva bb, TC Kalča, b-54 a-8, Niš',
      city: 'Niš',
      phone: '',
      website: 'ortodoxfashion.weebly.com',
      rating: 4,
      description: 'Šivenje venčanica, svečanih haljina i odela po meri.',
      priceRange: 'Srednje',
      price: '200-600 eur',
      specialties: ['Šivenje po meri']
    },
    {
      id: '30',
      name: 'Salon venčanica Magdalena',
      address: 'Kraljice Marije bb, Kragujevac',
      city: 'Kragujevac',
      phone: '034/373-310',
      website: '',
      rating: 5,
      description: 'Rasprodaja venčanica i svečanih haljina – maloprodaja i veleprodaja. Oko 80 različitih venčanica iz uvoza, među kojima su zastupljeni i poznati svetski brendovi. Takođe nude i oko 40 svečanih haljina.',
      priceRange: 'Povoljno',
      price: '100-300 eur',
      specialties: ['Venčanice na veliko']
    },
    {
      id: '31',
      name: 'Salon venčanica Morango',
      address: 'Miloja Pavlovića 9, Kragujevac',
      city: 'Kragujevac',
      phone: '034/355-122',
      website: '',
      rating: 4,
      description: 'Salon venčanica u Kragujevcu.',
      priceRange: 'Srednje',
      price: '200-600 eur',
      specialties: ['Raznovrsni izbor']
    },
    {
      id: '32',
      name: 'Salon venčanica Mariage',
      address: 'Bulevar kraljice Marije 5, Kragujevac',
      city: 'Kragujevac',
      phone: '065/566-7700',
      website: '',
      rating: 4,
      description: 'Salon nudi venčanice brendova LA Sposa i Demetrios. Cene venčanica kreću se od 450 do 1300 evra, u zavisnosti od proizvođača.',
      priceRange: 'Luksuzno',
      price: '450-1300 eur',
      specialties: ['Francuski brendovi']
    },
    {
      id: '33',
      name: 'Salon venčanica Blanche',
      address: 'Dr Ilije Kolovića 80, Kragujevac',
      city: 'Kragujevac',
      phone: '063/104-5241',
      website: '',
      rating: 4,
      description: 'Salon venčanica u Kragujevcu.',
      priceRange: 'Srednje',
      price: '250-700 eur',
      specialties: ['Klasične venčanice']
    },
    {
      id: '34',
      name: 'Salon venčanica Lady M',
      address: 'Kragujevac',
      city: 'Kragujevac',
      phone: '034/330-448',
      website: '',
      rating: 4,
      description: 'Salon nudi venčanice, večernje haljine i prateće detalje.',
      priceRange: 'Srednje',
      price: '200-600 eur',
      specialties: ['Večernje haljine i detalji']
    },
    {
      id: '35',
      name: 'Eliza Salon Venčanica',
      address: 'Pašićeva 3, 15300 Loznica',
      city: 'Loznica',
      phone: '063/758-5741',
      website: 'ludikamen.rs',
      rating: 4,
      description: 'Najveći izbor venčanica sa svom pratećom opremom gratis. Šivenje venčanica po vašem izboru. Dekoracija prostora i još mnogo razloga da nas posetite.',
      priceRange: 'Povoljno',
      price: '100-300 eur',
      specialties: ['Šivenje po izboru i dekoracija']
    },
    {
      id: '36',
      name: 'Venčanice Radenka',
      address: 'Bulevar Dositeja Obradovića 71A, Loznica',
      city: 'Loznica',
      phone: '015/891-919',
      website: '',
      rating: 4,
      description: 'Porodična zanatska radionica sa više od 10 godina iskustva. Posvećenost kvalitetu i zadovoljstvu klijenata.',
      priceRange: 'Srednje',
      price: '200-600 eur',
      specialties: ['Zanatska izrada']
    },
    {
      id: '37',
      name: 'Salon venčanica Jovana',
      address: 'Vere Blagojević bb, 15300 Loznica',
      city: 'Loznica',
      phone: '015/875-640',
      website: '',
      rating: 4,
      description: 'Novi modeli iz kolekcije 2024. Raskošni modeli sa opremom uz venčanicu gratis.',
      priceRange: 'Srednje',
      price: '250-700 eur',
      specialties: ['Nova kolekcija 2024']
    },
    {
      id: '38',
      name: 'Salon venčanica El Destino',
      address: 'Patrijarha Pavla 1, 15300 Loznica',
      city: 'Loznica',
      phone: '015/874-681',
      website: '',
      rating: 4,
      description: 'Salon ekskluzivnih venčanica sa brendovima kao što su St. Patrick, White One, Pollardi Fashion Group, Mistrelli Fashion Group.',
      priceRange: 'Luksuzno',
      price: '300-800 eur',
      specialties: ['Ekskluzivni brendovi']
    },
    {
      id: '39',
      name: 'Salon venčanica Princeza',
      address: 'Pašićeva 3, 15300 Loznica',
      city: 'Loznica',
      phone: '015/859-104',
      website: '',
      rating: 4,
      description: 'Salon venčanica u Loznici.',
      priceRange: 'Srednje',
      price: '200-600 eur',
      specialties: ['Klasične venčanice']
    },
    {
      id: '40',
      name: 'Atelje dizajnerskih venčanica Magnolia',
      address: 'Ljubomira Romića 3, 15300 Loznica',
      city: 'Loznica',
      phone: '',
      website: '',
      rating: 4,
      description: 'Prodaja i iznajmljivanje dizajnerskih venčanica. Radimo i prepravke. Širok asortiman venčanica.',
      priceRange: 'Srednje',
      price: '250-700 eur',
      specialties: ['Dizajnerske venčanice']
    },
    {
      id: '41',
      name: 'MILVAS',
      address: 'Žikice Jovanovića 17, 15300 Loznica',
      city: 'Loznica',
      phone: '',
      website: '',
      rating: 4,
      description: 'Svečane haljine i venčanice sa 20 godina iskustva. Šivenje svečanih haljina i venčanica. Pored toga, nude i salu za svečanosti "Đerdan Lux".',
      priceRange: 'Srednje',
      price: '200-600 eur',
      specialties: ['Svečane haljine i sala za svečanosti']
    }
  ];

  // Filtriraj salone
  const filteredShops = shops.filter(shop => {
    const cityMatch = filterCities.length === 0 || filterCities.includes(shop.city);
    const priceMatch = filterPrices.length === 0 || filterPrices.includes(shop.priceRange);
    return cityMatch && priceMatch;
  });

  // Prikaži samo određeni broj salona
  const shopsToDisplay = filteredShops.slice(0, displayedShops);

  // Reset displayed shops when filters change
  useEffect(() => {
    setDisplayedShops(20);
  }, [filterCities, filterPrices]);

  // Load more shops
  const loadMoreShops = () => {
    setDisplayedShops(prev => Math.min(prev + 20, filteredShops.length));
  };

  // Check if there are more shops to show
  const hasMoreShops = displayedShops < filteredShops.length;

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedShop) {
        setSelectedShop(null);
      }
    };

    if (selectedShop) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [selectedShop]);

  // Dobavi jedinstvene gradove za filter
  const cities = Array.from(new Set(shops.map(shop => shop.city))).sort();

  // Handle city filter changes
  const handleCityChange = (city: string) => {
    setFilterCities(prev => 
      prev.includes(city) 
        ? prev.filter(c => c !== city)
        : [...prev, city]
    );
  };

  // Handle price filter changes
  const handlePriceChange = (price: string) => {
    setFilterPrices(prev => 
      prev.includes(price) 
        ? prev.filter(p => p !== price)
        : [...prev, price]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setFilterCities([]);
    setFilterPrices([]);
  };

  // Close dropdowns when clicking outside
  const handleClickOutside = (e: React.MouseEvent) => {
    if (!(e.target as Element).closest('.dropdown')) {
      setIsCityDropdownOpen(false);
      setIsPriceDropdownOpen(false);
    }
  };

  // Handle dropdown toggle with event propagation prevention
  const handleDropdownToggle = (dropdownType: 'city' | 'price', e: React.MouseEvent) => {
    e.stopPropagation();
    if (dropdownType === 'city') {
      setIsCityDropdownOpen(!isCityDropdownOpen);
      setIsPriceDropdownOpen(false);
    } else {
      setIsPriceDropdownOpen(!isPriceDropdownOpen);
      setIsCityDropdownOpen(false);
    }
  };

  // Get display text for dropdowns
  const getCityDisplayText = () => {
    if (filterCities.length === 0) return 'Izaberi gradove';
    if (filterCities.length === 1) return filterCities[0];
    if (filterCities.length === cities.length) return 'Svi gradovi';
    return `${filterCities.length} gradova`;
  };

  const getPriceDisplayText = () => {
    if (filterPrices.length === 0) return 'Izaberi cenu';
    if (filterPrices.length === 1) return filterPrices[0];
    if (filterPrices.length === 3) return 'Svi rangovi';
    return `${filterPrices.length} rangova`;
  };

  return (
    <div className={styles.container} onClick={handleClickOutside}>
      <h1 className={styles.title}>Saloni venčanica u Srbiji</h1>
      
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <div 
            className={styles.dropdown}
            onClick={(e) => handleDropdownToggle('city', e)}
          >
            <div className={styles.dropdownHeader}>
              <span className={styles.dropdownLabel}>📍 Gradovi</span>
              <span className={styles.dropdownValue}>{getCityDisplayText()}</span>
              <span className={`${styles.dropdownArrow} ${isCityDropdownOpen ? styles.rotated : ''}`}>
                ▼
              </span>
            </div>
            
            {isCityDropdownOpen && (
              <div className={styles.dropdownContent} onClick={(e) => e.stopPropagation()}>
                {cities.map(city => (
                  <label key={city} className={styles.dropdownItem}>
                    <input
                      type="checkbox"
                      checked={filterCities.includes(city)}
                      onChange={() => handleCityChange(city)}
                      className={styles.dropdownCheckbox}
                    />
                    <span className={styles.dropdownItemText}>{city}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.filterGroup}>
          <div 
            className={styles.dropdown}
            onClick={(e) => handleDropdownToggle('price', e)}
          >
            <div className={styles.dropdownHeader}>
              <span className={styles.dropdownLabel}>💰 Cenovni rang</span>
              <span className={styles.dropdownValue}>{getPriceDisplayText()}</span>
              <span className={`${styles.dropdownArrow} ${isPriceDropdownOpen ? styles.rotated : ''}`}>
                ▼
              </span>
            </div>
            
            {isPriceDropdownOpen && (
              <div className={styles.dropdownContent} onClick={(e) => e.stopPropagation()}>
                <label className={styles.dropdownItem}>
                  <input
                    type="checkbox"
                    checked={filterPrices.includes('Povoljno')}
                    onChange={() => handlePriceChange('Povoljno')}
                    className={styles.dropdownCheckbox}
                  />
                  <span className={styles.dropdownItemText}>Povoljno</span>
                </label>
                <label className={styles.dropdownItem}>
                  <input
                    type="checkbox"
                    checked={filterPrices.includes('Srednje')}
                    onChange={() => handlePriceChange('Srednje')}
                    className={styles.dropdownCheckbox}
                  />
                  <span className={styles.dropdownItemText}>Srednje</span>
                </label>
                <label className={styles.dropdownItem}>
                  <input
                    type="checkbox"
                    checked={filterPrices.includes('Luksuzno')}
                    onChange={() => handlePriceChange('Luksuzno')}
                    className={styles.dropdownCheckbox}
                  />
                  <span className={styles.dropdownItemText}>Luksuzno</span>
                </label>
              </div>
            )}
          </div>
        </div>

        {(filterCities.length > 0 || filterPrices.length > 0) && (
          <button 
            onClick={clearFilters}
            className={styles.clearFiltersButton}
          >
            🗑️ Obriši filtere
          </button>
        )}
      </div>

      <div className={styles.shopList}>
        <h2>Pronađeni saloni ({shopsToDisplay.length} od {filteredShops.length})</h2>
        
        {filteredShops.length === 0 ? (
          <p className={styles.noResults}>Nema pronađenih salona sa izabranim filterima.</p>
        ) : (
          <div className={styles.shopGrid}>
            {shopsToDisplay.map((shop) => (
              <div
                key={shop.id}
                className={styles.shopCard}
                onClick={() => setSelectedShop(shop)}
              >
                <div className={styles.shopHeader}>
                  <h3 className={styles.shopName}>{shop.name}</h3>
                  <div className={styles.rating}>
                    {shop.rating} ⭐
                  </div>
                </div>
                
                <div className={styles.shopInfo}>
                  <p className={styles.address}>📍 {shop.address}, {shop.city}</p>
                  <p className={styles.phone}>📞 {shop.phone}</p>
                  {shop.website && (
                    <p className={styles.website}>🌐 {shop.website}</p>
                  )}
                </div>

                <div className={styles.priceInfo}>
                  <div className={styles.priceRange}>
                    <span className={`${styles.priceTag} ${styles[shop.priceRange.toLowerCase()]}`}>
                      {shop.priceRange}
                    </span>
                  </div>
                  {shop.price && (
                    <div className={styles.price}>
                      <span className={styles.priceLabel}>💰 Cena:</span>
                      <span className={styles.priceValue}>{shop.price}</span>
                    </div>
                  )}
                </div>

                <p className={styles.description}>{shop.description}</p>

                <div className={styles.specialties}>
                  <strong>Specijalnosti:</strong>
                  <div className={styles.specialtyTags}>
                    {shop.specialties.map((specialty, index) => (
                      <span key={index} className={styles.specialtyTag}>
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {hasMoreShops && (
        <div className={styles.loadMoreContainer}>
          <button
            onClick={loadMoreShops}
            className={styles.loadMoreButton}
          >
            Pokaži još
          </button>
        </div>
      )}

      {/* Kontakt poruka za salone */}
      <div className={styles.contactMessage}>
        <p>
          <strong>Za vlasnike salona:</strong> Ako želite da dodamo vaš salon na našu listu ili uklonimo postojeći unos, slobodno nas kontaktirajte na{' '}
          <a href="mailto:zavrsisve@gmail.com" className={styles.contactEmail}>
            zavrsisve@gmail.com
          </a>
        </p>
      </div>

      {/* Modal za detalje salona */}
      {selectedShop && (
        <div 
          className={styles.modal} 
          onClick={() => setSelectedShop(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div 
            className={styles.modalContent} 
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
          >
            <button 
              className={styles.closeButton} 
              onClick={() => setSelectedShop(null)}
              aria-label="Zatvori modal"
            >
              ✕
            </button>
            
            <h2 id="modal-title">{selectedShop.name}</h2>
            
            <div className={styles.modalInfo}>
              <p><strong>Adresa:</strong> {selectedShop.address}, {selectedShop.city}</p>
              <p><strong>Telefon:</strong> {selectedShop.phone}</p>
              {selectedShop.website && (
                <p><strong>Website:</strong> <a href={`https://${selectedShop.website}`} target="_blank" rel="noopener noreferrer">{selectedShop.website}</a></p>
              )}
              <p><strong>Ocena:</strong> {selectedShop.rating} ⭐</p>
              <p><strong>Cenovni rang:</strong> <span className={`${styles.priceTag} ${styles[selectedShop.priceRange.toLowerCase()]}`}>{selectedShop.priceRange}</span></p>
              {selectedShop.price && (
                <p><strong>Cena:</strong> <span className={styles.priceValue}>{selectedShop.price}</span></p>
              )}
            </div>

            <div className={styles.modalDescription}>
              <h3>O salonu</h3>
              <p>{selectedShop.description}</p>
            </div>

            <div className={styles.modalSpecialties}>
              <h3>Specijalnosti</h3>
              <div className={styles.specialtyTags}>
                {selectedShop.specialties.map((specialty, index) => (
                  <span key={index} className={styles.specialtyTag}>
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.modalActions}>
              <button className={styles.callButton}>
                📞 Pozovi
              </button>
              {selectedShop.website && (
                <button className={styles.websiteButton}>
                  🌐 Poseti sajt
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeddingDresses; 