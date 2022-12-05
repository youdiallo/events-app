import classes from './newsletter-registration.module.css';
import { useRef } from 'react';

function NewsletterRegistration() {

  const emailInputRef = useRef();

  function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    const enteredEmail = emailInputRef.current.value;
    const sendToData = {
      emailAdress: enteredEmail,
    };

    // optional: validate input

    // send valid data to API
    fetch('/api/registration', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendToData),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
          ref={emailInputRef}/>
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
