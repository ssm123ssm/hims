import { cache } from "react";
import Bed from "../(models)/bed";

export const getItems = cache(async (id) => {
  console.log("getItems");

  try {
    const bedsData = await Bed.find({}).exec();
    //console.log(bedsData)
    return bedsData;
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
