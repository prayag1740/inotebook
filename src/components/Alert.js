import React from "react";

export default function Alert() {
  return (
    <div className="alert alert-primary" role="alert">
     {props.message}
    </div>
  );
}
