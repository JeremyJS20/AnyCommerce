import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useContext, useEffect } from "react";
import { ThemeContext, themeVerifier } from "../Context/ThemeContext";
import { anyCommerceIconLight } from "../Assets/Img/ImgCollection";


interface IContainerProps {
}

const Container: React.FunctionComponent<IContainerProps> = () => {
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        if (theme === 'undefined') return;
        document.body.classList.remove(themeVerifier(theme));
        document.body.classList.add(theme);
    }, [theme]);

    useEffect(() => {
        document.title = 'AnyCommerce';        
    }, []);
    anyCommerceIconLight
    useEffect(() => {
        var link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
        if (!link) {
            link = document.createElement('link');
            document.head.appendChild(link);
        }
        link.href = anyCommerceIconLight;
    }, []);

    return (
        <div className="bg-gray-100 text-gray-900 tracking-tighter dark:text-gray-100 dark:bg-gray-800">
            <Navbar />
            <div className='w-[65%] m-auto'>
                <Outlet />
            </div>
        </div>
    );
};

export default Container;
