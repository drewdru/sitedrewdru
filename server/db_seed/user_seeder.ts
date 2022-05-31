import User from "../api/users/users.model";

export const createAdminAccount = async () => {
  const defaultEmail = process.env.DEFAULT_ADMIN_EMAIL;
  const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD;
  const admin = await User.findOne({ email: defaultEmail });
  console.log("======admin======", admin);
  if (!admin) {
    await User.create({
      email: defaultEmail,
      firstName: "admin",
      lastName: "admin",
      password: defaultPassword,
      role: "admin",
    });
  } else {
    await admin.updateOne(
      { email: defaultEmail },
      { password: defaultPassword }
    );
  }
};
