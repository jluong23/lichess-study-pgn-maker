import React, { useState } from "react";

interface Props {
  text:string // the initial text on the button
  clickedText:string // the text to show on click
  copyText:string //the text copied to clipboard

}

export default function CopyButton({text, clickedText, copyText} : Props) {
  const [copied, setCopied] = useState(false);
  

  const copyToClipboard = () => {
    navigator.clipboard.writeText(copyText).then(
      () => {
        setCopied(true);
        // changing back to default state after 2 seconds.
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      },
      (err) => {
        console.log("failed to copy", err.mesage);
      }
    );
  };

  return (
      <button
        type= {'button'}
        onClick={copyToClipboard}
        className={
            "pill-button bg-gray-400 text-white border-gray-500 transition-width duration-300"
        }
      >
        {copied ? clickedText : text}
      </button>
  );
}

