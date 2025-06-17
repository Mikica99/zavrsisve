import { useState, useEffect } from 'react';
import styles from '../styles/Photographers.module.css';

interface Photographer {
  id: string;
  name: string;
  city: string;
  phone: string;
  website?: string;
  instagram?: string;
  rating: number;
  description: string;
  priceRange: 'Povoljno' | 'Srednje' | 'Luksuzno';
  price?: string;
  specialties: string[];
  experience: string;
  portfolio?: string;
}

const Photographers = () => {
  const [selectedPhotographer, setSelectedPhotographer] = useState<Photographer | null>(null);
  const [filterCities, setFilterCities] = useState<string[]>([]);
  const [filterPrices, setFilterPrices] = useState<string[]>([]);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const [displayedPhotographers, setDisplayedPhotographers] = useState<number>(12);

  // Hardkodovana lista fotografa u Srbiji
  const photographers: Photographer[] = [
    {
      id: '1',
      name: 'Stalex Photography',
      city: 'Beograd',
      phone: '065/805-0635',
      website: 'stalexphotography.com',
      rating: 5,
      description: 'Specijalizovani za iskrenu dokumentarnu fotografiju, hvataju suštinu svake proslave. Nude i video usluge.',
      priceRange: 'Srednje',
      price: '750 €',
      specialties: ['Dokumentarni stil', 'Video usluge', 'Iskrena fotografija'],
      experience: '5+ godina'
    },
    {
      id: '2',
      name: 'Foto Studio Damjan',
      city: 'Loznica',
      phone: '065/884-3268',
      website: 'ludikamen.rs',
      rating: 4,
      description: 'Foto studio sa sedištem u Loznici, radi po celoj Evropi. Spoj mladosti i iskustva.',
      priceRange: 'Povoljno',
      price: '200 €',
      specialties: ['Venčanja', 'Putovanja', 'Evropski rad'],
      experience: '8+ godina'
    },
    {
      id: '3',
      name: 'Foto Smart',
      city: 'Loznica',
      phone: '015/897-010',
      rating: 4,
      description: 'Ovekovečite vaše fotografije sa venčanja i prepustite se njima.',
      priceRange: 'Povoljno',
      price: '50 €',
      specialties: ['Venčanja', 'Portreti', 'Povoljne cene'],
      experience: '3+ godine'
    },
    {
      id: '4',
      name: 'Digital Jovanović',
      city: 'Loznica',
      phone: '015/882-349',
      rating: 4,
      description: 'Zabeležite vaše najlepše trenutke.',
      priceRange: 'Povoljno',
      price: '50 €',
      specialties: ['Venčanja', 'Portreti', 'Digitalna fotografija'],
      experience: '4+ godine'
    },
    {
      id: '5',
      name: 'Foto Studio Moma',
      city: 'Loznica',
      phone: '015/875-705',
      rating: 4,
      description: 'Foto studio u Loznici.',
      priceRange: 'Povoljno',
      price: '50 €',
      specialties: ['Venčanja', 'Portreti', 'Studijska fotografija'],
      experience: '6+ godina'
    },
    {
      id: '6',
      name: 'Pro Studio Wedding Photo',
      city: 'Loznica',
      phone: 'N/A',
      rating: 4,
      description: 'Profesionalni fotografi sa iskustvom u snimanju venčanja.',
      priceRange: 'Srednje',
      price: '300 €',
      specialties: ['Profesionalna fotografija', 'Venčanja', 'Iskustvo'],
      experience: '10+ godina'
    },
    {
      id: '7',
      name: 'SkyBook Studio',
      city: 'Šabac',
      phone: '061/1795-107',
      website: 'skybookstudio.com',
      rating: 4,
      description: 'Fotografisanje venčanja i drugih događaja.',
      priceRange: 'Srednje',
      price: '500 €',
      specialties: ['Venčanja', 'Portreti', 'Događaji'],
      experience: '7+ godina'
    },
    {
      id: '8',
      name: 'Mile Stančić - Film & Photography',
      city: 'Beograd',
      phone: '064/391-1391',
      rating: 4,
      description: 'Slobodnog duha, otkriva svet i u svakom kutku traži novu inspiraciju. Fotografisanje venčanja sa ljubavlju i strašću.',
      priceRange: 'Srednje',
      price: '500 €',
      specialties: ['Film i fotografija', 'Kreativni pristup', 'Ljubav i strast'],
      experience: '12+ godina'
    }
  ];

  // Filtriraj fotografe
  const filteredPhotographers = photographers.filter(photographer => {
    const cityMatch = filterCities.length === 0 || filterCities.includes(photographer.city);
    const priceMatch = filterPrices.length === 0 || filterPrices.includes(photographer.priceRange);
    return cityMatch && priceMatch;
  });

  // Prikaži samo određeni broj fotografa
  const photographersToDisplay = filteredPhotographers.slice(0, displayedPhotographers);

  // Reset displayed photographers when filters change
  useEffect(() => {
    setDisplayedPhotographers(12);
  }, [filterCities, filterPrices]);

  // Load more photographers
  const loadMorePhotographers = () => {
    setDisplayedPhotographers(prev => Math.min(prev + 12, filteredPhotographers.length));
  };

  // Check if there are more photographers to show
  const hasMorePhotographers = displayedPhotographers < filteredPhotographers.length;

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedPhotographer) {
        setSelectedPhotographer(null);
      }
    };

    if (selectedPhotographer) {
      document.addEventListener('keydown', handleEscKey);
      console.log('Modal opened for:', selectedPhotographer.name);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [selectedPhotographer]);

  // Dobavi jedinstvene gradove za filter
  const cities = Array.from(new Set(photographers.map(photographer => photographer.city))).sort();

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
      <h1 className={styles.title}>Fotografi za venčanja u Srbiji</h1>
      
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <div 
            className={styles.dropdown}
            onClick={(e) => handleDropdownToggle('city', e)}
          >
            <div className={styles.dropdownHeader}>
              <span className={styles.dropdownLabel}>📷 Gradovi</span>
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

      <div className={styles.photographerList}>
        <h2>Pronađeni fotografi ({photographersToDisplay.length} od {filteredPhotographers.length})</h2>
        
        {filteredPhotographers.length === 0 ? (
          <p className={styles.noResults}>Nema pronađenih fotografa sa izabranim filterima.</p>
        ) : (
          <div className={styles.photographerGrid}>
            {photographersToDisplay.map((photographer) => (
              <div
                key={photographer.id}
                className={styles.photographerCard}
                onClick={() => {
                  console.log('Photographer clicked:', photographer.name);
                  setSelectedPhotographer(photographer);
                }}
              >
                <div className={styles.photographerHeader}>
                  <div className={styles.photographerInfo}>
                    <h3 className={styles.photographerName}>{photographer.name}</h3>
                    <p className={styles.photographerCity}>📍 {photographer.city}</p>
                  </div>
                  <div className={styles.rating}>
                    {photographer.rating} ⭐
                  </div>
                </div>
                
                <div className={styles.photographerDetails}>
                  <p className={styles.experience}>📸 {photographer.experience} iskustva</p>
                  <p className={styles.phone}>📞 {photographer.phone}</p>
                  {photographer.website && (
                    <p className={styles.website}>🌐 {photographer.website}</p>
                  )}
                  {photographer.instagram && (
                    <p className={styles.instagram}>📷 {photographer.instagram}</p>
                  )}
                </div>

                <div className={styles.priceInfo}>
                  <div className={styles.priceRange}>
                    <span className={`${styles.priceTag} ${styles[photographer.priceRange.toLowerCase()]}`}>
                      {photographer.priceRange}
                    </span>
                  </div>
                  {photographer.price && (
                    <div className={styles.price}>
                      <span className={styles.priceLabel}>💰 Cena:</span>
                      <span className={styles.priceValue}>{photographer.price}</span>
                    </div>
                  )}
                </div>

                <p className={styles.description}>{photographer.description}</p>

                <div className={styles.specialties}>
                  <strong>Specijalnosti:</strong>
                  <div className={styles.specialtyTags}>
                    {photographer.specialties.map((specialty, index) => (
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

      {hasMorePhotographers && (
        <div className={styles.loadMoreContainer}>
          <button
            onClick={loadMorePhotographers}
            className={styles.loadMoreButton}
          >
            Pokaži još
          </button>
        </div>
      )}

      {/* Kontakt poruka za fotografe */}
      <div className={styles.contactMessage}>
        <p>
          <strong>Za fotografe:</strong> Ako želite da dodamo vaš profil na našu listu ili uklonimo postojeći unos, slobodno nas kontaktirajte na{' '}
          <a href="mailto:zavrsisve@gmail.com" className={styles.contactEmail}>
            zavrsisve@gmail.com
          </a>
        </p>
      </div>

      {/* Modal za detalje fotografa */}
      {selectedPhotographer && (
        <div 
          className={styles.modal} 
          onClick={() => setSelectedPhotographer(null)}
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
              onClick={() => setSelectedPhotographer(null)}
              aria-label="Zatvori modal"
            >
              ✕
            </button>
            
            <h2 id="modal-title">{selectedPhotographer.name}</h2>
            
            <div className={styles.modalInfo}>
              <p><strong>Grad:</strong> {selectedPhotographer.city}</p>
              <p><strong>Telefon:</strong> {selectedPhotographer.phone}</p>
              {selectedPhotographer.website && (
                <p><strong>Website:</strong> <a href={`https://${selectedPhotographer.website}`} target="_blank" rel="noopener noreferrer">{selectedPhotographer.website}</a></p>
              )}
              {selectedPhotographer.instagram && (
                <p><strong>Instagram:</strong> <a href={`https://instagram.com/${selectedPhotographer.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer">{selectedPhotographer.instagram}</a></p>
              )}
              <p><strong>Ocena:</strong> {selectedPhotographer.rating} ⭐</p>
              <p><strong>Iskustvo:</strong> {selectedPhotographer.experience}</p>
              <p><strong>Cenovni rang:</strong> <span className={`${styles.priceTag} ${styles[selectedPhotographer.priceRange.toLowerCase()]}`}>{selectedPhotographer.priceRange}</span></p>
              {selectedPhotographer.price && (
                <p><strong>Cena:</strong> <span className={styles.priceValue}>{selectedPhotographer.price}</span></p>
              )}
            </div>

            <div className={styles.modalDescription}>
              <h3>O fotografu</h3>
              <p>{selectedPhotographer.description}</p>
            </div>

            <div className={styles.modalSpecialties}>
              <h3>Specijalnosti</h3>
              <div className={styles.specialtyTags}>
                {selectedPhotographer.specialties.map((specialty, index) => (
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
              {selectedPhotographer.website && (
                <button className={styles.websiteButton}>
                  🌐 Poseti sajt
                </button>
              )}
              {selectedPhotographer.instagram && (
                <button className={styles.instagramButton}>
                  📷 Instagram
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Photographers; 