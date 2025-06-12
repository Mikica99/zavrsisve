import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import styles from '../styles/InvitationDesign.module.css';

const backgrounds = [
  '#FFB6C1', // Light pink
  '#98FB98', // Pale green
  '#87CEEB', // Sky blue
  '#DDA0DD', // Plum
  '#F0E68C', // Khaki
  '#E6E6FA', // Lavender
  '#FFA07A', // Light salmon
  '#B0E0E6', // Powder blue
  '#FFE4B5', // Moccasin
];

const fonts = [
  { name: 'Dancing Script', class: styles.dancingScript },
  { name: 'Playfair Display', class: styles.playfairDisplay },
  { name: 'Montserrat', class: styles.montserrat },
  { name: 'Great Vibes', class: styles.greatVibes },
  { name: 'Roboto Slab', class: styles.robotoSlab },
];

const fontColors = [
  '#000000', // Black
  '#1a237e', // Dark Blue
  '#1b5e20', // Dark Green
  '#b71c1c', // Dark Red
  '#4a148c', // Dark Purple
  '#827717', // Olive
  '#01579b', // Navy
  '#bf360c', // Rust
  '#880e4f', // Wine
  '#3e2723', // Brown
];

const fontSizes = {
  title: [
    { label: 'Mali', value: '2rem' },
    { label: 'Srednji', value: '2.5rem' },
    { label: 'Veliki', value: '3rem' },
    { label: 'Veoma veliki', value: '3.5rem' }
  ],
  text: [
    { label: 'Mali', value: '1.2rem' },
    { label: 'Srednji', value: '1.5rem' },
    { label: 'Veliki', value: '1.8rem' },
    { label: 'Veoma veliki', value: '2rem' }
  ]
};

