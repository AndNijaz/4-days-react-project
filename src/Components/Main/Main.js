import { doc, getDocs, updateDoc } from "firebase/firestore";
import "../../index.css";
import { db } from "../../firebase";
import { colRef } from "../../firebase";

import Button from "../Button/Button";
import { useRef, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Main({ children, user, onLogout, setError }) {
  const navigate = useNavigate();
  const depositRef = useRef();
  const sendTo = useRef();
  const moneySendTo = useRef();
  const [timer, setTimer] = useState(300);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          clearInterval(intervalId);
          onLogout();

          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const requestLoan = async (e) => {
    e.preventDefault();
    const funds = depositRef.current.value;
    if (funds <= 0) {
      setError("You can't send 0 funds");
      return;
    }
    user.movements.push({
      value: funds,
      date: new Date().toISOString(),
    });

    let docID = false;

    await getDocs(colRef)
      .then((snapshot) => {
        snapshot.docs.some((doc) => {
          docID = doc.data().email === user.email ? doc.id : false;
          if (docID) return true;
        });
      })
      .catch((err) => console.log(err));

    if (!docID) return;

    const docRef = doc(db, "users", docID);

    updateDoc(docRef, {
      ...user,
    });
  };

  const transferMoney = async (e) => {
    e.preventDefault();
    const funds = moneySendTo.current.value;

    let senderDocID = false;
    let recieverDocID = false;
    let reciever = {};

    await getDocs(colRef)
      .then((snapshot) => {
        snapshot.docs.some((doc) => {
          if (!senderDocID) {
            senderDocID = doc.data().email === user.email ? doc.id : false;
            reciever = doc.data();
          }

          recieverDocID =
            doc.data().email === sendTo.current.value ? doc.id : false;
          if (senderDocID) return true;
        });
      })
      .catch((err) => console.log(err));

    if (!recieverDocID) {
      await getDocs(colRef)
        .then((snapshot) => {
          snapshot.docs.some((doc) => {
            recieverDocID =
              doc.data().email === sendTo.current.value ? doc.id : false;
            reciever = doc.data();
            if (recieverDocID) return true;
          });
        })
        .catch((err) => console.log(err));
    }

    if (!senderDocID) return;
    if (!recieverDocID) {
      setError("User does not exist");
      return;
    }
    if (funds <= 0) {
      setError("You can't send 0 funds");
      return;
    }

    user.movements.push({
      value: -funds,
      date: new Date().toISOString(),
    });

    const docRefSender = doc(db, "users", senderDocID);

    updateDoc(docRefSender, {
      ...user,
    });

    reciever.movements.push({
      value: funds,
      date: new Date().toISOString(),
    });

    const docRefReciever = doc(db, "users", recieverDocID);
    updateDoc(docRefReciever, {
      ...reciever,
    });
  };

  const handleUpdateProfile = () => {
    navigate("/update-profile");
  };

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  return (
    <main className="app">
      {children}
      <OperationForm type="transfer" heading="Transfer money">
        <OperationInput type="text" className="form__input--to" ref={sendTo} />
        <OperationInput
          type="number"
          className="form__input--amount"
          ref={moneySendTo}
        />
        <Button
          className="form__btn form__btn--transfer"
          onClick={transferMoney}
        >
          &rarr;
        </Button>
        <OperationLabel>Transfer to</OperationLabel>
        <OperationLabel>Amount</OperationLabel>
      </OperationForm>

      <OperationForm type="loan" heading="Request loan">
        <OperationInput
          //forwardRef={depositRef}
          ref={depositRef}
          type="number"
          className="form__input--loan-amount"
        ></OperationInput>
        <Button className="form__btn form__btn--close" onClick={requestLoan}>
          &rarr;
        </Button>
        <OperationLabel>Amount</OperationLabel>
      </OperationForm>

      <OperationForm type="close" heading="Update Profile or Log out">
        <OperationLabel>Update Profile</OperationLabel>
        <OperationLabel>Log Out</OperationLabel>
        <span></span>
        <Button
          className="form__btn form__btn--close"
          onClick={handleUpdateProfile}
        >
          {" "}
          &rarr;
        </Button>

        <Button className="form__btn form__btn--close" onClick={onLogout}>
          &rarr;
        </Button>
      </OperationForm>

      <p className="logout-timer">
        You will be logged out in <span className="timer">{formattedTime}</span>
      </p>
    </main>
  );
}

export default Main;

function OperationForm({ type, heading, children }) {
  return (
    <div className={`operation ${type ? `operation--${type}` : ""}`}>
      <h2>{heading}</h2>
      <form className={`form ${type ? `form--${type}` : ""}`}>{children}</form>
    </div>
  );
}

export { OperationForm };

function OperationLabel({ className = "", children }) {
  return <label className={`form__label ${className}`}>{children}</label>;
}

export { OperationLabel };

const OperationInput = forwardRef(({ type, className, maxLength }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={`form__input ${className}`}
      maxLength={maxLength}
    />
  );
});

export { OperationInput };
