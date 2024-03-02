import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";
export const postController = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createPostController = async (req, res) => {
  const post = req.body;
  console.log(post);
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  console.log(newPost);
  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
//update
export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post found with that id.");
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No post found with that id.");
  }

  try {
    const deletedPost = await PostMessage.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found." });
    }

    res.json({ message: "Post successfully removed", deletedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) return res.json({ message: "Unauthenticated." });
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No post found with that id.");
  }
  const post = await PostMessage.findById(id);
  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.json(updatedPost);
};
