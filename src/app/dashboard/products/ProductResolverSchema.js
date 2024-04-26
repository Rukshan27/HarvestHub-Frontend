import * as yup from "yup";

const ProductResolverSchema = yup.object().shape({
  name: yup.string().required("You must enter a name"),
  price: yup.number().min(1).required("You must enter a price"),
  dicount: yup.number().min(0).max(100),
  type: yup.string().required("Product type required"),
  photo: yup.string().required("You must enter a image"),
});

export default ProductResolverSchema;
