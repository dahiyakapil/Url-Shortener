import URL from "../models/url.model.js";
import validateURL from "../utils/validateURL.js";
import generateUniqueNanoID from "../utils/generateUniqueID.js";
import userAgent from "user-agent";
import asyncHandler from "express-async-handler";
import { UAParser } from "ua-parser-js";
import mongoose from "mongoose";

const createShortURL = async (req, res) => {
  const { originalUrl, remarks, expirationDate } = req.body;
  const renderLink =
    process.env.BACKEND_RENDER_URL || "https://short-gibj.onrender.com";
  console.log(renderLink);
  const ipAddress =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  // Normalize URL format
  const normalizedUrl = originalUrl.trim().replace(/\/+$/, "");

  if (!validateURL(normalizedUrl)) {
    return res.status(400).json({ message: "Invalid URL" });
  }

  // Validate expiration date
  if (expirationDate && new Date(expirationDate) < new Date()) {
    res.status(400);
    throw new Error("Expiration date must be in the future");
  }

  try {
    // Check for existing URL with case insensitivity and normalized format
    const findExistingURL = await URL.findOne({
      originalUrl: { $regex: new RegExp(`^${normalizedUrl}$`, "i") },
    });

    if (findExistingURL) {
      return res.status(200).json({
        originalUrl: findExistingURL.originalUrl,
        short_URL: findExistingURL.shortUrl,
        shortURLId: findExistingURL.shortURLId,
        clicks: findExistingURL.clicks,
        expirationDate: findExistingURL.expirationDate,
        remarks: findExistingURL.remarks,
      });
    }

    // Generate lowercase short ID
    const shortUrlNanoId = await generateUniqueNanoID();
    // const fullShortUrl = `${renderLink}/${shortUrlNanoId}`;
    // const fullShortUrl = `${renderLink}/s/${shortUrlNanoId}`; // Add '/s/' path segment

    const fullShortUrl = `${renderLink}/api/urls/s/${shortUrlNanoId}`;

    // Validate expiration date format
    if (expirationDate && isNaN(new Date(expirationDate).getTime())) {
      return res
        .status(400)
        .json({ message: "Invalid expiration date format" });
    }

    const newUrlEntry = new URL({
      originalUrl: normalizedUrl,
      shortURLId: shortUrlNanoId,
      shortUrl: fullShortUrl,
      expirationDate: expirationDate || null,
      remarks: remarks || null,
      createdByIp: ipAddress,
      date: new Date(),
      // Initialize all device types explicitly
      deviceClicks: {
        Android: 0,
        Desktop: 0,
        Tablet: 0,
      },
    });

    await newUrlEntry.save();

    res.status(201).json({
      originalUrl: normalizedUrl,
      short_URL: fullShortUrl,
      shortURLId: shortUrlNanoId,
      clicks: 0,
      expirationDate: expirationDate || null,
      remarks: remarks || null,
      createdByIp: ipAddress,
    });
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// const redirectToUrl = asyncHandler(async (req, res) => {
//   if (
//     req.originalUrl === "/favicon.ico" ||
//     req.originalUrl.includes("robots.txt")
//   ) {
//     return res.status(204).end();
//   }

//   const { shortURLId } = req.params; // Extract shortURLId from params
//   const url = await URL.findOne({ shortURLId });

//   if (!url) {
//     res.status(404);
//     throw new Error("URL not found");
//   }

//   if (url.isExpired()) {
//     // Use isExpired method
//     res.status(410);
//     throw new Error("URL has expired");
//   }

//   // Get client IP
//   let clientIp =
//     req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
//     req.socket.remoteAddress;
//   clientIp = clientIp.replace(/^::ffff:/, "");

//   // Generate visitId
//   const visitId = `${shortURLId}-${clientIp}-${Math.floor(Date.now() / 30000)}`;

//   // Check user agent
//   const userAgent = req.headers["user-agent"] || "Unknown";
//   const isBot = /bot|crawler|spider|crawling/i.test(userAgent);

//   // Check duplicate visit
//   const recentVisit = url.clickDetails.some(
//     (detail) => detail.visitId === visitId
//   );

//   if (!isBot && !recentVisit) {
//     await url.registerClick(clientIp, userAgent, visitId);
//   }

//   // Respond based on client type
//   if (req.headers.accept?.includes("application/json")) {
//     res.json({ redirectUrl: url.originalUrl });
//   } else {
//     res.setHeader("Cache-Control", "no-store, no-cache");
//     res.redirect(302, url.originalUrl);
//   }
// });

const redirectToUrl = asyncHandler(async (req, res) => {
  if (
    req.originalUrl === "/favicon.ico" ||
    req.originalUrl.includes("robots.txt")
  ) {
    return res.status(204).end();
  }

  const { shortURLId } = req.params;
  const url = await URL.findOne({ shortURLId });

  if (!url) {
    return res.status(404).json({
      success: false,
      message: "Short URL not found or has been deleted",
    });
  }

  // Check expiration (now includes time comparison)
  if (url.expirationDate && new Date(url.expirationDate) < new Date()) {
    return res.status(410).json({
      success: false,
      message: "This link has expired and is no longer available",
    });
  }

  // Rest of the tracking logic remains the same
  let clientIp =
    req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
    req.socket.remoteAddress;
  clientIp = clientIp.replace(/^::ffff:/, "");

  const visitId = `${shortURLId}-${clientIp}-${Math.floor(Date.now() / 30000)}`;
  const userAgent = req.headers["user-agent"] || "Unknown";
  const isBot = /bot|crawler|spider|crawling/i.test(userAgent);

  const recentVisit = url.clickDetails.some(
    (detail) => detail.visitId === visitId
  );

  if (!isBot && !recentVisit) {
    await url.registerClick(clientIp, userAgent, visitId);
  }

  // Response handling
  if (req.headers.accept?.includes("application/json")) {
    res.json({
      success: true,
      redirectUrl: url.originalUrl,
      status: "active",
      expiresAt: url.expirationDate,
    });
  } else {
    res.setHeader("Cache-Control", "no-store, no-cache");
    res.redirect(302, url.originalUrl);
  }
});

const updateShortURL = async (req, res) => {
  const { shortURLId } = req.params; // short URL ID from URL params
  const { originalUrl, remarks, expirationDate } = req.body; // Data to update

  // Log incoming data for debugging
  console.log("Short URL ID:", shortURLId);
  console.log("Request Body:", req.body);

  // Validate the original URL if provided
  if (originalUrl && !validateURL(originalUrl)) {
    return res.status(400).json({ message: "Invalid URL" });
  }

  try {
    // Find the short URL document by its ID
    const urlDoc = await URL.findOne({ shortURLId });

    // If document is not found, return a 404 error
    if (!urlDoc) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    // Update fields only if new data is provided
    if (originalUrl) urlDoc.originalUrl = originalUrl;
    if (remarks) urlDoc.remarks = remarks;
    if (expirationDate) urlDoc.expirationDate = expirationDate;

    // Save the updated document
    const updatedDoc = await urlDoc.save();

    return res.status(200).json({
      message: "Short URL updated successfully",
      updatedUrl: {
        originalUrl: updatedDoc.originalUrl,
        shortUrl: updatedDoc.shortUrl,
        shortURLId: updatedDoc.shortURLId,
        clicks: updatedDoc.clicks,
        expirationDate: updatedDoc.expirationDate,
        remarks: updatedDoc.remarks,
      },
    });
  } catch (error) {
    console.error("Error updating short URL:", error.message);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

const getAllShortUrls = async (req, res) => {
  try {
    // Fetch all short URLs from the database
    const allUrls = await URL.find();

    // Check if URLs exist
    if (allUrls.length === 0) {
      return res.status(404).json({ message: "No short URLs found" });
    }

    // Return the list of short URLs
    res.status(200).json(allUrls);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getTotalClicksById = async (req, res) => {
  try {
    // Aggregate query to get all the clicks and sum them up
    const result = await URL.aggregate([
      {
        $group: {
          _id: null, // Grouping all documents together (no need to group by anything specific)
          totalClicks: { $sum: "$clicks" }, // Summing up the clicks field
        },
      },
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: "No clicks found" });
    }

    // Send the total clicks in the response
    res.status(200).json({ totalClicks: result[0].totalClicks });
  } catch (error) {
    console.error("Error getting all clicks:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getTotalClicks = async (req, res) => {
  try {
    // Aggregate query to sum clicks from all URLs
    const result = await URL.aggregate([
      {
        $group: {
          _id: null, // Group all documents together
          totalClicks: { $sum: "$clicks" }, // Sum up the clicks from all documents
        },
      },
    ]);

    // If no clicks are found (empty collection or no clicks in URLs)
    if (result.length === 0) {
      return res.status(404).json({ message: "No clicks found" });
    }

    // Send the total clicks as a response
    res.status(200).json({ totalClicks: result[0].totalClicks });
  } catch (error) {
    console.error("Error calculating total clicks:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// const getClicksByDate = async (req, res) => {
//   try {
//     // Aggregate query to group clicks by date
//     const result = await URL.aggregate([
//       {
//         $project: {
//           // Extract only the date part from the timestamp (ignoring time)
//           date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
//           clicks: 1,
//         },
//       },
//       {
//         $group: {
//           _id: "$date", // Grouping by the formatted date
//           totalClicks: { $sum: "$clicks" }, // Summing the clicks for each date
//         },
//       },
//       {
//         $sort: { _id: -1 }, // Sort by date in descending order
//       },
//     ]);

//     // If no data is found
//     if (result.length === 0) {
//       return res.status(404).json({ message: "No clicks data found" });
//     }

//     // Send the aggregated clicks by date
//     res.status(200).json(result);
//   } catch (error) {
//     console.error("Error getting clicks by date:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// const getClicksByDevice = async (req, res) => {
//   try {
//     // Aggregate query to get the total clicks by device type
//     const result = await URL.aggregate([
//       {
//         $project: {
//           _id: 0,
//           deviceClicks: 1,
//         },
//       },
//       {
//         $group: {
//           _id: null,
//           totalAndroidClicks: { $sum: "$deviceClicks.Android" },
//           totalDesktopClicks: { $sum: "$deviceClicks.Desktop" },
//           totalTabletClicks: { $sum: "$deviceClicks.Tablet" },
//         },
//       },
//     ]);

//     // If no data is found (i.e., no device clicks data)
//     if (result.length === 0) {
//       return res.status(404).json({ message: "No clicks data found" });
//     }

//     // Return the clicks data by device type
//     res.status(200).json({
//       totalAndroidClicks: result[0].totalAndroidClicks,
//       totalDesktopClicks: result[0].totalDesktopClicks,
//       totalTabletClicks: result[0].totalTabletClicks,
//     });
//   } catch (error) {
//     console.error("Error calculating clicks by device:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

const getUserIpAddress = asyncHandler(async (req, res) => {
  // Get IP through multiple fallbacks
  let ipAddress =
    req.headers["x-forwarded-for"] ||
    req.headers["cf-connecting-ip"] || // Cloudflare
    req.headers["x-real-ip"] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    req.connection?.socket?.remoteAddress;

  // Handle array format in x-forwarded-for
  if (typeof ipAddress === "string" && ipAddress.includes(",")) {
    ipAddress = ipAddress.split(",")[0].trim();
  }

  // Clean and normalize the IP
  ipAddress = ipAddress
    ?.replace(/^::ffff:/, "") // Remove IPv6 prefix
    ?.replace(/^::1$/, "127.0.0.1") // Convert IPv6 localhost to IPv4
    ?.split(":")
    .shift(); // Remove port number

  // Final fallback for empty values
  ipAddress = ipAddress || "unknown";

  res.status(200).json({
    success: true,
    ipAddress,
  });
});

const getUserDevice = asyncHandler(async (req, res) => {
  const userAgent = req.headers["user-agent"] || "Unknown";
  const parser = new UAParser(userAgent);
  const result = parser.getResult();

  const deviceInfo = {
    browser: {
      name: result.browser.name || "Unknown",
      version: result.browser.version || "Unknown",
    },
    os: {
      name: result.os.name || "Unknown",
      version: result.os.version || "Unknown",
    },
    device: {
      type: result.device.type || "Desktop",
      model: result.device.model || "Unknown",
      vendor: result.device.vendor || "Unknown",
    },
    engine: {
      name: result.engine.name || "Unknown",
      version: result.engine.version || "Unknown",
    },
    cpu: {
      architecture: result.cpu.architecture || "Unknown",
    },
  };

  res.status(200).json({
    success: true,
    userAgent,
    deviceInfo,
  });
});

const getExpiredUrls = async (req, res) => {
  try {
    // Get the current date
    const currentDate = new Date();

    // Find URLs where expirationDate is less than the current date
    const expiredUrls = await URL.find({
      expirationDate: { $lt: currentDate },
    });

    if (expiredUrls.length === 0) {
      return res.status(404).json({ message: "No expired URLs found" });
    }

    res.status(200).json(expiredUrls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get total clicks grouped by date
const getClicksByDate = async (req, res) => {
  try {
    const result = await URL.aggregate([
      // Step 1: Filter out invalid/missing dates
      {
        $match: {
          date: { $exists: true, $ne: null }, // Ensure date exists and is not null
          $expr: { $gt: ["$date", new Date("1970-01-02")] }, // Filter out epoch default dates
        },
      },
      // Step 2: Format the date
      {
        $project: {
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$date",
            },
          },
          clicks: 1,
        },
      },
      // Step 3: Group by formatted date
      {
        $group: {
          _id: "$date",
          totalClicks: { $sum: "$clicks" },
        },
      },
      // Step 4: Sort by date
      { $sort: { _id: -1 } },
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: "No clicks data found" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error getting clicks by date:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get total clicks segmented by device type
const getClicksByDevice = async (req, res) => {
  try {
    const result = await URL.aggregate([
      {
        $project: {
          _id: 0,
          deviceClicks: 1,
        },
      },
      {
        $group: {
          _id: null,
          totalAndroidClicks: { $sum: "$deviceClicks.Android" },
          totalDesktopClicks: { $sum: "$deviceClicks.Desktop" },
          totalTabletClicks: { $sum: "$deviceClicks.Tablet" },
        },
      },
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: "No clicks data found" });
    }

    res.status(200).json({
      totalAndroidClicks: result[0].totalAndroidClicks,
      totalDesktopClicks: result[0].totalDesktopClicks,
      totalTabletClicks: result[0].totalTabletClicks,
    });
  } catch (error) {
    console.error("Error calculating clicks by device:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Short URL Controller

const getUrlsByRemarks = async (req, res) => {
  try {
    const { remarks } = req.query;

    if (!remarks) {
      return res.status(400).json({
        success: false,
        message: "Remarks search query parameter is required",
      });
    }

    // Case-insensitive search with partial matching
    const urls = await URL.find({
      remarks: {
        $regex: new RegExp(remarks.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
      },
    }).select("-__v -clickDetails -deviceClicks");

    if (urls.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No URLs found with matching remarks",
      });
    }

    res.status(200).json({
      success: true,
      count: urls.length,
      data: urls,
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({
      success: false,
      message: "Error searching URLs",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const deleteUrlById = async (req, res) => {
  try {
    const { id } = req.params; // Get the MongoDB _id from request parameters

    // Check if the provided _id is valid
    if (!id) {
      return res.status(400).json({ message: "MongoDB ID is required" });
    }

    // Find and delete the URL document by _id
    const deletedUrl = await URL.findByIdAndDelete(id);

    // If no document is found, return a 404 error
    if (!deletedUrl) {
      return res.status(404).json({ message: "No URL found with that ID" });
    }

    // Return success response
    return res
      .status(200)
      .json({ message: "URL deleted successfully", deletedUrl });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting URL", error });
  }
};

export {
  createShortURL,
  getAllShortUrls,
  getTotalClicksById,
  getTotalClicks,
  getClicksByDate,
  getClicksByDevice,
  getUserDevice,
  getUserIpAddress,
  getExpiredUrls,
  redirectToUrl,
  getUrlsByRemarks,
  deleteUrlById,
};
