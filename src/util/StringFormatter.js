export const floatToStringFormatter = (value) => {
  if (value === null || value === undefined || typeof value !== "number")
    return "0.00";
  const roundedValue = value.toFixed(2);
  const parts = roundedValue.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const formattedValue = parts.join(".");
  return formattedValue;
};