const InvitationDesign = () => {
  const [selectedBackground, setSelectedBackground] = useState<string | null>(backgrounds[0]);
  const [customBackground, setCustomBackground] = useState<string | null>(null);
  const [selectedFont, setSelectedFont] = useState<string | null>(fonts[0].name);
  const [selectedFontColor, setSelectedFontColor] = useState('#000000');
  const [selectedFontSizes, setSelectedFontSizes] = useState({
    title: fontSizes.title[2].value,
    text: fontSizes.text[2].value
  });
  const [invitationText, setInvitationText] = useState({
    title: '',
    mainText: '',
    date: '',
    location: '',
    additionalInfo: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setCustomBackground(result);
          setSelectedBackground(null);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Molimo vas da izaberete sliku');
      }
    }
    if (event.target) {
      event.target.value = '';
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleRemoveBackground = () => {
    setCustomBackground(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleTextChange = (field: keyof typeof invitationText, value: string) => {
    setInvitationText(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFontSizeChange = (type: 'title' | 'text', value: string) => {
    setSelectedFontSizes(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const isInvitationEmpty = () => {
    return !invitationText.title && 
           !invitationText.mainText && 
           !invitationText.date && 
           !invitationText.location && 
           !invitationText.additionalInfo;
  };

  const handlePreviewClick = () => {
    if (isInvitationEmpty()) return;
    setIsPreviewOpen(true);
    setTimeout(() => {
      modalContentRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }, 100);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  const handleDownloadPDF = async () => {
    if (isInvitationEmpty() || !previewRef.current) return;

    try {
      // Create canvas from the preview div
      const canvas = await html2canvas(previewRef.current, {
        scale: 2, // Higher quality
        useCORS: true, // If you have external images
        logging: false,
        backgroundColor: null
      });

      // Calculate dimensions to maintain aspect ratio
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');

      // Add image to PDF
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      // Download PDF
      pdf.save('pozivnica.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Došlo je do greške prilikom generisanja PDF-a. Molimo pokušajte ponovo.');
    }
  };

  const handleDownloadImage = async () => {
    if (isInvitationEmpty() || !previewRef.current) return;

    try {
      // Create canvas from the preview div
      const canvas = await html2canvas(previewRef.current, {
        scale: 2, // Higher quality
        useCORS: true, // If you have external images
        logging: false,
        backgroundColor: null
      });

      // Convert canvas to blob
      canvas.toBlob((blob) => {
        if (!blob) {
          throw new Error('Canvas to Blob conversion failed');
        }
        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'pozivnica.png';
        link.href = url;
        link.click();
        // Cleanup
        URL.revokeObjectURL(url);
      }, 'image/png');
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Došlo je do greške prilikom generisanja slike. Molimo pokušajte ponovo.');
    }
  };

  return (
    <div className={styles.invitationDesignContainer}>
      <div className={styles.container}>
        <h1 className={styles.title}>Izrada pozivnica</h1>
        
        <div className={styles.backgroundSection}>
          <div className={styles.backgroundColumn}>
            <div className={styles.header}>Izaberi pozadinu</div>
            <div className={styles.backgroundGrid}>
              {backgrounds.map((color, index) => (
                <div
                  key={index}
                  className={`${styles.backgroundOption} ${selectedBackground === color ? styles.selected : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    setSelectedBackground(color);
                    setCustomBackground(null);
                  }}
                />
              ))}
            </div>
          </div>

          <div className={styles.backgroundColumn}>
            <div className={styles.header}>Dodaj svoju pozadinu</div>
            <div className={styles.uploadSection}>
              {customBackground ? (
                <div className={styles.customBackgroundContainer}>
                  <div
                    className={`${styles.customBackground} ${!selectedBackground ? styles.selected : ''}`}
                    style={{ backgroundImage: `url(${customBackground})` }}
                    onClick={() => {
                      setSelectedBackground(null);
                      setCustomBackground(customBackground);
                    }}
                  />
                  <button 
                    className={styles.removeButton}
                    onClick={handleRemoveBackground}
                    title="Ukloni sliku"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className={styles.uploadButton} onClick={handleUploadClick}>
                  <span className={styles.uploadIcon}>+</span>
                  <span className={styles.uploadText}>Dodaj</span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className={styles.fileInput}
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.fontSection}>
          <div className={styles.fontColumn}>
            <div className={styles.header}>Izaberi font</div>
            <div className={styles.fontContainer}>
              {fonts.map((font, index) => (
                <div
                  key={index}
                  className={`${styles.fontOption} ${font.class} ${selectedFont === font.name ? styles.selected : ''}`}
                  onClick={() => setSelectedFont(font.name)}
                  style={{ color: selectedFontColor }}
                >
                  Pozivamo Vas na nase veselje
                </div>
              ))}
            </div>
          </div>

          <div className={styles.fontColumn}>
            <div className={styles.header}>Izaberi boju fonta</div>
            <div className={styles.colorContainer}>
              {fontColors.map((color, index) => (
                <div
                  key={index}
                  className={`${styles.colorOption} ${selectedFontColor === color ? styles.selected : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedFontColor(color)}
                  title={color === '#000000' ? 'Crna' : color}
                />
              ))}
            </div>
            <div className={styles.customColorPicker}>
              <input
                type="color"
                value={selectedFontColor}
                onChange={(e) => setSelectedFontColor(e.target.value)}
                className={styles.colorInput}
              />
              <span className={styles.customColorLabel}>Izaberi prilagođenu boju</span>
            </div>

            <div className={styles.fontSizeSection}>
              <div className={styles.header2}>Veličina fonta</div>
              
              <div className={styles.fontSizeGroup}>
                <label>Naslov</label>
                <div className={styles.fontSizeOptions}>
                  {fontSizes.title.map((size) => (
                    <button
                      key={size.value}
                      className={`${styles.fontSizeOption} ${selectedFontSizes.title === size.value ? styles.selected : ''}`}
                      onClick={() => handleFontSizeChange('title', size.value)}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.fontSizeGroup}>
                <label>Tekst</label>
                <div className={styles.fontSizeOptions}>
                  {fontSizes.text.map((size) => (
                    <button
                      key={size.value}
                      className={`${styles.fontSizeOption} ${selectedFontSizes.text === size.value ? styles.selected : ''}`}
                      onClick={() => handleFontSizeChange('text', size.value)}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.textSection}>
          <h2 className={styles.header}>Tekst pozivnice</h2>
          <div className={styles.textInputGrid}>
            <div className={styles.textInputGroup}>
              <label htmlFor="title">Naslov</label>
              <input
                id="title"
                type="text"
                value={invitationText.title}
                onChange={(e) => handleTextChange('title', e.target.value)}
                placeholder="npr. Pozivnica za vjenčanje"
              />
            </div>

            <div className={styles.textInputGroup}>
              <label htmlFor="mainText">Glavni tekst</label>
              <textarea
                id="mainText"
                value={invitationText.mainText}
                onChange={(e) => handleTextChange('mainText', e.target.value)}
                placeholder="npr. Sa radošću vas pozivamo na proslavu našeg vjenčanja..."
                rows={4}
              />
            </div>

            <div className={styles.textInputGroup}>
              <label htmlFor="date">Datum i vrijeme</label>
              <input
                id="date"
                type="text"
                value={invitationText.date}
                onChange={(e) => handleTextChange('date', e.target.value)}
                placeholder="npr. 15. avgust 2024. u 17:00h"
              />
            </div>

            <div className={styles.textInputGroup}>
              <label htmlFor="location">Lokacija</label>
              <input
                id="location"
                type="text"
                value={invitationText.location}
                onChange={(e) => handleTextChange('location', e.target.value)}
                placeholder="npr. Hotel Mediteran, Budva"
              />
            </div>

            <div className={styles.textInputGroup}>
              <label htmlFor="additionalInfo">Dodatne informacije</label>
              <textarea
                id="additionalInfo"
                value={invitationText.additionalInfo}
                onChange={(e) => handleTextChange('additionalInfo', e.target.value)}
                placeholder="npr. Dress code, poklon želje, RSVP informacije..."
                rows={3}
              />
            </div>
          </div>

          <div className={styles.previewSection}>
            <h3 className={styles.previewTitle}>Pregled pozivnice</h3>
            <div 
              ref={previewRef}
              className={styles.preview}
              style={{
                backgroundColor: selectedBackground || undefined,
                backgroundImage: customBackground ? `url(${customBackground})` : undefined,
                color: selectedFontColor
              }}
            >
              <div className={`${styles.previewContent} ${selectedFont ? fonts.find(f => f.name === selectedFont)?.class : ''}`}>
                {invitationText.title && (
                  <h2 style={{ fontSize: selectedFontSizes.title }}>
                    {invitationText.title}
                  </h2>
                )}
                {invitationText.mainText && (
                  <p className={styles.previewMainText} style={{ fontSize: selectedFontSizes.text }}>
                    {invitationText.mainText}
                  </p>
                )}
                {invitationText.date && (
                  <p className={styles.previewDate} style={{ fontSize: selectedFontSizes.text }}>
                    {invitationText.date}
                  </p>
                )}
                {invitationText.location && (
                  <p className={styles.previewLocation} style={{ fontSize: selectedFontSizes.text }}>
                    {invitationText.location}
                  </p>
                )}
                {invitationText.additionalInfo && (
                  <p className={styles.previewAdditionalInfo} style={{ fontSize: selectedFontSizes.text }}>
                    {invitationText.additionalInfo}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.actionButtons}>
              <button 
                className={`${styles.actionButton} ${styles.previewButton} ${isInvitationEmpty() ? styles.disabled : ''}`}
                onClick={handlePreviewClick}
                disabled={isInvitationEmpty()}
                title={isInvitationEmpty() ? 'Prvo dodajte sadržaj pozivnice' : 'Pregledaj pozivnicu'}
              >
                <span className={styles.buttonIcon}>👁️</span>
                Pregledaj pozivnicu
              </button>
              <button 
                className={`${styles.actionButton} ${styles.downloadButton} ${isInvitationEmpty() ? styles.disabled : ''}`}
                onClick={handleDownloadPDF}
                disabled={isInvitationEmpty()}
                title={isInvitationEmpty() ? 'Prvo dodajte sadržaj pozivnice' : 'Skini kao PDF'}
              >
                <span className={styles.buttonIcon}>📥</span>
                Skini kao PDF
              </button>
              <button 
                className={`${styles.actionButton} ${styles.imageButton} ${isInvitationEmpty() ? styles.disabled : ''}`}
                onClick={handleDownloadImage}
                disabled={isInvitationEmpty()}
                title={isInvitationEmpty() ? 'Prvo dodajte sadržaj pozivnice' : 'Skini kao sliku'}
              >
                <span className={styles.buttonIcon}>🖼️</span>
                Skini kao sliku
              </button>
            </div>
          </div>
        </div>

        {isPreviewOpen && (
          <div className={styles.modalOverlay} onClick={handleClosePreview}>
            <div 
              ref={modalContentRef}
              className={styles.modalContent}
              onClick={e => e.stopPropagation()}
            >
              <button 
                className={styles.closeButton}
                onClick={handleClosePreview}
              >
                ×
              </button>
              <div 
                className={styles.modalPreview}
                style={{
                  backgroundColor: selectedBackground || undefined,
                  backgroundImage: customBackground ? `url(${customBackground})` : undefined,
                  color: selectedFontColor
                }}
              >
                <div className={`${styles.previewContent} ${selectedFont ? fonts.find(f => f.name === selectedFont)?.class : ''}`}>
                  {invitationText.title && (
                    <h2 style={{ fontSize: selectedFontSizes.title }}>
                      {invitationText.title}
                    </h2>
                  )}
                  {invitationText.mainText && (
                    <p className={styles.previewMainText} style={{ fontSize: selectedFontSizes.text }}>
                      {invitationText.mainText}
                    </p>
                  )}
                  {invitationText.date && (
                    <p className={styles.previewDate} style={{ fontSize: selectedFontSizes.text }}>
                      {invitationText.date}
                    </p>
                  )}
                  {invitationText.location && (
                    <p className={styles.previewLocation} style={{ fontSize: selectedFontSizes.text }}>
                      {invitationText.location}
                    </p>
                  )}
                  {invitationText.additionalInfo && (
                    <p className={styles.previewAdditionalInfo} style={{ fontSize: selectedFontSizes.text }}>
                      {invitationText.additionalInfo}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvitationDesign; 