export const validationRules = {
  FIRST_NAME: {
    value: /^[A-Za-z]+$/,
    message: "First name should be of alphabets only.",
  },
  MIDDLE_NAME: {
    value: /^[A-Za-z]+$/,
    message: "Middle name should be of alphabets only.",
  },
  LAST_NAME: {
    value: /^[A-Za-z]+$/,
    message: "Last name should be of alphabets only.",
  },
  EMAIL: {
    value:
      /^([a-z0-9._%+-]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z0-9-]+\.)+[a-z]{2,}))$/,
    message: "Invalid email address.",
  },
  URL: {
    value:
      /^(http|https):\/\/[(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,16}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
    message: "Enter valid url",
  },
  NUMBER: {
    value: /^[0-9]+$/,
    message: "Enter valid number",
  },
  ALPHABETS_ONLY: {
    value: /^[A-Za-z ]+$/,
    message: "Please enter alphabets only",
  },
  ORGANIZATION_NAME: {
    value: /^[A-Za-z0-9 ]+$/,
    message: "Please enter valid organization name",
  },
  INSTITUTE_NAME: {
    value: /^[ a-zA-Z& ]+\.?[ a-zA-Z& ]*$/,
    message: "Please enter valid School/College name",
  },
  UNIVERSITY_NAME: {
    value: /^[ a-zA-Z ]+\.?[ a-zA-Z ]*$/,
    message: "Please enter valid University name",
  },
  DEGREE: {
    value: /^[ a-zA-Z ]+\.?[ a-zA-Z ]*$|^[ a-zA-Z ]+-?[ a-zA-Z ]*$/,
    message: "Please enter valid Degree",
  },
  PIN_CODE: {
    value: /^[1-9][0-9]{5}$/,
    message: "Wrong Format",
  },
  DURATION: {
    value: /^(1[0-2]|[0][0-9]):([3][0,1]|[1,2][0-9]|[0][0-9]):(1[0-9]|[2][0-4]|[0][0-9])$/,
    message: "Wrong Format",
  },
  PHONE_NUMBER: {
    value: /^\d{10}$/,
    message: "Please enter valid contact number.",
  },
  REQUIRED: {
    value: true,
    message: "This field is required.",
  },
  ALPHA_NUMERIC: {
    value: /^[a-zA-Z0-9]+$/,
    message: "Wrong Format",
  },
  PERCENTAGE: {
    value: /^(100|[1-9]?[0-9])$/,
    message: "Please enter valid percentage (eg: 20, 50).",
  },
  CHARACTER_NOT_ALLOWED: {
    value: /^[A-Za-z]+$/,
    message: "Should contain only alphabetic characters without spaces, numbers, or symbols.",
  },
  SMALL_CHARACTER_ALLOWED: {
    value: /^[a-z]+$/,
    message: "Should contain only small alphabetic characters without spaces, numbers, or symbols.",
  },
  ROLE_NAME_VALIDATION: {
    value: /^[A-Z][a-z]*(-[A-Za-z]*)*$/,
    message:
      'Should contain only alphabetic characters and "-". First letter should be capital letter.',
  },
  MAX_LENGTH: {
    value: 500,
    message: "Character count should not exceed 500.",
  },
  YEAR_LENGTH: {
    value: /^\d{4}-\d{4}$/,
    message: "Year Should be like 2024-2025.",
  },
  POSITIVE_NUMBER: {
    value: /^[1-9]\d*$/,
    message: "Enter valid natural number.",
  },
  FLOAT_POSITIVE_NUMBER: {
    value: /^[1-9]\d*(\.\d+)?$/,
    message: "Enter valid positive number.",
  },
};
