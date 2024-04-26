import * as yup from "yup";

const StockResolverSchema = yup.object().shape({
  product: yup.number().required("You must select a product"),
  stock: yup.number().min(1).required("You must enter a stock"),
  limit: yup.number().min(0).required("You must enter a alert limit"),
});

export default StockResolverSchema;
