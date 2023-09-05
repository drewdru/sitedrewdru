// import jwt from "jsonwebtoken";
// import { sendError } from "h3";
// import { useRuntimeConfig } from "#imports";
// import { UnauthorizedError } from "@/server/errors/auth";

// const verifyToken = (req: any, _res: any, _roles: string[]) => {
//   const config = useRuntimeConfig();
//   const token = req.headers.authorization;
//   if (!token) {
//     throw new UnauthorizedError("A token is required for authentication");
//   }
//   try {
//     return jwt.verify(token, config.jwt.secret, {
//       maxAge: config.jwt.expires,
//     });
//   } catch (err) {
//     throw new UnauthorizedError("Invalid Token");
//   }
// };

// export const authenticate = (roles?: string[]) => {
//   return (
//     _target: any,
//     _propertyKey: string,
//     descriptor: PropertyDescriptor
//   ) => {
//     const method = descriptor.value!;
//     descriptor.value = async function (...args: any[]) {
//       try {
//         const user = await verifyToken(args[0].req, args[0].res, roles);
//         args[0].req.context.user = user;
//       } catch (error) {
//         return sendError(
//           args[0],
//           error.statusCode ? error : new UnauthorizedError(error.message)
//         );
//       }
//       method.call(this, args);
//     };
//   };
// };
