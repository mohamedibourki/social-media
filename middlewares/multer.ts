import type { Request, Response } from "express";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export const postFile = (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    res.send({
      file: req.file,
      body: req.body,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getFileByName = (req: Request, res: Response) => {
  const fileName = req.params.file;
  const filePath = path.join(__dirname, "../../uploads", fileName);

  res.download(filePath, (err) => {
    if (err) {
      console.error("Error downloading file:", err);
      res.status(404).json("File not found.");
    } else {
      console.log("File downloaded successfully");
    }
  });
};
