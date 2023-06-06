import React from "react";

function Text({ innerText }: { innerText: string }) {
  return <span role="span">{innerText}</span>;
}

export default Text;
