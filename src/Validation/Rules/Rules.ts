export const checkIsEmail = (email:string):boolean => (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email));
export const checkIsPhone = (phone:string):boolean => (/([0|\+[0-9]{1,5})?([0-9]{9,10})$/.test(phone));
export const checkHaveDigits = (text:string):boolean => (/^([^0-9]*)$/.test(text));
export const checkHaveUppercase = (text:string):boolean => (/^([^A-Z]*)$/.test(text));
export const checkHaveSpecialCharacter = (text:string):boolean => (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(text));
