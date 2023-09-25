import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, forwardRef } from "@nextui-org/react";
import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { inputs } from "../../../Utils/types.utils";
import countries from "../../../Utils/DataCollection/countries.json";
import { Icon } from "../../../Assets/Icons/IconsCollection";

export const DynamicFormInput = forwardRef(
    (
      {
        ...props
      }: {
        input: inputs;
        values?: any;
        setValues?: React.Dispatch<any>;
        isInvalidInput?: any;
      },
      ref
    ) => {
      const { t } = useTranslation();
  
      const { input, values, setValues, isInvalidInput } = props;
  
      const [selectedCountry, setSelectedCountry] = useState<Iterable<string>>(
        new Set([])
      );
  
      const selectedCountryValue = useMemo(
        () => Array.from(selectedCountry).toString(),
        [selectedCountry]
      );
  
      const [selectedCountryPhoneCode, setSelectedCountryPhoneCode] = useState<
        Iterable<string>
      >(new Set([]));
  
      const selectedCountryPhoneCodeValue = useMemo(
        () => Array.from(selectedCountryPhoneCode).toString(),
        [selectedCountryPhoneCode]
      );
  
      useEffect(() => {
        if (
          countries.find((c) => c.alpha2 == String(selectedCountryValue)) ==
          undefined
        )
          return;
        setSelectedCountryPhoneCode(
          new Set([
            String(
              countries.find((c) => c.alpha2 == String(selectedCountryValue))
                ?.countryCallingCodes[0]
            ),
          ])
        );
      }, [selectedCountryValue]);
  
      useEffect(() => {
        if (selectedCountryPhoneCodeValue == "") return;
        if (setValues)
          setValues({
            [input as string]: {
              ...values[input as string],
              prefix: selectedCountryPhoneCodeValue,
              countryAlpha2: selectedCountryValue,
              verified: false,
            },
          });
      }, [selectedCountryPhoneCodeValue]);
  
      useEffect(() => {
        if (setValues)
          setValues({
            [input as string]: input == "email" || input == "phone" ? {} : "",
          });
      }, []);
  
      useEffect(() => {
        console.log(isInvalidInput);
      }, [isInvalidInput]);
  
      return (
        <div className="flex items-center gap-2">
          <Input
            classNames={{
              base: "",
              mainWrapper: "h-full",
              input: "text-sm",
              label: " font-semibold",
              inputWrapper:
                "h-full border border-gray-700 !bg-transparent text-default-500 dark:border-gray-700 hover:!bg-gray-200 dark:hover:!bg-gray-700 dark:!bg-gray-800",
            }}
            name={input}
            label={`${t(`${input?.toLowerCase()}`)}:`}
            placeholder={t(`escribe-${input?.toLowerCase()}`)}
            size="lg"
            type={
              input == "email" || input == "password"
                ? input
                : input == "phone"
                ? "number"
                : "text"
            }
            isInvalid={isInvalidInput ? isInvalidInput[input as string] : false}
            errorMessage={
              isInvalidInput
                ? isInvalidInput[input as string]
                  ? t(isInvalidInput.message)
                  : ""
                : ""
            }
            labelPlacement="outside"
            description={
              input == "email" || input == "phone" || input == "password"
                ? t(`edit-${input.toLowerCase()}-description`)
                : ""
            }
            value={
              input == "email" || input == "phone"
                ? values[input as string]?.value
                : values[input as string]
            }
            onValueChange={(value) => {
              if (!setValues) return;
              if (input == "phone") {
                return setValues({
                  [input as string]: {
                    ...values[input],
                    value: value,
                  },
                });
              }
  
              if (input == "email") {
                return setValues({
                  [input as string]: {
                    value: value,
                    verified: false,
                  },
                });
              }
  
              setValues({ [input as string]: value });
            }}
            startContent={
              <div
                className={`flex items-center  ${
                  input != "phone" ? "hidden" : ""
                }`}
              >
                <Dropdown
                  //placement="bottom-end"
                  classNames={{
                    base: "!min-w-[15em] !max-h-[15em] overflow-auto",
                  }}
                  className="bg-gray-200 dark:bg-gray-700"
                >
                  <DropdownTrigger>
                    <Button
                      startContent={
                        selectedCountryValue ? <></> : <Icon icon="globe" size="lg" />
                      }
                      endContent={<Icon icon="arrowDown" size="xs" />}
                      size="sm"
                      className="bg-inherit text-inherit"
                    >
                      <span className="text-2xl">
                        {
                          countries.find(
                            (c) => c.alpha2 == String(selectedCountryValue)
                          )?.emoji
                        }
                      </span>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    className="!max-w-[15em] !max-h-[15em]"
                    aria-label="ddd"
                    variant="flat"
                    selectionMode="single"
                    selectedKeys={selectedCountry}
                    onSelectionChange={setSelectedCountry as any}
                    disallowEmptySelection
                  >
                    {countries
                      .filter((c) => c.status == "assigned")
                      .map((c) => (
                        <DropdownItem
                          key={c.alpha2}
                          textValue={c.alpha2}
                          //startContent={<EyeIcon size="xs" />}
                          className="text-gray-800 hover:!bg-gray-300 dark:hover:!bg-gray-600 dark:text-gray-100"
                        >
                          <p className="flex items-center gap-2">
                            <span>{c.emoji}</span>
                            <span>{c.name}</span>
                          </p>
                        </DropdownItem>
                      ))}
                  </DropdownMenu>
                </Dropdown>
                <Dropdown
                  //placement="bottom-end"
                  classNames={{
                    base: "!min-w-[7em] !max-h-[15em] overflow-auto",
                  }}
                  className="bg-gray-200 dark:bg-gray-700"
                >
                  <DropdownTrigger>
                    <Button
                      // endContent={<ArrowDownIcon size="xs" />}
                      size="sm"
                      className={`bg-inherit text-inherit ${
                        countries.filter(
                          (c) => c.alpha2 == String(selectedCountryValue)
                        )[0]
                          ? ""
                          : "hidden"
                      }`}
                    >
                      <span className=" text-sm">
                        {selectedCountryPhoneCodeValue}
                      </span>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    className="!max-w-[7em] !max-h-[15em]"
                    aria-label="ddd"
                    variant="flat"
                    selectionMode="single"
                    selectedKeys={selectedCountryPhoneCode}
                    onSelectionChange={setSelectedCountryPhoneCode as any}
                    disallowEmptySelection
                  >
                    {countries.filter(
                      (c) => c.alpha2 == String(selectedCountryValue)
                    )[0] != undefined ? (
                      countries
                        .filter(
                          (c) => c.alpha2 == String(selectedCountryValue)
                        )[0]
                        .countryCallingCodes.map((c) => (
                          <DropdownItem
                            key={c}
                            textValue={c}
                            className="text-gray-800 hover:!bg-gray-300 dark:hover:!bg-gray-600 dark:text-gray-100"
                          >
                            <p className="flex items-center gap-2">
                              <span>{c}</span>
                            </p>
                          </DropdownItem>
                        ))
                    ) : (
                      <DropdownItem className="hidden"></DropdownItem>
                    )}
                  </DropdownMenu>
                </Dropdown>
              </div>
            }
          />
        </div>
      );
    }
  );