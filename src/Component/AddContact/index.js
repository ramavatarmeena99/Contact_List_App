import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { contactDataAction, editDataAction } from "../../Redux/action";
import Style from "./index.module.css";
export default function AddContact() {
  const { data, dataForEdit } = useSelector((state) => state.countactReducer);

  const [name, setName] = useState();
  const [number, setNumber] = useState();
  const [email, setEmail] = useState();
  const [alertMessege, setAlertMessege] = useState(null);
  const [show, setShow] = useState(true);

  const add = () => {
    setShow(false);
  };
  const dispatch = useDispatch();
  const enterName = (e) => {
    setName(e.target.value);
  };
  const mobileNumber = (e) => {
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

    if (isAlreadyExistContactNumber.length > 0) {
      alert("Alreday Exists!");
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
        <div
          style={{
            width: "100%",
            height: "20vh",

            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <button
            style={{
              width: "10%",
              height: "40px",
              fontSize: "15px",
              marginRight: "20px",
              cursor: "pointer",
              borderRadius: "5px",
              border: "1px solid black",
              fontWeight: "600",
            }}
            onClick={add}
          >
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
          ></input>
          <input
            onChange={mobileNumber}
            value={number}
            className={Style.inputFiled}
            type="number"
            placeholder="Enter Mobile Number"
          ></input>
          <input
            onChange={emailId}
            value={email}
            className={Style.inputFiled}
            type="email"
            placeholder="Enter E-Mail "
          ></input>
          <div className={Style.alert}>
            {alertMessege ? <h3>*Please Fill In All Fields*</h3> : null}
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
