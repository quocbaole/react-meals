import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === ''
const isNotFiveChars = value => value.trim().length !== 5

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true
  })

  const nameInputRef = useRef()
  const streetInputRef = useRef()
  const postalCodeInputRef = useRef()
  const cityInputRef = useRef()

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value
    const enteredStreet = streetInputRef.current.value
    const enteredPostalCode = postalCodeInputRef.current.value
    const enteredCity = cityInputRef.current.value

    const enteredNameIsValid = !isEmpty(enteredName)
    const enteredStreetIsValid = !isEmpty(enteredStreet)
    const enteredPostalCodeIsValid = !isNotFiveChars(enteredPostalCode)
    const enteredCityIsValid = !isEmpty(enteredCity)

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredPostalCodeIsValid,
      city: enteredCityIsValid
    })

    const formIsValid = enteredNameIsValid
      && enteredStreetIsValid
      && enteredPostalCodeIsValid
      && enteredCityIsValid
    if (!formIsValid) {
      return
    }
    props.onSubmitOrder({
      name: enteredName,
      street: enteredStreet,
      posterCode: enteredPostalCode,
      city: enteredCity
    })
    //
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValidity.name && <p className={classes.invalidFeedback}>Please enter a valid value.</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputsValidity.street && <p className={classes.invalidFeedback}>Please enter a valid value.</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && <p className={classes.invalidFeedback}>Please enter 5-digit code.</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValidity.city && <p className={classes.invalidFeedback}>Please enter a valid value.</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onClick}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;