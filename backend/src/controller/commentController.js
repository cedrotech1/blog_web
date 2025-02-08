import Database from "../Database/models";
import { Sequelize } from "sequelize";

const Post = Database["Posts"];
const User = Database["Users"];
const Comment = Database["Comments"];
const Replies = Database["Replies"];
const Likes = Database["Likes"];
const unLikes = Database["unLikes"];



// const { Comments } = require("../Database/models");
const ipToInt = require("ip-to-int");

export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { names, commentBody } = req.body;

    // Get IP and convert it to an integer
    let userIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    userIp = userIp.replace(/^::1$/, "127.0.0.1"); // Normalize IPv6 localhost
    const userIpInt = ipToInt(userIp).toInt(); // Convert to integer

    console.log("Post ID:", id, "User IP:", userIp, "User IP (int):", userIpInt);

    // Check if the post exists
    const checkPostId = await Post.findByPk(id);
    if (!checkPostId) {
      return res.status(404).json({
        status: "404",
        message: "Post not found",
      });
    }

    // Create the comment
    const makeComment = await Comment.create({
      postId: id,
      names,
      commentBody,
      userIp: userIpInt, // Store the IP as an integer
    });

    return res.status(201).json({
      status: "201",
      message: "Your comment has been added",
      data: makeComment,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).json({
      status: "500",
      message: "Failed to add a comment",
      error: error.message,
    });
  }
};





// Fetch all comments
export const getAllComments = async (req, res) => {
  try {
    const getComments = await Comment.findAll({
      attributes: [
        "id",
        "names",
        "commentBody",
        "userIp",
        "createdAt",
        [
          Sequelize.literal(`(
            SELECT COUNT(*) 
            FROM "Replies"
            WHERE "Replies"."commentId" = "Comments"."id"
          )`),
          "allReplies",
        ],
      ],
      include: [
        {
          model: Replies,
          attributes: ["replyMessage", "createdAt", "updatedAt"],
          include: {
            model: User,
            as: "repliedBy",
            attributes: ["firstName", "lastName", "email", "profile", "createdAt"],
          },
        },
        {
          model: Post,
          as: "posts",
          attributes: ["postTitle", "postImage", "postContent", "views", "createdAt"],
          include: [
            {
              model: User,
              as: "postedBy",
              attributes: ["firstName", "lastName", "email", "profile", "createdAt"],
            },
            {
              model: Likes,
              attributes: ["createdAt"],
            },
            {
              model: unLikes,
              attributes: ["createdAt"],
            },
          ],
        },
      ],
    });

    return res.status(200).json({
      status: "200",
      message: "Comments retrieved successfully",
      data: getComments,
    });
  } catch (error) {
    console.error("Error retrieving comments:", error);
    return res.status(500).json({
      status: "500",
      message: "Failed to retrieve comments",
      error: error.message,
    });
  }
};

// Fetch a single comment by ID
export const getSingleComment = async (req, res) => {
  try {
    const { id } = req.params;
    const getComment = await Comment.findByPk(id, {
      attributes: [
        "id",
        "names",
        "commentBody",
        "userIp",
        "createdAt",
        [
          Sequelize.literal(`(
            SELECT COUNT(*) 
            FROM "Replies"
            WHERE "Replies"."commentId" = "Comments"."id"
          )`),
          "allReplies",
        ],
      ],
      include: [
        {
          model: Replies,
          attributes: ["replyMessage", "createdAt", "updatedAt"],
          include: {
            model: User,
            as: "repliedBy",
            attributes: ["firstName", "lastName", "email", "profile", "createdAt"],
          },
        },
        {
          model: Post,
          as: "posts",
          attributes: ["postTitle", "postImage", "postContent", "views", "createdAt"],
          include: [
            {
              model: User,
              as: "postedBy",
              attributes: ["firstName", "lastName", "email", "profile", "createdAt"],
            },
            {
              model: Likes,
              attributes: ["createdAt"],
            },
            {
              model: unLikes,
              attributes: ["createdAt"],
            },
          ],
        },
      ],
    });

    if (!getComment) {
      return res.status(404).json({
        status: "404",
        message: "Comment not found",
      });
    }

    return res.status(200).json({
      status: "200",
      message: "Comment retrieved successfully",
      data: getComment,
    });
  } catch (error) {
    console.error("Error retrieving comment:", error);
    return res.status(500).json({
      status: "500",
      message: "Failed to retrieve the comment",
      error: error.message,
    });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const checkCommentId = await Comment.findByPk(id);

    if (!checkCommentId) {
      return res.status(404).json({
        status: "404",
        message: "Comment not found",
      });
    }

    await Comment.destroy({ where: { id } });

    return res.status(200).json({
      status: "200",
      message: `Comment with ID ${id} deleted successfully`,
      data: checkCommentId,
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return res.status(500).json({
      status: "500",
      message: "Failed to delete the comment",
      error: error.message,
    });
  }
};
