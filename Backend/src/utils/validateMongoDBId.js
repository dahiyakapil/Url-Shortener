import mongoose from "mongoose";

const validateMongoDbID = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    throw new Error("This ID is not valid or Not Found");
  }
};

export default validateMongoDbID;
