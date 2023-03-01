/** неймспейс функциий валидации разного типа */
export namespace InputValidators {

  /** валидация для email */
  export const emailValidator = (inputValue: string): boolean => {
    const regular = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    return regular.test(inputValue);
  };

  /**  валидация логиина (от 3 символов) */
  export const loginValidator = (inputValue: string): boolean => {
    const regular = /^[a-zA-Z0-9]{3,26}$/;
    return regular.test(inputValue);
  };

  export const simpleValidator = (inputValue: string): boolean => {
    const regular = /^[a-zA-Z0-9+._$%&?]{1,26}$/;
    return regular.test(inputValue);
  };

  /** валиидациия пароля, от 8 символов, включай кириллицу, цифры ии символы .!,#$% и т.д. */
  export const passwordValidator = (inputValue: string): boolean => {
    const regular = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!.,#$%&? "]).*$/;
    return regular.test(inputValue);
  };

  // валидация url
  export const urlValidator = (inputValue: string) : boolean => {
    const regular = /(^(ftp|http|https)::\/\/)?[a-z0-9~_\-.]+\.[a-z]{2,9}/i;
    return regular.test(inputValue);
  };

}
