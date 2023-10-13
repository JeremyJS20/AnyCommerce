import {
  Checkbox,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface IMultipleInputFormProps {
  inputs: any[];
  formValues?: any;
  setFormValues?: React.Dispatch<any>;
  invalidInputs?: any[];
}

const MultipleFormInputs: FunctionComponent<IMultipleInputFormProps> = ({
  ...props
}) => {
  const { inputs, formValues, setFormValues, invalidInputs } = props;

  const { t } = useTranslation();

  const [inputSelectValues, setInputSelectValues] = useState<any>({});

  const onSelectionValueChange = (value: any, key: string) => {
    setInputSelectValues({
      ...inputSelectValues,
      [key]: new Set([value]),
    });

    if (setFormValues)
      setFormValues({
        ...formValues,
        [key]: value,
      });
  };

  const onValueChange = (
    value: any,
    key: string,
    type: "text" | "number" | "check"
  ) => {
    if (setFormValues)
      setFormValues({
        ...formValues,
        [key]:
          type == "number"
            ? value == ""
              ? formValues[key]
              : Number(value)
            : value,
      });
  };

  useEffect(() => {
    if (!inputs) return;
    if (Object.keys(formValues).length > 0) return;
    let initialFormValues: any = {};
    let initialInputSelectValues: any = { ...inputSelectValues };

    inputs?.forEach((i) => {
      let formattedValue;

      if (i.value) {
        if (i.type == "number") formattedValue = Number(i.value);
        else if (i.type == "select" || i.type == "selectWithInheritData") {
          initialInputSelectValues = {
            ...initialInputSelectValues,
            [i.key]: new Set([i.value]),
          };
          formattedValue = i.value;
        } else formattedValue = i.value;
      } else {
        if (i.type == "number") formattedValue = 0;
        else formattedValue = "";
      }

      initialFormValues[i.key] = formattedValue;
    });

    setInputSelectValues(initialInputSelectValues);

    if (setFormValues)
      setFormValues({
        ...formValues,
        ...initialFormValues,
      });
  }, [inputs]);

  useEffect(() => {
    console.log(invalidInputs);
  }, [invalidInputs]);

  const defaultRenderSelectValue = (items: any, key: string) => {
    const item = items[0];

    if (item == undefined) {
      return <></>;
    }

    return (
      <div className="flex items-center gap-3">
        <p className="text-default-500 text-sm font-normal">
          {t(item.data?.text || item.data?.name)}
        </p>
      </div>
    );
  };

  return (
    <div className=" flex flex-wrap items-center gap-5 justify-between">
      {inputs.map((input) => {
        if (input.type == "select") {
          return (
            <Select
              items={input.inputOptions.items}
              key={input.key}
              isRequired={input.isRequired}
              label={`${t(`${input.text}`)}:`}
              labelPlacement="outside"
              placeholder={t(input.placeholder)}
              size="lg"
              selectedKeys={inputSelectValues[input.key]}
              selectionMode="single"
              errorMessage={t(
                invalidInputs?.find((is) => Object.keys(is).includes(input.key))
                  ?.message
              )}
              onChange={(e) =>
                input.inputOptions.onSelectionChange
                  ? input.inputOptions.onSelectionChange({
                      value: e.target.value,
                      key: input.key,
                      selections: inputSelectValues,
                      setSelections: setInputSelectValues,
                      values: formValues,
                      setValues: setFormValues,
                    })
                  : onSelectionValueChange(e.target.value, input.key)
              }
              variant="bordered"
              renderValue={
                input.inputOptions.renderValue || defaultRenderSelectValue
              }
              disallowEmptySelection
              classNames={{
                popover: "bg-gray-200 dark:bg-gray-700",
                label: " font-semibold",
              }}
            >
              {(item: any) =>
                input.inputOptions.itemsRender != undefined ? (
                  input.inputOptions.itemsRender(item)
                ) : (
                  <SelectItem
                    key={item.key}
                    value={item.value}
                    textValue={item.value}
                    className="text-gray-800 hover:!bg-gray-300 dark:hover:!bg-gray-600 dark:text-gray-100"
                  >
                    {t(item.text)}
                  </SelectItem>
                )
              }
            </Select>
          );
        }

        if (input.type == "selectWithInheritData") { 
          return (
            <Select
              items={input.inputOptions.items}
              key={input.key}
              isRequired={input.isRequired}
              label={`${t(`${input.text}`)}:`}
              labelPlacement="outside"
              placeholder={t(input.placeholder)}
              size="lg"
              errorMessage={t(
                invalidInputs?.find((is) => Object.keys(is).includes(input.key))
                  ?.message
              )}
              isDisabled={!input.isRequired}
              selectedKeys={inputSelectValues[input.key]}
              selectionMode="single"
              onChange={(e) =>
                input.inputOptions.onSelectionChange
                  ? input.inputOptions.onSelectionChange({
                      value: e.target.value,
                      key: input.key,
                      selections: inputSelectValues,
                      setSelections: setInputSelectValues,
                      values: formValues,
                      setValues: setFormValues,
                    })
                  : onSelectionValueChange(e.target.value, input.key)
              }
              variant="bordered"
              renderValue={(items) =>
                defaultRenderSelectValue(items, input.key)
              }
              disallowEmptySelection
              classNames={{
                popover: "bg-gray-200 dark:bg-gray-700",
                label: " font-bold",
              }}
            >
              {(item: any) =>
                input.inputOptions.itemsRender != undefined ? (
                  input.inputOptions.itemsRender(item)
                ) : (
                  <SelectItem
                    key={item.key}
                    value={item.value}
                    textValue={item.value}
                    className="text-gray-800 hover:!bg-gray-300 dark:hover:!bg-gray-600 dark:text-gray-100"
                  >
                    {t(item.text)}
                  </SelectItem>
                )
              }
            </Select>
          );
        }

        if (input.type == "textarea") {
          return (
            <Textarea
              key={input.key}
              isRequired={input.isRequired}
              errorMessage={t(
                invalidInputs?.find((is) => Object.keys(is).includes(input.key))
                  ?.message
              )}
              name={input}
              label={`${t(`${input.text}`)}:`}
              placeholder={t(input.placeholder)}
              size="lg"
              type={input.type}
              isInvalid={false}
              labelPlacement="outside"
              description={""}
              value={formValues[input.key]}
              onValueChange={(value) =>
                onValueChange(value, input.key, input.type)
              }
              classNames={{
                base: "",
                mainWrapper: "h-full",
                input: "text-default-500 text-sm font-normal",
                label: " font-semibold",
                inputWrapper:
                  "h-full border border-gray-700 !bg-transparent text-default-500 dark:border-gray-700 hover:!bg-gray-200 dark:hover:!bg-gray-700 dark:!bg-gray-800",
              }}
            />
          );
        }

        if (input.type == "check") {
          return (
            <Checkbox
              key={input.key}
              isSelected={formValues[input.key]}
              onValueChange={(value) =>
                onValueChange(value, input.key, input.type)
              }
              classNames={{
                base: "w-full !max-w-full",
                label: "text-sm text-default-500",
              }}
            >
              {t(input.text)}
            </Checkbox>
          );
        }

        return (
          <Input
            key={input.key}
            isRequired={input.isRequired}
            errorMessage={t(
              invalidInputs?.find((is) => Object.keys(is).includes(input.key))
                ?.message
            )}
            endContent={input.endContent}
            width={'50%'}
            name={input}
            label={`${t(`${input.text}`)}:`}
            placeholder={t(input.placeholder)}
            size="lg"
            type={input.type}
            isInvalid={false}
            labelPlacement="outside"
            description={""}
            value={formValues[input.key]}
            onValueChange={(value) =>
              {                
                return input.onValueChange? input.onValueChange({key: input.key, value: value, state: formValues, setState: setFormValues}) : onValueChange(value, input.key, input.type)
              }
            }
            className={input.width? `w-[${input.width}%]`: ''}
            classNames={{
              base: input.width? `w-[${input.width}%]`: '',
              mainWrapper: "h-full",
              input: "text-default-500 text-sm font-normal",
              label: " font-semibold",
              inputWrapper:
                "h-full border border-gray-700 !bg-transparent text-default-500 dark:border-gray-700 hover:!bg-gray-200 dark:hover:!bg-gray-700 dark:!bg-gray-800",
            }}
          >
            {input.type}
          </Input>
        );
      })}
    </div>
  );
};

export default MultipleFormInputs;
