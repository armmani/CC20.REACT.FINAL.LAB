const yupToFormError = (err, refs) => {
  const errObj = {}
  err.inner.forEach((error) => {
    errObj[error.path] = error.message;
  })
  
  const firstErrorField = err.inner[0]?.path
  if(firstErrorField && refs[firstErrorField]?.current) {

  }
  return errObj
}

export default yupToFormError