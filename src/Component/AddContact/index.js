import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { contactDataAction, editDataAction } from "../../Redux/action";
import Style from "./index.module.css";
import validator from "validator";

export default function AddContact() {
  const { data, dataForEdit } = useSelector((state) => state.countactReducer);

  const [name, setName] = useState();
  const [number, setNumber] = useState();
  const [email, setEmail] = useState();
  const [alertMessege, setAlertMessege] = useState(null);
  const [alertMessegeForEmail, setAlertMessegeForEmail] = useState(null);
  const [alertMessegeForMobileNumber, setAlertMessegeForMobileNumber] =
    useState(null);

  const [show, setShow] = useState(true);
  const [emailError, setEmailError] = useState("");

  const add = () => {
    setShow(false);
  };
  const dispatch = useDispatch();
  const enterName = (e) => {
    setName(e.target.value);
  };
  const mobileNumberHanlder = (e) => {
    setNumber(e.target.value);
  };
  const emailId = (e) => {
    setEmail(e.target.value);
  };

  const isAlreadyExistContactNumber = data.filter(
    (item) => parseInt(item.number) === parseInt(number)
  );

  const addContact = () => {
    if (!number || !name || !email) {
      setAlertMessege(true);
      setTimeout(() => {
        setAlertMessege(false);
      }, 2000);
      return () => {
        clearTimeout(setAlertMessege);
      };
    }

    if (isAlreadyExistContactNumber.length > 0) {
      alert("Alreday Exists!");
      return;
    }
    if (validator.isEmail(email)) {
      setEmailError(setAlertMessegeForEmail(false));
    } else {
      setEmailError(setAlertMessegeForEmail(true));
      setAlertMessegeForEmail(true);
      setTimeout(() => {
        setAlertMessegeForEmail(false);
      }, 2000);
      return () => {
        clearTimeout(setAlertMessegeForEmail);
      };
    }
    if (number.length >= 11 || number.length < 10) {
      setNumber(setAlertMessegeForMobileNumber(false));
      setAlertMessegeForMobileNumber(true);
      setTimeout(() => {
        setAlertMessegeForMobileNumber(false);
      }, 2000);
      return () => {
        clearTimeout(setAlertMessegeForMobileNumber);
      };
    }
    const addNewData = {
      name,
      email,
      number,
    };
    dispatch(contactDataAction([...data, addNewData]));
    setEmail("");
    setName("");
    setNumber("");
    setShow(true);
  };
  const editContact = () => {
    setShow(true);
    const index = data.findIndex(
      (i) =>
        parseInt(i.number || i.name || i.email) ===
        parseInt(dataForEdit.number || dataForEdit.name || dataForEdit.email)
    );

    data[index].number = number;
    data[index].email = email;
    data[index].name = name;

    if (dataForEdit.number.length < 10 || dataForEdit.number.length >= 11) {
      alert("Please Enter 10 Digit Number");
      setShow(false);
      return;
    }
    if (isAlreadyExistContactNumber.length > 0) {
      alert("Alreday Exists!");
      setShow(false);

      return;
    }
    dispatch(contactDataAction(data));
    dispatch(editDataAction({}));

    setEmail("");
    setName("");
    setNumber("");
  };
  useEffect(() => {
    setName(dataForEdit.name);
    setNumber(dataForEdit.number);
    setEmail(dataForEdit.email);
    if (dataForEdit.number) {
      setShow(false);
    }
  }, [dataForEdit]);
  return (
    // <>
    //   <button >ram</button>
    // </>
    <>
      {show ? (
        <div className={Style.addContactForNew}>
          <button className={Style.addContactBtn} onClick={add}>
            Add Contact
          </button>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "40vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input
            onChange={enterName}
            value={name}
            className={Style.inputFiled}
            type="text"
            placeholder="Enter Your Name"
          />
          <input
            onChange={mobileNumberHanlder}
            value={number}
            className={Style.inputFiled}
            type="number"
            placeholder="Enter 10 Digit Mobile Number"
          />
          <input
            onChange={emailId}
            value={email}
            className={Style.inputFiled}
            type="email"
            placeholder="Enter E-Mail "
          ></input>
          <span
            style={{
              fontWeight: "bold",
              color: "red",
            }}
          >
            {emailError}
          </span>
          <div className={Style.alert}>
            {alertMessege ? <h3>*Please Fill In All Fields*</h3> : null}
            {alertMessegeForEmail ? (
              <h3>*Please Enter Valid EMail Id*</h3>
            ) : null}
            {alertMessegeForMobileNumber ? (
              <h3>*Please Enter 10 Digit Mobile Number*</h3>
            ) : null}
          </div>
          <button
            onClick={dataForEdit.number ? editContact : addContact}
            className={Style.addButton}
          >
            {dataForEdit.number ? "Update Profile" : "Add Contact"}
          </button>
        </div>
      )}
    </>
  );
}
