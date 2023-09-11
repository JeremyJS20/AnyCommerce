const SearchIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'}) => (<i className={`fa-solid fa-magnifying-glass p-[2.5px] text-gray-900 text-${props.size} dark:text-gray-100`}></i>);
const CartIcon = ({}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'}) => (<i className={`fa-solid fa-cart-shopping text-inherit`}></i>);
const ThemeLightIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'}) => (<i className={`fa-regular fa-sun text-gray-900 text-${props.size} dark:text-gray-100`}></i>);
const ThemeDarkIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'}) => (<i className={`fa-regular fa-moon text-gray-900 text-${props.size} dark:text-gray-100`}></i>);
const LanguageIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'}) => (<i className={`fa-solid fa-earth-americas text-gray-900 text-${props.size} dark:text-gray-100`}></i>);
const XIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'}) => (<i className={`fa-solid fa-x text-gray-900 text-${props.size} dark:text-gray-100`}></i>);
const CollapseIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'}) => (<i className={`fa-solid fa-bars text-gray-900 text-${props.size} dark:text-gray-100`}></i>);
const PlusIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'}) => (<i className={`fa-solid fa-plus text-gray-900 text-${props.size} dark:text-gray-100`}></i>);
const MinusIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'}) => (<i className={`fa-solid fa-minus text-gray-900 text-${props.size} dark:text-gray-100`}></i>);
const TrashIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'}) => (<i className={`fa-solid fa-trash text-gray-900 text-${props.size} dark:text-gray-100`}></i>);
const MailIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'}) => (<i className={`fa-solid fa-envelope text-gray-900 text-${props.size} dark:text-gray-100`}></i>);
const KeyIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'}) => (<i className={`fa-solid fa-key text-gray-900 text-${props.size} dark:text-gray-100`}></i>);
const EyeIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'}) => (<i className={`fa-solid fa-eye text-gray-900 text-${props.size} dark:text-gray-100`}></i>);
const EyeSlashIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'}) => (<i className={`fa-solid fa-eye-slash text-gray-900 text-${props.size} dark:text-gray-100`}></i>);
const ArrowDownIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl', color?: string}) => (<i className={`fa-solid fa-chevron-down ${props.color? props.color: 'text-inherit'} text-${props.size}`}></i>);
const ArrowRightIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'}) => (<i className={`fa-solid fa-angle-right text-gray-900 text-${props.size} dark:text-gray-100`}></i>);
const DoubleArrowRightIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'}) => (<i className={`fa-solid fa-angles-right text-gray-900 text-${props.size} dark:text-gray-100`}></i>);
const ArrowLeftIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'}) => (<i className={`fa-solid fa-angle-left text-gray-900 text-${props.size} dark:text-gray-100`}></i>);
const DoubleArrowLeftIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'}) => (<i className={`fa-solid fa-angles-left text-gray-900 text-${props.size} dark:text-gray-100`}></i>);
const HorizontalDotsIcon =  ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'|'2xl'|'4xl'|'6xl', color?: string}) => (<i className={`fa-solid fa-ellipsis ${props.color? props.color: 'text-inherit'} text-${props.size} `}></i>);
const VerticalDotsIcon =  ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'|'2xl'|'4xl'|'6xl', color?: string}) => (<i className={`fa-solid fa-ellipsis-vertical ${props.color? props.color: 'text-inherit'} text-${props.size} `}></i>);

const StarFilledIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'|'2xl'|'4xl'|'6xl', color?: string}) => (<i className={`fa-solid fa-star ${props.color? props.color: 'text-inherit'} text-${props.size} `}></i>);
const StarHalfFilledIcon = ({...props}:{size: 'xs'|'medium'|'sm'|'base'|'lg'|'xl', color: string}) => (<i className={`fa-regular fa-star-half-stroke ${props.color} text-${props.size} `}></i>);
const StarEmptyIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl', color: string}) => (<i className={`fa-regular fa-star ${props.color} text-${props.size} `}></i>);
const BoxIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'|'2xl'|'4xl'|'6xl' | ''} ) => (<i className={`fa-solid fa-box-open text-gray-900 text-${props.size} dark:text-gray-100`}></i>);
const FilterIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'|'2xl'|'4xl'|'6xl'}) => (<i className={`fa-solid fa-filter text-gray-900 text-${props.size} dark:text-gray-100`}></i>);
const DollarSignIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'|'2xl'|'4xl'|'6xl'}) => (<i className={`fa-solid fa-dollar-sign p-1 text-gray-900 text-${props.size} dark:text-gray-100`}></i>);
const CategoryIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'|'2xl'|'4xl'|'6xl'}) => (<i className={`fa-solid fa-list text-gray-900 text-${props.size} dark:text-gray-100`}></i>);
const SortIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'|'2xl'|'4xl'|'6xl'}) => (<i className={`fa-solid fa-sort text-gray-900 text-${props.size} dark:text-gray-100`}></i>);
const HeartEmptyIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'|'2xl'|'4xl'|'6xl'}) => (<i className={`fa-regular fa-heart text-gray-900 text-${props.size} dark:text-gray-100`}></i>);
const HeartFilledIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'|'2xl'|'4xl'|'6xl', color?: string}) => (<i className={`fa-solid fa-heart ${props.color? props.color: 'text-inherit'} text-${props.size} `}></i>);
const ListIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'|'2xl'|'4xl'|'6xl', color?: string}) => (<i className={`fa-solid fa-list text-inherit text-${props.size}`}></i>);
const InfoIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'|'2xl'|'4xl'|'6xl'}) => (<i className={`fa-solid fa-circle-info text-gray-900 text-${props.size} dark:text-gray-100`}></i>);
const ProfileIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'|'2xl'|'3xl'|'4xl'|'6xl'}) => (<i className={`fa-regular fa-circle-user text-inherit text-${props.size} dark:text-inherit`}></i>);

const CopyRightIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl', color?: string}) => (<i className={`fa-regular fa-copyright ${props.color? props.color: 'text-inherit'} text-${props.size} `}></i>);
const XTwitterIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl', color?: string}) => (<i className={`fa-brands fa-x-twitter ${props.color? props.color: 'text-inherit'} text-${props.size} `}></i>);
const InstagramIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl', color?: string}) => (<i className={`fa-brands fa-instagram ${props.color? props.color: 'text-inherit'} text-${props.size} `}></i>);
const NotificationIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'|'2xl'|'4xl'|'6xl', color?: string}) => (<i className={`fa-solid fa-bell ${props.color? props.color: 'text-inherit'} text-${props.size} `}></i>);
const AddPlusIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'|'2xl'|'4xl'|'6xl', color?: string}) => (<i className={`fa-solid fa-plus ${props.color? props.color: 'text-inherit'} text-${props.size} `}></i>);
const SignOutIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'|'2xl'|'4xl'|'6xl', color?: string}) => (<i className={`fa-solid fa-arrow-right-from-bracket ${props.color? props.color: 'text-inherit'} text-${props.size} `}></i>);
const StoreIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'|'2xl'|'4xl'|'6xl', color?: string}) => (<i className={`fa-solid fa-store ${props.color? props.color: 'text-inherit'} text-${props.size} `}></i>);
const OrdersIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'|'2xl'|'4xl'|'6xl'}) => (<i className={`fa-solid fa-bag-shopping text-inherit text-${props.size} dark:text-inherit`}></i>);
const MoneyIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'|'2xl'|'4xl'|'6xl'}) => (<i className={`fa-solid fa-money-bill text-inherit text-${props.size} dark:text-inherit`}></i>);
const MoneyTransferIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl', color?: string}) => (<i className={`fa-solid fa-money-bill-transfer ${props.color? props.color: 'text-inherit'} text-${props.size} `}></i>);

const EditIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'|'2xl'|'4xl'|'6xl'}) => (<i className={`fa-solid fa-pen text-inherit text-${props.size} dark:text-inherit`}></i>);
const ClockIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'|'2xl'|'4xl'|'6xl', color?: string}) => (<i className={`fa-solid fa-clock ${props.color? props.color: 'text-inherit'} text-${props.size} `}></i>);
const SlidersIcon = ({...props}:{size: 'xs'|'sm'|'medium'|'base'|'lg'|'xl'|'2xl'|'4xl'|'6xl', color?: string}) => (<i className={`fa-solid fa-sliders ${props.color? props.color: 'text-inherit'} text-${props.size} `}></i>);

export {
    SearchIcon,
    CartIcon,
    ThemeLightIcon,
    ThemeDarkIcon,
    LanguageIcon,
    XIcon,
    CollapseIcon,
    PlusIcon,
    MinusIcon,
    TrashIcon,
    MailIcon,
    KeyIcon,
    EyeIcon,
    EyeSlashIcon,
    ArrowDownIcon,
    StarFilledIcon,
    StarHalfFilledIcon,
    StarEmptyIcon,
    BoxIcon,
    FilterIcon,
    DollarSignIcon,
    CategoryIcon,
    SortIcon,
    ArrowRightIcon,
    DoubleArrowRightIcon,
    ArrowLeftIcon,
    DoubleArrowLeftIcon,
    HorizontalDotsIcon,
    VerticalDotsIcon,
    HeartEmptyIcon,
    HeartFilledIcon,
    ListIcon,
    InfoIcon,
    CopyRightIcon,
    XTwitterIcon,
    InstagramIcon,
    ProfileIcon,
    NotificationIcon,
    AddPlusIcon,
    SignOutIcon,
    StoreIcon,
    OrdersIcon,
    MoneyIcon,
    EditIcon,
    ClockIcon,
    SlidersIcon,
    MoneyTransferIcon
}