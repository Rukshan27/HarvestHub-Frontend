import * as yup from "yup";

const UserResolverSchema = yup.object().shape({
  firstName: yup.string().required("You must enter a first name"),
  lastName: yup.string().required("You must enter a last name"),
  email: yup.string().email().required("You must enter a email"),
  phone: yup.string(),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(3, "Password is too short - must be at least 3 chars."),
  role: yup.string().required("Service type required"),
});

export default UserResolverSchema;
