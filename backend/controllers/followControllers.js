import mongoose from "mongoose";
import Followers from "../models/Follower.js"
import Following from "../models/Following.js";
import User from "../models/User.js";

export const followers = async (req, res) => {
    try {
        const userId = req.user._id;
        const userFollowers = await Followers.findOne({user: userId})
        .populate({
            path: "followers",
            select: "fullName email"
        }).populate({
            path: "user",
            select: "fullName"
        });
        return res.status(200).json({
            "messaage": "Followers fetched successfully.",
            "data": userFollowers
        });
    } catch (error) {
        return res.send(400).json({
            "message": error.message
        });
    }
}


export const following = async(req, res)=>{ 
    try {
        const userId = req.user._id;
        const followingTo = await Following.findOne({user: userId})
        .populate({
            path: "user",
            select: ["fullName", "email"]
        })
        .populate({
            path: "following",
            select: ["fullName", "email"]
        });
        if (!followingTo || followingTo.following.length === 0) {
            return res.status(200).json({
                message: "You are following no one",
            });
        }
        return res.status(200).json({
            "message": "followers fetched successfully",
            "data": followingTo
        });
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        });
    }
}

export const follow = async (req, res) => {
    try {
        const userId = req.user._id;
        const { followId } = req.params;
        if(!followId.trim() || !mongoose.Types.ObjectId.isValid(followId)) {
            return res.status(400).json({
                "message": "not a valid follow id"
            })
        }
        const isUser = await User.findById(followId);
        if(userId === followId) {
            return res.status(400).json({
                "message": "self following is not allowed."
            });
        }
        if(!isUser) {
            return res.status(400).json({
                "message": "user trying to follow doesnt exist."
            });
        }

        const loggedUser = await Following.findOne({user: userId});
        if(!loggedUser) { 
            const newLoggedUser = new Following({
                user: userId,
                following: [followId]
            })
            await newLoggedUser.save();
        } else if(!loggedUser.following.includes(followId)) {
            loggedUser.following.push(followId);
            await loggedUser.save();
        }

        const followUser = await Followers.findOne({user: followId});
        if(!followUser) {
            const newFollowing = new Followers({
                user: followId,
                followers: [userId]
            });
            await newFollowing.save();
            const following = await newFollowing.populate({
                path: "user",
                select: ["fullName", "email"]
            })
            return res.status(200).json({
                "message": `successfully following ${following.user.fullName}`,
                "data": following
            })
        }
        const alreadyAFollower = followUser.followers.includes(userId);
        if(alreadyAFollower) {
            const followingUser = await followUser.populate({
                path: "user",
                select: ["fullName", "email"]
            })
            return res.status(200).json({
                "message": `Already a follower of ${followingUser.user.fullName}`,
                "data": followingUser
            })
        }
        followUser.followers.push(userId);
        await followUser.save();
        const following = await followUser.populate({
            path: "user",
            select: ["fullName", "email"]
        })
        return res.status(200).json({
            "message": `successfully following ${following.user.fullName}`,
            "data": following
        })
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        })
    }
}

export const unfollow = async (req, res)=> {
    try {

        const userId = req.user._id;
        const { unFollowId } = req.params;
        if(!unFollowId.trim() || !mongoose.Types.ObjectId.isValid(unFollowId)) {
            return res.status(400).json({
                "message": "not a vlid id to unfollow"
            })
        }
        if(userId === unFollowId) {
            return res.status(400).json({
                "message": "self unfollowing is not allowed"
            })
        }
        const unFollowUser = await User.findById(unFollowId);
        if(!unFollowUser) {
            return res.status(400).json({
                "message": "user trying to unfollow doesnt exist"
            })
        }
        const userFollowing = await Following.findOne({user: userId});
        if(!userFollowing) {
            return res.status(400).json({
                "message": "you are not following any one"
            });
        }
        const isFollowing = userFollowing.following.includes(unFollowId);

        if(!isFollowing) {
            return res.status(400).json({
                "message": "you are not follwing the user to unfollow"
            })  
        } 

        const followingUsers = userFollowing.following.filter((following)=> {
            return following.toString() !== unFollowId;
        }) 
        userFollowing.following = followingUsers;
        await userFollowing.save();

        const unfollowUserFollowers = await Followers.findOne({user: unFollowId});
        if(!unfollowUserFollowers) {
            return res.status(400).json({
                "message": "no followers"
            });
        }
        const isFollower = unfollowUserFollowers.followers.includes(userId);
        if(!isFollower) {
            return res.status(400).json({
                "message": "you are not follwing the user to unfollow"
            }); 
        }
        const followers = unfollowUserFollowers.followers.filter((follower) => {
            return follower.toString() !== userId;
        })
        unfollowUserFollowers.followers = followers;
        await unfollowUserFollowers.save();
        return res.status(200).json({
            "message": "unfollowed a user successfully"
        })
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        })
    }
}

export const Exploreusers = async (req, res)=> {
    try {
        const userId = req.user._id;
        let usersFollowedByLoggedUser = await Following.findOne({user: userId}).select("following");
        const allusers = await User.find({
            $and: [
                {_id: {$ne: userId}},
                {_id: {$nin: usersFollowedByLoggedUser?.following}}
            ]
        });
        return res.status(200).json({
            "message": "Feteched the friends successfully",
            "data": allusers
        })
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        })
    }
}