import Candidate from "../models/Candidate.js";
import {
  //   formatAadharNumber, // show aadhar number "xxxx-xxxx-xxxx-xxxx" fromat in UI
  validateAadhar,
  validateAge,
  validateGender,
} from "../helpers/validators.js";

// ********************** /admin/manage **********************
export const createCandidate = async (req, res) => {
  try {
    // Body contains form data
    const data = req.body;

    //check form data is available in body or not
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ error: "Form data is required" });
    }

    // Apply validations (errors thrown here are caught below)
    validateAadhar(data.aadharNumber);
    validateAge(data.age);
    validateGender(data.gender);

    // Check for existing candidate by aadharNumber or candidateId
    const existingCandidate = await Candidate.findOne({
      $or: [
        { aadharNumber: data.aadharNumber },
        { candidateId: data.candidateId },
      ],
    });

    // If a candidate exists, determine which field matches
    if (existingCandidate) {
      const errors = [];
      if (existingCandidate.aadharNumber === data.aadharNumber) {
        errors.push("A candidate with this Aadhar number already exists");
      }
      if (existingCandidate.candidateId === data.candidateId) {
        errors.push("A candidate with this candidate ID already exists");
      }
      return res.status(400).json({
        message: "Candidate already exists",
        errors: errors,
      });
    }

    // Create new newUser document using mongoose model
    const newCandidate = new Candidate(data);

    // Save to MongoDB
    await newCandidate.save();

    // Respond with the saved User
    res.status(201).json({
      message: "Candidate created successfully",
      user: {
        id: newCandidate.id,
        name: newCandidate.name,
        gender: newCandidate.gender,
        candidateId: newCandidate.candidateId,
        party: newCandidate.party,
        constituency: newCandidate.constituency,
      },
    });
  } catch (error) {
    console.error("Error saving User:", error);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => ({
        path: err.path,
        message: err.message,
      }));
      return res.status(400).json({
        message: "Validation failed",
        errors: errors, // Array of specific validation errors
      });
    }

    // Handle custom validation errors from validators.js
    if (error.message.includes("Invalid")) {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Failed to save User" });
  }
};

export const updateCandidate = async (req, res) => {
  try {
    const candidateId = req.params.id; // Extract the User ID from URL parameters
    const updateCandidate = req.body; // Get the update data from the request body

    // Check if any update data was provided in the request
    if (!updateCandidate || Object.keys(updateCandidate).length === 0) {
      return res.status(400).json({ error: "No update data provided by User" });
    }

    // Apply validations (errors thrown here are caught below)
    validateAadhar(updateCandidate.aadharNumber);
    validateAge(updateCandidate.age);
    validateGender(updateCandidate.gender);

    // Update Candidate document in database using Mongoose
    const updatedCandidateData = await Candidate.findByIdAndUpdate(
      candidateId,
      updateCandidate,
      {
        new: true, // Return the modified document rather than original
        runValidators: true, // Ensure schema validations are applied
      }
    );

    // Returns 404 if no document matches the provided ID
    if (!updatedCandidateData) {
      return res.status(404).json({
        error: "Candidate not found in DataBase",
      });
    }

    // Success response with status 200 and updated User data
    res.status(200).json({
      message: "Candidate data updated successfully",
      user: updatedCandidateData, // Return the updated document
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => ({
        path: err.path,
        message: err.message,
      }));
      return res.status(400).json({
        message: "Validation failed",
        errors: errors, // Array of specific validation errors
      });
    }

    // Handle custom validation errors from validators.js
    if (error.message.includes("Invalid")) {
      return res.status(400).json({ message: error.message });
    }

    // Catch any errors during database operation
    res.status(500).json({
      error: "Failed to update Candidate",
    });
  }
};

export const deleteCandidate = async (req, res) => {
  try {
    // Extract the :id parameter from the route
    const CandidateId = req.params.id;

    // Attempt to find and permanently delete the Candidate document from the database
    const deletedCandidate = await Candidate.findByIdAndDelete(CandidateId);

    // If no document is found with the given ID, return a 404 error
    if (!deletedCandidate) {
      return res.status(404).json({
        error: "Candidate not found in DataBase", // Indicates the ID doesn't exist
      });
    }

    // Returns status 200 with a message and the deleted User data
    res.status(200).json({
      message: "Candidate data deleted successfully", // Confirmation message
      user: deletedCandidate, // Return the deleted document for reference
    });
  } catch (error) {
    // Handle any errors that occur during the database operation
    res.status(500).json({
      error: "Failed to Delete Candidate", // Generic error message for client
    });
  }
};
