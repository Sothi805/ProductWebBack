export const regNumber =
  /^(?:0\.(?:0[0-9]|[0-9]\d?)|[0-9]\d*(?:\.\d{1,2})?)(?:e[+-]?\d+)?$/;

// react-hook-form
export const validateNumberOnly = {
  value: /^(0|[1-9]\d*)(\.\d+)?$/,
  message: "Value should be number",
};
