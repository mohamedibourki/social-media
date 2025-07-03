// import { ResourceModel } from "../models/resource";
// import { resourceValidator } from "../validators/resourceValidator";

// app.post("/resources", async (req, res) => {
//   const parse = resourceValidator.safeParse(req.body);

//   if (!parse.success) {
//     return res.status(400).json({ error: parse.error.format() });
//   }

//   const validatedData = parse.data;

//   const resource = await ResourceModel.create(validatedData);
//   res.status(201).json(resource);
// });