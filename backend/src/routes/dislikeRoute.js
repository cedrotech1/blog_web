    import express from "express";
    import fileUpload from "../helper/multer";
    import { normalUserAuthentication } from "../middleware/Authentication";
    import { 
        disLikePost,
    } from "../controller/unlikeController";

    const dislikeRoute = express.Router();
    dislikeRoute.post("/posts/dislike/:postId",fileUpload.single("postImage"),disLikePost);
    export default dislikeRoute;
