import * as Yup from "yup";

const Item = Yup.object().shape({
  name: Yup.string()
    .min(1, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  note: Yup.string(),
  img: Yup.string().required("Required"),
  category: Yup.string(),
});

export default Item;
