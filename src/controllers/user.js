
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../model/user.js";
import { uploadCloud } from "../utils/cloudinaryConfig.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const registerUser = asyncHandler(async (req, res) => {

    const { fullname, email, password, username } = req.body;

    if (
        !fullname?.trim() ||
        !email?.trim() ||
        !password?.trim() ||
        !username?.trim()
    ) {
        throw new ApiError(400, "All fields are required");
    }

    // Check whether user already exists
    const existedUser = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (existedUser) {
        throw new ApiError(409, "User already exists");
    }

    // Get uploaded image paths
    const avatarLocalPath = req.files?.avatar?.[0]?.path;

    let coverImageLocalPath;

    if (
        req.files &&
        Array.isArray(req.files.coverImage) &&
        req.files.coverImage.length > 0
    ) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required");
    }

    // Upload avatar to Cloudinary
    const avatar = await uploadCloud(avatarLocalPath);

    if (!avatar?.url) {
        throw new ApiError(400, "Failed to upload avatar");
    }

    // Upload cover image only if provided
    let coverImage = null;

    if (coverImageLocalPath) {
        coverImage = await uploadCloud(coverImageLocalPath);

        if (!coverImage?.url) {
            throw new ApiError(400, "Failed to upload cover image");
        }
    }

    // Create user
    const useradd = await User.create({
        fullname,
        email,
        password,
        username: username.toLowerCase(),
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
    });

    // Don't send password/refreshToken back
    const checking = await User.findById(useradd._id)
        .select("-password -refreshToken");

    if (!checking) {
        throw new ApiError(500, "Failed to retrieve user after creation");
    }

    return res.status(201).json(
        new ApiResponse(
            201,
            "User registered successfully",
            checking
        )
    );
});

export { registerUser };