import { Button } from "@nextui-org/react";
import { FunctionComponent, useState } from "react";
import {
  StarHalfFilledIcon,
  StarFilledIcon,
  StarEmptyIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "../../Assets/Icons/IconsCollection";

export const renderProductRating = (
  rating: (number | null)[],
  size: "xs" | "sm" | "base" | "lg" | "xl"
) => {
  return (
    <>
      {rating.map((rat) =>
        rat != null ? (
          String(rat).includes(".") ? (
            <StarHalfFilledIcon size={size} color={"text-yellow-500"} />
          )  : (
            <StarFilledIcon size={size} color={"text-yellow-500"} />
          )
        ) : (
          <StarEmptyIcon size={size} color={"text-yellow-500"} />
        )
      )}
      <p className="ml-2 pb-[2px] text-lg ">
        {"("}
        {rating.reduce((a, b) => {
          return Math.max(Number(a), Number(b));
        }, 0)}

        {rating
          .find((rat) => String(rat).includes("."))
          ?.toString()
          .replace("0", "")}
        {")"}
      </p>
    </>
  );
};

export const renderProductPrice = (price: number) => (
  <>
    <p>$</p>
    <p className="text-3xl tablet:text-4xl">{String(price).split(".")[0]}</p>
    <p className="">
      .
      {String(price).split(".")[1] == undefined
        ? "00"
        : String(price).split(".")[1]}
    </p>
  </>
);

export const renderUnitsInStock = (stock: number, t: any) => {

  return (
    <p
      className={`${
        stock <= 10 && stock >= 1
          ? "text-blue-500"
          : stock <= 0
          ? "text-red-500"
          : "text-green-600"
      }`}
    >
      {stock > 20
        ? `+20 ${t("unidades-en-stock").toLowerCase()}`
        : stock <= 10 && stock >= 1
        ? `${t("solo")} ${stock} ${t(
            "pocas-unidades-en-stock"
          ).toLowerCase()} - ${t("ordena-pronto").toLowerCase()}`
        : stock <= 0
        ? `${t("no-disponible")}`
        : `${stock} ${t("unidades-en-stock").toLowerCase()}`}
    </p>
  );
};

export const ImagesSlider: FunctionComponent<{ images: string[] }> = ({
  ...props
}: {
  images: string[];
}) => {
  const [imageIndex, setImageIndex] = useState<number>(0);

  return (
    <div className="w-[95%] h-full flex flex-col gap-3">
      <div className="relative flex">
        <div
          className="w-full h-[20em] laptop:h-[40em] rounded-xl bg-cover bg-center bg-no-repeat "
          style={{ backgroundImage: `url(${props.images[imageIndex]})` }}
        ></div>
        <div className="absolute w-full h-full flex items-center justify-between px-2">
          <Button
            isIconOnly
            className={` rounded-full bg-gray-100 dark:bg-gray-600 ${props.images.length <= 1? 'hidden':''}`}
            size="sm"
            startContent={<ArrowLeftIcon size="sm" />}
            onClick={() => {
              setImageIndex(
                imageIndex <= 0
                  ? props.images.indexOf(props.images.slice(-1)[0])
                  : imageIndex - 1
              );
            }}
            disabled={props.images.length <= 1}
          />
          <Button
            isIconOnly
            className={` rounded-full bg-gray-100 dark:bg-gray-600 ${props.images.length <= 1? 'hidden':''}`}
            size="sm"
            startContent={<ArrowRightIcon size="sm" />}
            onClick={() => {
              setImageIndex(
                imageIndex >= props.images.length - 1 ? 0 : imageIndex + 1
              );
            }}
            disabled={props.images.length <= 1}
          />
        </div>
      </div>
      <div className={`flex gap-2 overflow-x-auto ${props.images.length <= 1? 'hidden':''}`}>
        {props.images.filter(img => props.images.indexOf(img) != imageIndex).map((img) => (
          <img
            draggable={false}
            className="cursor-pointer bg-cover bg-center bg-no-repeat w-[31%] h-[6em] laptop:h-[8em] tablet:w-[24%] rounded-xl"
            src={img}
            onClick={() => {
                setImageIndex(props.images.indexOf(img))
            }}
          />
        ))}
      </div>
    </div>
  );
};
