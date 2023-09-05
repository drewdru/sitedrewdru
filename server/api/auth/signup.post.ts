// import jwt from "jsonwebtoken";
// import { CompatibilityEvent, sendError } from "h3";
// import { SignupSchema } from "./auth.schemas";
// import { useRuntimeConfig } from "#imports";
// import User, { IUser } from "@/server/api/users/users.model";
// import { swaggerRegister, yupValidator } from "@/server/utils/swagger";
// import { ValidationError } from "@/server/errors/validation";
// import { DatabaseError, DatabaseNotFoundError } from "@/server/errors/database";
// import { UnauthorizedError } from "@/server/errors/auth";

// @swaggerRegister("/auth")
// export class AuthHandler {
//   @yupValidator({
//     route: "/signup",
//     method: "post",
//     validate: { body: SignupSchema },
//     responses: [
//       ValidationError.swaggerError,
//       DatabaseNotFoundError.swaggerError,
//       DatabaseError.swaggerError,
//     ],
//   })
//   static async handler(event: CompatibilityEvent) {
//     const config = useRuntimeConfig();
//     const { email, password } = event.req.context.body;
//     let user: IUser;
//     try {
//       user = await User.findOne({ email });
//       if (user.verified) {
//         // TODO: if (oldUser.isVerified) send Notification to email: Someone trying to use this email for registration. You alredy have account on our site. If you forget your password you can reset password by this link. If it wasn't you please do nothing
//         // sendSecurityNotification(user.email);
//         return;
//       }
//     } catch {
//       user = await User.create({ email, password });
//       const token = jwt.sign({ id: user._id, email }, config.jwt.secret, {
//         expiresIn: config.jwt.expires,
//       });
//       return { user, token };
//     }
//     // try {
//     //   // // save user token
//     //   // user.token = token;

//     //   // // return new user
//     //   // res.status(201).json(user);
//     // } catch (error) {
//     //   return sendError(
//     //     event,
//     //     error.statusCode ? error : new UnauthorizedError(error.message)
//     //   );
//     // }
//   }
// }

// export default defineEventHandler(AuthHandler.handler);
