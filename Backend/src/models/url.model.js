// import mongoose from "mongoose";

// const urlSchema = new mongoose.Schema({
//   originalUrl: { type: String, required: true },
//   shortURLId: { type: String, required: true, unique: true },
//   shortUrl: { type: String, required: true },
//   expirationDate: { type: Date, default: null },
//   remarks: { type: String, default: null },
//   date: { type: Date, default: Date.now },
//   clicks: { type: Number, default: 0 },
//   deviceClicks: {
//     Android: { type: Number, default: 0 },
//     Desktop: { type: Number, default: 0 },
//     Tablet: { type: Number, default: 0 },
//   },
// });

// const MongoURL = mongoose.model("Url", urlSchema);

// export default MongoURL;




// import mongoose from "mongoose";

// const urlSchema = new mongoose.Schema({
//   originalUrl: { type: String, required: true },
//   shortURLId: { type: String, required: true, unique: true },
//   shortUrl: { type: String, required: true },
//   expirationDate: { type: Date, default: null },
//   remarks: { type: String, default: null },
//   date: { type: Date, default: Date.now },
//   clicks: { type: Number, default: 0 },
//   deviceClicks: {
//     Android: { type: Number, default: 0 },
//     Desktop: { type: Number, default: 0 },
//     Tablet: { type: Number, default: 0 },
//   },
//   clickDetails: [
//     {
//       ip: String,
//       userAgent: String,
//       visitId: String,
//       timestamp: { type: Date, default: Date.now },
//     },
//   ],
//   createdByIp: { type: String },
// });


// urlSchema.methods.isActive = function () {
//   if (!this.expirationDate) return true;
//   return new Date(this.expirationDate) > new Date();
// };

// urlSchema.methods.timeUntilExpiration = function () {
//   if (!this.expirationDate) return Infinity;
//   return new Date(this.expirationDate) - new Date();
// };


// urlSchema.pre('save', function(next) {
//   if (this.expirationDate && this.expirationDate < new Date()) {
//     const err = new Error('Expiration date must be in the future');
//     return next(err);
//   }
//   next();
// });


// // Track click details and update device counters
// urlSchema.methods.registerClick = async function (
//   clientIp,
//   userAgent,
//   visitId
// ) {
//   this.clicks += 1;

//   const isAndroid = /Android/i.test(userAgent);
//   const isTablet = /Tablet|iPad/i.test(userAgent);

//   if (isAndroid) {
//     this.deviceClicks.Android += 1;
//   } else if (isTablet) {
//     this.deviceClicks.Tablet += 1;
//   } else {
//     this.deviceClicks.Desktop += 1;
//   }

//   this.clickDetails.push({ ip: clientIp, userAgent, visitId });
//   await this.save();
// };

// const URL = mongoose.model("Url", urlSchema);

// export default URL;



import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortURLId: { type: String, required: true, unique: true },
  shortUrl: { type: String, required: true },
  expirationDate: { 
    type: Date, 
    default: null,
    validate: {
      validator: function(value) {
        // Allow null or dates in the future
        return value === null || value > Date.now();
      },
      message: 'Expiration date must be in the future'
    }
  },
  remarks: { type: String, default: null },
  date: { type: Date, default: Date.now },
  clicks: { type: Number, default: 0 },
  deviceClicks: {
    Android: { type: Number, default: 0 },
    Desktop: { type: Number, default: 0 },
    Tablet: { type: Number, default: 0 },
  },
  clickDetails: [
    {
      ip: String,
      userAgent: String,
      visitId: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
  createdByIp: { type: String },
});

// Add pre-save validation
urlSchema.pre('validate', function(next) {
  if (this.expirationDate && this.expirationDate < new Date()) {
    this.invalidate('expirationDate', 'Expiration date must be in the future');
  }
  next();
});

urlSchema.methods.isActive = function() {
  if (!this.expirationDate) return true;
  return this.expirationDate > new Date();
};

urlSchema.methods.timeUntilExpiration = function() {
  if (!this.expirationDate) return Infinity;
  return this.expirationDate - new Date();
};

// Track click details and update device counters
urlSchema.methods.registerClick = async function(clientIp, userAgent, visitId) {
  this.clicks += 1;

  const isAndroid = /Android/i.test(userAgent);
  const isTablet = /Tablet|iPad/i.test(userAgent);

  if (isAndroid) {
    this.deviceClicks.Android += 1;
  } else if (isTablet) {
    this.deviceClicks.Tablet += 1;
  } else {
    this.deviceClicks.Desktop += 1;
  }

  this.clickDetails.push({ ip: clientIp, userAgent, visitId });
  await this.save();
};

const URL = mongoose.model("Url", urlSchema);

export default URL;