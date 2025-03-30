// Helper function to format Aadhar Number for display in UI like "xxxx-xxxx-xxxx-xxxx" format
export const formatAadharNumber = (aadharNumber) => {
    return `${aadharNumber.slice(0, 4)}-${aadharNumber.slice(4,8)}-${aadharNumber.slice(8)}`;
}

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
  if (phone) {
    const trimmedPhone = phone.trim();
    const phoneRegex = /^[6-9][0-9]{9}$/;
    if (!phoneRegex.test(trimmedPhone)) {
      throw new Error(
        "Invalid phone number. Must be a 10-digit number starting with 6-9"
      );
    }
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
  if (pinCode < 100000 || pinCode > 999999) {
    throw new Error("Invalid Pin code must be a 6-digit number");
  }
};
