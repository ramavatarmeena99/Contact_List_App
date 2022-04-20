import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Style from "./index.module.css";
import { contactDataAction, editDataAction } from "../../Redux/action";

export default function ContactList() {
  const { data } = useSelector((state) => state.countactReducer);
  const dispatch = useDispatch();
  const deleteButton = (item) => {
    const remainingData = data.filter(
      (i) => parseInt(i.number) !== parseInt(item.number)
    );
    dispatch(contactDataAction(remainingData));
  };
  const editButton = (item) => {
    dispatch(editDataAction(item));
  };

  return (
    <div
      style={{
        width: "100%",
        height: "auto",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "70%",
          height: "auto",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className={Style.contactDetails}>
            <div className={Style.details}>
              <h1 className={Style.userDetails}> Name</h1>
            </div>
            <div className={Style.details}>
              <h1 className={Style.userDetails}> Number</h1>
            </div>
            <div className={Style.details}>
              <h1 className={Style.userDetails}>Email </h1>
            </div>

            <div className={Style.details}>
              <h1 className={Style.userDetails}>Action </h1>
            </div>
          </div>
        </div>
        {data.map((item) => {
          return (
            <div
              style={{
                width: "100%",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className={Style.contactMap}>
                <div className={Style.srNumber}>
                  <p> {item.name} </p>
                </div>
                <div className={Style.srNumber}>
                  <p> {item.number}</p>
                </div>
                <div className={Style.srNumber}>
                  <p>{item.email} </p>
                </div>
                <div className={Style.srNumber}>
                  <button
                    onClick={() => deleteButton(item)}
                    className={Style.dltButton}
                  >
                    DELETE
                  </button>
                  <button
                    onClick={() => editButton(item)}
                    className={Style.editButton}
                  >
                    EDIT
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
