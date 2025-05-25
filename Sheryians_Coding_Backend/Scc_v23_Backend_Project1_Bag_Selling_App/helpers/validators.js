// Helper function to format Aadhar Number for display in UI like "xxxx-xxxx-xxxx" format
export const formatAadharNumber = (aadharNumber) => {
  return `${aadharNumber.slice(0, 4)}-${aadharNumber.slice(
    4,
    8
  )}-${aadharNumber.slice(8)}`;
};

// hidden Aadhar Number show like "xxxx-xxxx-6194" format
export const hiddenAadharNumber = (aadharNumber) => {
  // Ensure the input is a string and has 12 digits
  if (!aadharNumber || aadharNumber.length !== 12) {
    return "Invalid Aadhar Number";
  }

  // Take the last 4 digits and mask the rest
  const lastFour = aadharNumber?.slice(-4);
  return `xxxx-xxxx-${lastFour}`;
};

// GSTIN validation
export const validateGstin = (gstin) => {
  if (!gstin) {
    throw new Error("GSTIN is required.");
  }

  const trimmedGstin = gstin?.trim().toUpperCase();
  const gstinRegex =
    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}Z[0-9A-Z]{1}$/;

  if (!gstinRegex.test(trimmedGstin)) {
    throw new Error(
      "Invalid GSTIN. Must be 15 characters in format: 2 digits, 5 letters, 4 digits, 1 letter, 1 letter or digit, Z, 1 letter or digit."
    );
  }
};

// Hidden GSTIN Number show like "xxxx-xxxx-xxx-F1Z5" format
export const hiddenGstinNumber = (gstinNumber) => {
  // Ensure the input is a string and has 15 characters
  if (!gstinNumber || gstinNumber.length !== 15) {
    return "Invalid GSTIN Number";
  }

  // Extract first 3 characters and last 4 characters
  const firstThree = gstinNumber.slice(0, 3);
  const lastFour = gstinNumber.slice(-4);

  // Return formatted string: first 3, 8 x's, last 4, with dashes
  return `${firstThree}-xxxx-xxxx-${lastFour}`;
};

// Aadhar validation
export const validateAadhar = (aadharNumber) => {
  if (!aadharNumber) {
    throw new Error("Invalid Aadhar Number is required.");
  }

  const trimmedAadhar = aadharNumber.trim();
  const aadharRegex = /^[2-9][0-9]{11}$/;
  if (!aadharRegex.test(trimmedAadhar)) {
    throw new Error(
      "Invalid Aadhar Number. Must be 12 digits starting with 2-9"
    );
  }
};

// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }
};

// Age validation
export const validateAge = (age) => {
  if (age < 18) {
    throw new Error("Invalid User must be at least 18 years old");
  }
};

// Gender validation
export const validateGender = (gender) => {
  const validGenders = ["male", "female", "other"];
  if (!validGenders.includes(gender)) {
    throw new Error("Invalid Gender must be 'male', 'female', or 'other'");
  }
};

// Phone validation
export const validatePhone = (phone) => {
  if (!phone) {
    throw new Error("Phone number is required.");
  }

  const trimmedPhone = phone.trim();
  const phoneRegex = /^[6-9][0-9]{9}$/;
  if (!phoneRegex.test(trimmedPhone)) {
    throw new Error(
      "Invalid phone number. Must be a 10-digit number starting with 6-9"
    );
  }
};

// Password validation
export const validatePassword = (password) => {
  if (!password) {
    throw new Error("Invalid Password is required.");
  }

  const trimmedPassword = password.trim();
  if (trimmedPassword.length < 8) {
    throw new Error("Invalid Password must be at least 8 characters long");
  }
  return trimmedPassword;
};

// Pin code validation
export const validatePinCode = (pinCode) => {
  const trimmed = pinCode.toString().trim();
  const pinRegex = /^[1-9][0-9]{5}$/;
  if (!pinRegex.test(trimmed)) {
    throw new Error("Invalid Pin code. Must be a 6-digit number");
  }
};
