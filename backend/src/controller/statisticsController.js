import Database from "../Database/models";
import { Sequelize } from "sequelize";

const Users = Database["Users"];
const Posts = Database["Posts"];
const Comments = Database["Comments"];
const Likes = Database["Likes"];
const unLikes = Database["unLikes"];

export  const getStatistics = async (req, res) => {
  try {
    const totalUsers = await Users.count();
    const totalPosts = await Posts.count();
    const totalComments = await Comments.count();
    const totalLikes = await Likes.count();
    const totalUnlikes = await unLikes.count();

    // Count posts by category
    const postsByCategory = await Posts.findAll({
      attributes: ["category", [Database.sequelize.fn("COUNT", "*"), "count"]],
      group: ["category"],
    });

    res.status(200).json({
      totalUsers,
      totalPosts,
      totalComments,
      totalLikes,
      totalUnlikes,
      postsByCategory,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching statistics", error });
  }
};

