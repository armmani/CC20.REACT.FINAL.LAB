import { useState, useRef } from 'react'
import registrationSchema from '../schema/registrationSchema'
import yupToFormError from '../utils/yupToFormError'

export default function RegistrationForm() {
  const style = {
    divInput: "flex gap-4 mt-8 justify-center w-1/2",
    input: "border-1 rounded-lg w-100",
    textError: "text-red-500 text-sm mt-0.5"
  }

  const [form, setForm] = useState({
    code: "",
    email: "",
    password: "",
    cfpassword: "",
    age: "",
    class: "",
    terms: false
  })

  const [error, setError] = useState({})

  const refs = {
    code: useRef(),
    email: useRef(),
    password: useRef(),
    cfpassword: useRef(),
    age: useRef(),
    class: useRef(),
    terms: useRef()
  }

  const handleChange = (e) => {
    const {name, type, checked, value} = e.target;
    setForm({...form,[name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registrationSchema.validate(form, { abortEarly: false })
      alert("HERO REGISTERED SUCCESSFULLY")
      setError({});
    }catch (err) {
      const errObj = yupToFormError(err, refs)
      setError(errObj)
    }
  }

  return(
    <div className='flex flex-col justify-center items-center' >
    <p className='flex justify-center item-center font-bold text-3xl mt-8'>Hero Registration</p>
    <form className='flex flex-col w-full items-center' onSubmit={handleSubmit}>
      <div className={style.divInput}>
      <label className='w-40'>HERO CODE</label>
      <input
        className={style.input}
        type="text"
        name="code"
        value={form.code}
        onChange={handleChange}
        ref={refs.code}
      />
      </div>
      <p className={style.textError}>{error.code}</p>
      <div className={style.divInput}>
      <label className='w-40'>EMAIL</label>
      <input
        className={style.input}
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        ref={refs.email}
      />
      </div>
      <p className={style.textError}>{error.email}</p>
      <div className={style.divInput}>
      <label className='w-40'>PASSWORD</label>
      <input
        className={style.input}
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        ref={refs.password}
      />
      </div>
      <p className={style.textError}>{error.password}</p>
      <div className={style.divInput}>
      <label className='w-40'>CONFIRM PASSWORD</label>
      <input
        className={style.input}
        type="password"
        name="cfpassword"
        value={form.cfpassword}
        onChange={handleChange}
        ref={refs.cfpassword}
      />
      </div>
      <p className={style.textError}>{error.cfpassword}</p>
      <div className={style.divInput}>
      <label className='w-40'>AGE</label>
      <input
        className={style.input}
        type="number"
        name="age"
        value={form.age}
        onChange={handleChange}
        ref={refs.age}
      />
      </div>
      <p className={style.textError}>{error.age}</p>
      <div className={style.divInput}> 
      <label className='w-40'>HERO CLASS</label>
      <select
        className={style.input}
        name="class"
        value={form.class}
        onChange={handleChange}
        ref={refs.class}
      >
        <option value="" disabled>--CHOOSE YOUR CLASS--</option>
        <option value="swordman">SWORDMAN</option>
        <option value="merchant">MERCHANT</option>
        <option value="thief">THIEF</option>
        <option value="archer">ARCHER</option>
        <option value="mage">MAGE</option>
        <option value="acrolyte">ACROLYTE</option>
      </select>
      </div>
      <p className={style.textError}>{error.class}</p>
      <div className={style.divInput}> 
      <input
        className={style.terms}
        type="checkbox"
        name="terms"
        checked={form.terms}
        onChange={handleChange}
        ref={refs.terms}
      />
      <label>Swear Allegiance to the Guild</label>
      </div>
      <p className={style.textError}>{error.terms}</p>
      <button className='btn btn-outline btn-info mt-4' type="submit">HERO REGISTRATION</button>
    </form>
  </div>
  )
}