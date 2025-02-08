const { Likes, unLikes } = require("../Database/models");
const ipToInt = require("ip-to-int");

export const disLikePost = async (req, res) => {
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

    // Check if the dislike already exists
    const existingDislike = await unLikes.findOne({
      where: { postId, userIp: userIpInt },
    });

    if (existingDislike) {
      // If the user already disliked the post, remove the dislike
      await existingDislike.destroy();
      return res.status(200).json({ message: "Your dislike removed" });
    }

    // Check if the user has already liked the post
    const existingLike = await Likes.findOne({
      where: { postId, userIp: userIpInt },
    });

    if (existingLike) {
      // Remove the like if it exists
      await existingLike.destroy();
    }

    // Add the dislike
    const newDislike = await unLikes.create({ postId, userIp: userIpInt });
    return res.status(201).json({ message: "Post disliked", dislike: newDislike });

  } catch (error) {
    console.error("Error disliking post:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
