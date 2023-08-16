import { useLocation } from 'react-router-dom';
import { PublicRoutes } from '../Utils/routermanager.routes.utils';
import { Navbar as NextNavbar, NavbarContent, NavbarItem, Button, Link, Input, Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { ThemeContext, themeVerifier } from '../Context/ThemeContext';
import { useCallback, useContext } from 'react';
import { LanguageContext, changeLanguage } from '../Context/LanguageContext';
import { anyCommerceIconDark, anyCommerceIconLight } from '../Assets/Img/ImgCollection';

interface INavbarProps {
}

const Navbar: React.FunctionComponent<INavbarProps> = (props) => {
    const location = useLocation();

    const { t } = useTranslation();
    
    const { theme, setTheme } = useContext(ThemeContext);
    const { locale } = useContext(LanguageContext);

    const SearchIcon = () => (<i className="fa-solid fa-magnifying-glass mr-2 text-default-500 text-base"></i>)
    const CartIcon = () => (<i className="fa-solid fa-cart-shopping text-gray-800 text-xs dark:text-gray-100"></i>)
    const ThemeIcon = () => (<i className={`fa-regular ${themeVerifier(theme) == 'dark' ? 'fa-moon' : 'fa-sun'} text-gray-800 text-xs dark:text-gray-100`}></i>)
    const LanguageIcon = () => (<i className={`fa-solid fa-earth-americas text-gray-800 text-xs dark:text-gray-100`}></i>)

    const localesDropdownItems = [
        {
            key: 0,
            text: 'es-espanol',
            value: 'es',
        },
        {
            key: 1,
            text: 'en-ingles',
            value: 'en',
        }
    ];

    const onThemeBtnClick = useCallback(() => {
        localStorage.setItem('theme', themeVerifier(theme));
        setTheme(themeVerifier(theme));
    }, [theme]);

    const onLocaleItemClick = useCallback((loc: string) => {        
        changeLanguage(locale, loc)
    }, [locale]);

    if (location.pathname.includes(PublicRoutes.SIGNIN)) return <></>;

    return (
        <NextNavbar className='py-0 h-14 bg-gray-100/90 dark:bg-gray-800/90' maxWidth='2xl'>

            <NavbarContent className=" gap-6" justify="start">
                <NavbarItem>
                    <Link href="#">
                        <div className='flex gap-2 items-center'>
                            <img src={theme === 'light'? anyCommerceIconDark:anyCommerceIconLight} className='w-5 h-auto'/>
                            <p className="font-bold text-xl !text-gray-800 dark:!text-gray-100">Any<span className='text-green-700'>Commerce</span></p>
                        </div>
                    </Link>
                </NavbarItem>
                {/* <NavbarItem>
                    <Link href="#">
                        Features
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="#">
                        Customers
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Integrations
                    </Link>
                </NavbarItem> */}
            </NavbarContent>
            <NavbarContent justify='center'>
                <Input
                    classNames={{
                        base: "w-[45rem]",
                        mainWrapper: "h-full",
                        input: "text-xs",
                        inputWrapper: "h-full border border-gray-700 !bg-transparent text-default-500 dark:border-gray-700 hover:!bg-gray-200 dark:hover:!bg-gray-700 dark:!bg-gray-800",
                    }}
                    placeholder={t('buscar-productos')}
                    size="md"
                    startContent={<SearchIcon />}
                    endContent={<SearchIcon />}
                    type="search"
                />
            </NavbarContent>
            <NavbarContent as="div" className="items-center gap-2" justify="end">

                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar

                            isBordered
                            as="button"
                            className="transition-transform hidden"
                            color="secondary"
                            name="Jason Hughes"
                            size="sm"
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-semibold">Signed in as</p>
                            <p className="font-semibold">zoey@example.com</p>
                        </DropdownItem>
                        <DropdownItem key="settings">My Settings</DropdownItem>
                        <DropdownItem key="team_settings">Team Settings</DropdownItem>
                        <DropdownItem key="analytics">Analytics</DropdownItem>
                        <DropdownItem key="system">System</DropdownItem>
                        <DropdownItem key="configurations">Configurations</DropdownItem>
                        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                        <DropdownItem key="logout" color="danger">
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <NavbarItem>
                    <Button isIconOnly size='sm' radius='sm' variant='bordered' className='border border-gray-800 bg-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-800 dark:bg-gray-800'
                        onClick={onThemeBtnClick}
                    >
                        <ThemeIcon />
                    </Button>
                </NavbarItem>
                <NavbarItem>


                    <Dropdown className='bg-gray-200 dark:bg-gray-700'>
                        <DropdownTrigger>
                            <Button isIconOnly size='sm' radius='sm' variant='bordered' className='border border-gray-800 bg-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-800 dark:bg-gray-800'>
                                <LanguageIcon />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                        {localesDropdownItems.map(loc => (
                                <DropdownItem key={loc.key} className='text-gray-800 hover:!bg-gray-300 dark:hover:!bg-gray-600 dark:text-gray-100' onClick={() => onLocaleItemClick(loc.value)}>{`${t(loc.text)}`}</DropdownItem>
                            ))}

                        </DropdownMenu>
                    </Dropdown>
                </NavbarItem>
                <NavbarItem>
                    <Button isIconOnly  size='sm'radius='sm' variant='bordered' className='border border-gray-800 bg-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-800 dark:bg-gray-800'>
                        <CartIcon />
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button size='sm' radius='sm' variant='bordered' className='border border-none text-gray-100 bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-300 dark:text-gray-800 dark:bg-gray-100'>
                        {t('iniciar-sesion')}
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </NextNavbar>
    );
};

export default Navbar;