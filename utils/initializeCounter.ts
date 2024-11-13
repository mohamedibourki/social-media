import { Counter } from "./dbConter";

export const initializeCounters = async () => {
  try {
    const counter = await Counter.findOne({ _id: "studentId" });

    if (!counter) {
      await Counter.create({
        _id: "studentId",
        seq: -1,
        isInitialized: true,
      });
      console.log("Student ID counter initialized starting from 0");
    }
  } catch (error) {
    console.error("Error initializing counters:", error);
  }
};
