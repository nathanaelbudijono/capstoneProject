// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from "next";
// import jwt from "jsonwebtoken";

// type Data = {
//   message: string;
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   switch (req.method) {
//     case "GET":
//       const token = req.cookies.token;
//       console.log("token is ", token);
//       if (token) {
//         const userToken: any = await new Promise((resolve, reject) => {
//           jwt.verify(
//             token,
//             process.env.NEXT_PUBLIC_TOKEN_SECRET as string,
//             {},
//             (err, token) => {
//               if (err) {
//                 reject(err);
//               }
//               resolve(token);
//             }
//           );
//         });
//         console.log(userToken);
//         return res.status(200).json({ message: "Hello from the API" });
//       } else {
//         return res.status(401).json({ message: "Unauthorized" });
//       }
//   }
// }
