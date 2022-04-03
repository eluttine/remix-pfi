import React from "react";

type Props = {
  show: boolean;
  // close: React.Dispatch<React.SetStateAction<boolean>>;
  close: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function RaceModal(props: Props) {
  console.log("props", props);

  const classes = props.show ? "modal is-active" : "modal";

  return (
    <>
      {props.show ? (
        <div className={props.show ? "modal is-active" : "modal"}>
          <div className="modal-background"></div>
          <div className="modal-content">
            <p className="image is-4by3">
              <img
                src="https://bulma.io/images/placeholders/1280x960.png"
                alt=""
              />
            </p>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={props.close()}
          ></button>
        </div>
      ) : null}
    </>
  );
}

export default RaceModal;
