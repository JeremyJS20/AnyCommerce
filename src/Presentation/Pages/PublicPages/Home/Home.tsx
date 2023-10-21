import { PublicRoutes } from "../../../Utils/routermanager.routes.utils";
import Btn from "../../../Components/Common/Inputs/Button";
import { FunctionComponent } from "react";
import { useNavigator, useTranslator } from "../../../Hooks/Common/useCommon";

interface IHomeProps {}

const Home: FunctionComponent<IHomeProps> = ({}) => {
  const translator = useTranslator();
  const navigator = useNavigator();

  return (
    <div className="h-[95vh] flex flex-col gap-7 justify-center text-center items-center w-[80vw] m-auto desktop:w-[54vw]">
      <h1 className=" text-4xl font-bold tablet:text-6xl">
        {translator({ text: "presentacion" })}
      </h1>
      <h2 className=" text-lg text-gray-500 w-[60vw] tablet:text-2xl desktop:w-[30vw]">
        {translator({ text: "presentacion2" })}
      </h2>
      <div className="flex items-center gap-5">
        <Btn
          text="comprar-ahora"
          size="md"
          onPress={() =>
            navigator({ route: PublicRoutes.PRODUCTS, title: "productos" })
          }
          type="primary"
        />
        <Btn
          text="vender-ahora"
          size="md"
          onPress={() =>
            navigator({ route: PublicRoutes.SIGNIN, title: "iniciar-sesion" })
          }
          type="tertiary"
        />
      </div>
    </div>
  );
};

export default Home;
