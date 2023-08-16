import { createContext, PropsWithChildren, useCallback, useEffect, useState } from "react";
import i18n from "../Utils/Internationalization/i18n.internationalization.utils";

const defaultValue = {
    locale: 'es',
    setLocale: (): any => { }
}

export const LanguageContext = createContext(defaultValue);

export const changeLanguage = (prevLng:string, newLng:string) => {
    if(prevLng !== newLng) return i18n.changeLanguage(newLng);
};

const LanguageContextProvider = ({ children }: PropsWithChildren): JSX.Element => {

    const [locale, setLocale] = useState<any>();

    i18n.on('languageChanged', useCallback((lng:any) => { 
        
        if(locale !== lng)  setLocale(lng);
    }, [locale]));

    useEffect(() => {        
        setLocale(localStorage.getItem('i18nextLng'));  
    },[]);

    return (
        <LanguageContext.Provider value={{
            locale: locale,
            setLocale: setLocale as any
        }}>
            {children}
        </LanguageContext.Provider>
    );
}

export default LanguageContextProvider;