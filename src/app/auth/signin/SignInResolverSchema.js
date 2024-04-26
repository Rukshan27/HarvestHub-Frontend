import * as yup from "yup";

const SignInResolverSchema = yup.object().shape({
  email: yup.string().email().required("You must enter a email"),
  password: yup.string().required("Please enter your password."),
});

export default SignInResolverSchema;
