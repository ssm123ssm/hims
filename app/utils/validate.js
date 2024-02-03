export const isValid = (value, name) => {
  if (value === "") {
    // Return true if the value is an empty string
    return true;
  }

  if (name === "first_name") {
    return value.length > 3;
  } else if (
    name === "age" ||
    name === "bed_number" ||
    name === "date_of_fever" ||
    name === "plt" ||
    name === "crp" ||
    name === "scr" ||
    name === "wbc" ||
    name === "sgot" ||
    name === "sgpt" ||
    name === "inr" ||
    name === "pcv" ||
    name === "hb" ||
    name === "vots"
  ) {
    // Check if the value is a number
    return Number(value) > 0;
  } else if (name === "bht_number" || name === "ultrasound_findings") {
    // Allow empty strings for these fields
    return true;
  } else if (name === "date_of_leak_over") {
    // Check if the value is a date
    return Number(value) > 0;
  } else {
    // Default to true for unknown fields
    return true;
  }
};

export const isValidForm = (form, fields) => {
  //check if the form contains all the fields passed in the fields array and print why the form is not valid
  let isValid = true;
  fields.forEach((field) => {
    if (!form[field]) {
      console.log("field is empty", field);
      isValid = false;
    }
  });
  return isValid;
};
