import * as Yup from 'yup'

const registrationSchema = Yup.object ({
  code: Yup.string()
  .matches(/^[A-Z]{3}-[0-9]{4}$/, "(3 CAPITAL LETTERS)-(4 DIGITS) exp. XXX-0000")
  .required("Please Enter Your HERO CODE"),

  email: Yup.string()
  .email("EMAIL TYPE ERROR")
  .required("Please Enter Your EMAIL"),

  password: Yup.string()
  .min(6)
  .required("Please Create Your PASSWORD"),

  cfpassword: Yup.string()
  .oneOf([Yup.ref("password")], "PASSWORD NOT MATCHED")
  .required("Please Confirm Your PASSWORD"),

  age: Yup.number()
  .typeError("Please Enter Your AGE")
  .min(10, "AGE must be at least 10")
  .max(120, "AGE must be at most 120"),

  class: Yup.string()
  .oneOf(["swordman", "merchant", "thief", "archer", "mage", "acrolyte"], "Please Select Your CLASS"),

  terms: Yup.boolean()
  .oneOf([true], "Please Swear Allegiance to the Guild")
})

export default registrationSchema