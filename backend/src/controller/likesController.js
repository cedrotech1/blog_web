const { Likes, unLikes } = require("../Database/models");
const ipToInt = require("ip-to-int");
export const likePost = async (req, res) => {
  try {
    const postId = parseInt(req.params.postId, 10);
    if (isNaN(postId)) {
      return res.status(400).json({ message: "Invalid postId" });
    }

    // Get IP and convert it to an integer
    let userIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    userIp = userIp.replace(/^::1$/, "127.0.0.1"); // Normalize IPv6 localhost
    const userIpInt = ipToInt(userIp).toInt(); // Convert to integer

    console.log("Post ID:", postId, "User IP:", userIp, "User IP (int):", userIpInt);

    // Check if the like already exists
    const existingLike = await Likes.findOne({
      where: { postId, userIp: userIpInt },
    });

    if (existingLike) {
      return res.status(400).json({ message: "You have already liked this post" });
    }

    // Create a new like
    const newLike = await Likes.create({ postId, userIp: userIpInt });

    return res.status(201).json({ message: "Post liked successfully", like: newLike });

  } catch (error) {
    console.error("Error liking post:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};