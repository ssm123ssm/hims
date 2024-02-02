import { cache } from "react";
import Bed from "../(models)/bed";

export const getItems = cache(async (id) => {
  console.log("getItems");

  try {
    const bedsData = await Bed.find({}).exec();
    //console.log(bedsData)
    //filter out deleted items and return the rest (the status of the deleted items is "deleted" and the rest is "active" or null or undefined)
    const activeBeds = bedsData.filter((bed) => bed.status[0] !== "deleted");

    return activeBeds;
  } catch (error) {
    console.log(error);
  }
});

export const getItem = cache(async (id) => {
  console.log("getOneItem");

  try {
    const bedsData = await Bed.find({ _id: id }).exec();
    return bedsData;
  } catch (error) {
    console.log(error);
  }
});

export const deleteItem = cache(async (id) => {
  console.log("getOneItem");

  try {
    const bedsData = await Bed.findOneAndDelete({ _id: id }).exec();
    return bedsData;
  } catch (error) {
    console.log(error);
  }
});

export const deleteItem_temp = cache(async (id) => {
  try {
    const bedsData = await Bed.find({ _id: id }).exec();
    const newBed = { ...bedsData[0]._doc, status: "deleted" };
    const bed = await Bed.findOneAndUpdate(
      { _id: id },
      { $set: newBed },
      { new: true } // This option returns the modified document
    );
    return bed;
  } catch (error) {
    console.log(error);
  }
});
