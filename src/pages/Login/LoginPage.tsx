import { useState, useRef } from "react";
import PinInput from "react-pin-input";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useAppDispatch } from "../app/hook";

import { userListActions } from "../../store/users";

const INVALID_INPUT_STYLE = {
  border: "none",
  borderBottom: "1px solid red",
  color: "white",
  fontWeight: "500",
  fontSize: "24px",
};
const COMMON_INPUT_STYLE = {
  border: "none",
  borderBottom: "1px solid white",
  color: "white",
  fontWeight: "500",
  fontSize: "24px",
};

const defaultStyle = {
  transition: `opacity 300ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
  unmounted: { opacity: 0 },
};

const LoginPage = () => {
  const nodeRef = useRef(null);
  const navigate = useNavigate();
  const [pinCode, setPinCode] = useState("");
  const [isValidPinCode, setIsValidPinCode] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [inProp, setInProp] = useState(true);

  const dispatch = useAppDispatch();

  const isChangedHandler = () => {
    setIsChanged(true);
    setIsValidPinCode(true);
  };

  const pinCodeCompleteHandler = async (value: string) => {
    setPinCode(value);
    // fetch the data and valitate this pin code.
    const result = await fetch("http://localhost:8080/project/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: pinCode,
      }),
    });

    if (value === "000000") {
      setIsValidPinCode(true);
      setInProp(false);
      setTimeout(() => {
        navigate("/admin");
      }, 500);
      return;
    }

    if (result.status === 200) {
      const data = (await result.json()) as {
        users: { name: string; job: string; _id: string }[];
      };
      console.log(data.users);
      const updatedUsers = data.users.map((user) => {
        return { name: user.name, job: user.job, isLoged: false };
      });
      dispatch(userListActions.setUserList({ userList: updatedUsers }));
      setIsValidPinCode(true);
      setInProp(false);
      setTimeout(() => {
        navigate("/user");
      }, 500);
    } else {
      setIsValidPinCode(false);
    }
  };

  const inputStyle =
    !isValidPinCode && isChanged ? INVALID_INPUT_STYLE : COMMON_INPUT_STYLE;

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={inProp}
      timeout={500}
      unmountOnExit={false}
    >
      {(state) => (
        <div
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
          ref={nodeRef}
          className={
            !isValidPinCode && isChanged
              ? styles["login-invalid"]
              : styles.login
          }
        >
          <PinInput
            length={6}
            secret
            secretDelay={100}
            focus={true}
            onComplete={pinCodeCompleteHandler}
            inputStyle={inputStyle}
            onChange={isChangedHandler}
          />
          <div className={styles.validation}></div>
        </div>
      )}
    </CSSTransition>
  );
};

export default LoginPage;
