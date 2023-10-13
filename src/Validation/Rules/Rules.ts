const isValidCardNumber = (cardNumber: string): boolean => {
  //luhn algorithm to validate card number

  let sanitizedCardNumber: string | number = cardNumber.replace(/\s/g, ""); // remove white spaces

  if(sanitizedCardNumber.length < 16) return false;

  let cardDigits: number[] = [];

  for (let i = 0; i < sanitizedCardNumber.length; i++) {
    let cardDigit = Number(sanitizedCardNumber.charAt(i));

    //verify the index of the digit. Have to be pair starting in index 0. If not pair, will be push it in cardDigits
    if (i % 2 == 0) {
      //step 1: Double every second digit (or pair digit), starting in index 0
      cardDigit *= 2;

      //step 2: if the resultant digit is greater than 9, split the number and sum both
      if (cardDigit > 9) {
        cardDigit = String(cardDigit)
          .split("")
          .map(Number)
          .reduce((a, b) => a + b, 0);
      }
    }

    cardDigits.push(cardDigit);
  }

  //step 3: sum all card digits
  sanitizedCardNumber = cardDigits.reduce((a, b) => a + b, 0);

  //step 4: if all digits sum result ends with zero, is a valid card number, otherwise is not valid.
  return String(sanitizedCardNumber).endsWith("0");
};

const rules: {
  email: RegExp;
  phone: RegExp;
  digits: RegExp;
  upperCase: RegExp;
  letter: RegExp;
  specialCharacter: RegExp;
  cardNumber: (value: string) => boolean;
  cardExpDate: RegExp;
  cardCcv: RegExp;
} = {
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  phone: /([0|\+[0-9]{1,5})?([0-9]{9,10})$/,
  digits: /^([^0-9]*)$/,
  upperCase: /^([^A-Z]*)$/,
  letter: /^[a-zA-Z]+$/,
  specialCharacter: /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
  cardNumber: isValidCardNumber,
  cardExpDate: /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
  cardCcv: /^\d{3,4}$/,
};

type rulesNames =
  | "email"
  | "phone"
  | "digits"
  | "upperCase"
  | "letter"
  | "specialCharacter"
  | "cardNumber"
  | "cardExpDate"
  | "cardCcv";

export const validateRule = (rule: {
  name: rulesNames;
  value: string;
}): boolean => {
  const { name, value } = rule;

  return rules[rule.name] instanceof RegExp
    ? (rules[name] as RegExp).test(value)
    : (rules[name] as (value: string) => boolean)(value);
};
