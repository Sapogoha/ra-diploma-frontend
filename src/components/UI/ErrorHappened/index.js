import React from 'react';

function ErrorHappened(props) {
  return (
    <>
      <div className="alert alert-warning text-center" role="alert">
        {props.message}
      </div>
      <button className="btn btn-outline-primary" onClick={props.onClick}>
        {props.children}
      </button>
    </>
  );
}

export default ErrorHappened;
