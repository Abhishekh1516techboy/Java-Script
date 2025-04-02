import Candidate from "../models/Candidate.js";
import User from "../models/User.js";

// ********************** /voting **********************
export const getAllCandidates = async (req, res) => {
  try {
    // Fetch all candidates from the database and exclude the 'votes' field
    const candidateList = await Candidate.find().select(
      "-votes -__v -createdAt -updatedAt"
    );

    if (!candidateList || candidateList.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No candidates found.",
      });
    }

    // Respond with the found candidates without votes field
    res.status(200).json({
      message: "Candidates Data found successfully",
      candidates: candidateList,
    });
  } catch (error) {
    console.error("Error finding Candidates:", error);
    res.status(500).json({ message: "Failed to find Candidates" });
  }
};

export const castVote = async (req, res) => {
  try {
    const candidateId = req.params.id; // Extract the User ID from URL parameters

    const userId = req.user.id; // Get the authenticated user's ID from JWT

    // Ensure both userId and candidateId are provided
    if (!userId || !candidateId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Candidate ID are required.",
      });
    }

    // Fetch user and candidate
    const user = await User.findById(userId);
    const candidate = await Candidate.findById(candidateId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    if (!candidate) {
      return res
        .status(404)
        .json({ success: false, message: "Candidate not found." });
    }

    // admin cant cast vote
    if(user.role === "admin"){
      return res
      .status(404)
      .json({ success: false, message: "Admin is not allowed for Vote." });
    }

    // Check if the user has already voted
    if (user.hasVoted) {
      return res.status(400).json({
        success: false,
        message: "You have already voted. Voting again is not allowed.",
      });
    }

    // Update user voting details
    user.hasVoted = true;
    user.votedCandidateId = candidate.id;
    user.votedParty = candidate.party;
    user.votedAt = new Date();

    // Update candidate vote count
    candidate.votedCount += 1;
    candidate.votes.push({
      user: userId,
      votedAt: new Date(),
    });

    // save data
    await user.save();
    await candidate.save();

    return res.status(200).json({
      success: true,
      message: "Vote cast successfully!",
      votedFor: candidate.name,
      party: candidate.party,
    });
  } catch (error) {
    console.error("Error casting vote:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const votingResults = async (req, res) => {
  try {
    // Aggregate candidates sorted by votedCount in descending order
    const results = await Candidate.aggregate([
      {
        // Select fields to include in the result
        $project: {
          name: 1,
          age: 1,
          gender: 1,
          party: 1,
          constituency: 1,
          imageUrl: 1,
          votedCount: 1,
          _id: 1,
        },
      },
      {
        // Sort by votedCount in descending order (highest to lowest)
        $sort: { votedCount: -1 },
      },
    ]);

    // Calculate total votes across all candidates
    const totalVotes = await Candidate.aggregate([
      { $group: { _id: null, total: { $sum: "$votedCount" } } },
    ]);

    // If no results, return an empty response
    if (!results.length) {
      return res.status(200).json({
        totalVotes: 0,
        candidates: [],
        message: "No voting data available yet",
      });
    }

    // Add ranking to each candidate (optional)
    const rankedResults = results.map((candidate, index) => ({
        ...candidate,
        rank: index + 1,
    }));

    // Send response with total votes and sorted candidates
    res.status(200).json({
      totalVotes: totalVotes[0]?.total || 0,
      candidates: rankedResults,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching voting results",
      error: error.message,
    });
  }
};