import React, { useState, useRef, useEffect } from 'react';
import { Disc3, PlusCircle, Compass, Radio } from 'lucide-react';

const THEME_META = {
  dark: { icon: '●', label: 'Night mode' },
  white: { icon: '○', label: 'Day mode' },
  sunset: { icon: '◐', label: 'Sunset mode' },
};

export default function Header({ totalAlbums, totalRecs, onOpenAddRec, theme, setTheme }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const meta = THEME_META[theme] || THEME_META.dark;

  useEffect(() => {
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <header>
      {/* Portfolio Style Brand Logo */}
      <div className="logo">
        <Disc3 style={{ width: '24px', height: '24px', color: 'var(--gold)' }} className="spin-vinyl" />
        <span>CITY POP <span className="gold-accent">VAULT</span></span>
      </div>

      {/* Stats Counter & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)' }} className="hidden-mobile">
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Compass style={{ width: '14px', height: '14px', color: 'var(--gold)' }} />
            Albums: <strong style={{ color: 'var(--white)' }}>{totalAlbums}</strong>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Radio style={{ width: '14px', height: '14px', color: 'var(--gold)' }} />
            Recs: <strong style={{ color: 'var(--white)' }}>{totalRecs}</strong>
          </span>
        </div>

        {/* Theme Dropdown Toggle */}
        <div className={`theme-dropdown ${dropdownOpen ? 'open' : ''}`} ref={dropdownRef}>
          <button
            className="theme-dd-toggle"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setDropdownOpen(!dropdownOpen);
            }}
          >
            <span className="theme-dd-icon">{meta.icon}</span>
            <span className="theme-dd-label">{meta.label}</span>
            <svg className="theme-dd-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          <ul className="theme-dd-menu">
            {Object.entries(THEME_META).map(([key, m]) => (
              <li
                key={key}
                className={`theme-dd-option ${theme === key ? 'active' : ''}`}
                onClick={() => {
                  setTheme(key);
                  setDropdownOpen(false);
                }}
              >
                <span>{m.icon}</span>{m.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Recommend Button */}
        <button onClick={onOpenAddRec} className="btn-solid">
          <PlusCircle style={{ width: '14px', height: '14px' }} />
          <span>Recommend</span>
        </button>

      </div>
    </header>
  );
}
