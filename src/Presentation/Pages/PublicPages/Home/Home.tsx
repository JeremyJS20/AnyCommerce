import { Button } from "@nextui-org/react";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "../../../Utils/routermanager.routes.utils";

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = ({}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="h-[95vh] flex flex-col gap-7 justify-center text-center items-center w-[80vw] m-auto desktop:w-[54vw]">
      <p className=" text-4xl font-bold tablet:text-6xl">{t("presentacion")}</p>
      <p className=" text-lg text-gray-500 w-[60vw] tablet:text-2xl desktop:w-[30vw]">{t("presentacion2")}</p>
      <div className="flex items-center gap-5">
        <Button
          size="md"
          radius="sm"
          variant="bordered"
          className="border border-none text-gray-100 bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-300 dark:text-gray-800 dark:bg-gray-100"
          onClick={() => navigate(PublicRoutes.PRODUCTS)}
        >
          {t("comprar-ahora")}
        </Button>
        <Button
          size="md"
          radius="sm"
          variant="bordered"
          className="border border-none text-gray-100 bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-300 dark:text-gray-800 dark:bg-gray-100"
          onClick={() => navigate(PublicRoutes.SIGNIN)}
        >
          {t("vender-ahora")}
        </Button>
      </div>
    </div>
  );
};

export default Home;
