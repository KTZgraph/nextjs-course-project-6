import { useRef } from "react";
import classes from "./profile-form.module.css";

function ProfileForm(props) {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  // zmiana hasła ze strony klienta
  function submitHandler(event) {
    event.preventDefault();

    const enteredOlPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;
    // można dac walidacje po stronie klienta zeby user widział co zrobił źle, ale prawdziwa pewna walidacja po stronie serwera

    // wysyłanie danych do komponentu rodzica
    // funcja props z rodzica
    props.onChangePassword({
      oldPassword: enteredOlPassword,
      newPassword: enteredNewPassword,
    });
  }
  
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
