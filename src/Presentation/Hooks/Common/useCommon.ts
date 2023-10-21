import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

export const useTranslator = () => {
  const { t } = useTranslation();

  return (props: { text: string }) => t(props.text);
};

export const useNavigator = () => {
  const navigate = useNavigate();
  const translator = useTranslator();

  return (props: { route?: string; title?: string }) => {
    const { route, title } = props;
    if(route) navigate(route);

    if(title) localStorage.setItem('pageTitle', title);
    document.title =  title? `${translator({ text: title })} - AnyCommerce`: 'AnyCommerce';
  };
};

export const useQuery = () => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}