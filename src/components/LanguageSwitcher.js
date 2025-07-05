import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng);
    };

    return (
        <div className="language-switcher">
            <button 
                className={`btn btn-sm ${i18n.language === 'en' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                onClick={() => changeLanguage('en')}
            >
                EN
            </button>
            <button 
                className={`btn btn-sm ${i18n.language === 'ar' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => changeLanguage('ar')}
            >
                عربي
            </button>
        </div>
    );
}

export default LanguageSwitcher; 