import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import MyProfile from "../../Pages/Private/Account/MyProfile";
import MyOrders from "../../Pages/Private/Account/MyOrders";
import MyPurchases from "../../Pages/Private/Account/MyPurchases";
import MyLists from "../../Pages/Private/Account/MyLists";
import MyPaymentMethods from "../../Pages/Private/Account/MyPaymentMethods";
import MyAddresses from "../../Pages/Private/Account/MyAddresses";
import { useTranslator } from "../../Hooks/Common/useCommon";

interface IAsideMenuContentProps {}

const AsideMenuContent: FunctionComponent<IAsideMenuContentProps> = ({}) => {
  const { childPage } = useParams();
  const translator = useTranslator();

  const menuContent = [
    {
      key: "myprofile",
      content: <MyProfile />,
    },
    {
      key: "myorders",
      content: <MyOrders />,
    },
    {
      key: "mypurchases",
      content: <MyPurchases />,
    },
    {
      key: "mylists",
      content: <MyLists />,
    },
    {
      key: "mypaymentmethods",
      content: <MyPaymentMethods />,
    },
    {
      key: "myaddresses",
      content: <MyAddresses />,
    },
  ];

  return (
    <div className="flex flex-col gap-7 laptop:pl-10">
      <div className="flex flex-col gap-2">
        <h1 className=" font-semibold text-2xl">
          {translator({text: String(childPage?.split("?")[0])})}
        </h1>
        <p className="text-base text-default-500">
          {translator({text: `${childPage}-description`})}
        </p>
      </div>
      <div className="px-5">
        {menuContent.find((mc) => mc.key == childPage?.split("?")[0])?.content}
      </div>
    </div>
  );
};

export default AsideMenuContent;
