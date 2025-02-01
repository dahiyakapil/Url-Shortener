// import { nanoid } from "nanoid";
// import URL from "../models/url.model.js";

// export default async () => {
//   let urlId = nanoid(6);

//   while (true) {
//     const urlObject = await URL.findOne({ urlId });
//     if (!urlObject) break;
//     urlId = nanoid(6);
//   }

//   return urlId;
// };

// import { nanoid } from "nanoid";
// import URL from "../models/url.model.js";

// const generateUniqueNanoID = async () => {
//   let urlId = nanoid(6);
//   let attempts = 0;
//   const maxAttempts = 10; // Set a maximum number of attempts

//   while (attempts < maxAttempts) {
//     const urlObject = await URL.findOne({ urlId });
//     if (!urlObject) break;
//     urlId = nanoid(6);
//     attempts++;
//   }

//   if (attempts === maxAttempts) {
//     throw new Error("Failed to generate unique ID after multiple attempts.");
//   }

//   return urlId;
// };

// export default generateUniqueNanoID;



// import { customAlphabet } from 'nanoid';
// import URL from "../models/url.model.js";

// const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz'; // Lowercase alphabet
// const generateId = customAlphabet(alphabet, 6); // Generate 6-character lowercase IDs

// const generateUniqueNanoID = async () => {
//   let urlId = generateId();
//   let attempts = 0;
//   const maxAttempts = 10;

//   while (attempts < maxAttempts) {
//     const urlObject = await URL.findOne({ shortURLId: urlId }); // Check shortURLId field
//     if (!urlObject) break;
//     urlId = generateId();
//     attempts++;
//   }

//   if (attempts === maxAttempts) {
//     throw new Error("Failed to generate unique ID after multiple attempts.");
//   }

//   return urlId;
// };

// export default generateUniqueNanoID;




import { customAlphabet } from 'nanoid';
import URL from "../models/url.model.js";

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz'; // Lowercase only
const generateId = customAlphabet(alphabet, 6); // 6-character lowercase IDs

const generateUniqueNanoID = async () => {
  let urlId = generateId();
  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    const urlObject = await URL.findOne({ shortURLId: urlId }); // Correct field name
    if (!urlObject) break;
    urlId = generateId();
    attempts++;
  }

  if (attempts === maxAttempts) {
    throw new Error("Failed to generate unique ID after multiple attempts.");
  }

  return urlId;
};

export default generateUniqueNanoID;