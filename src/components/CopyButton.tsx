import React, { useState } from "react";

export default function CopyButton({text, clickedText, copyText} : {text:string, clickedText:string, copyText:string}) {
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
        type='button'
        onClick={copyToClipboard}
        className={
            "pill-button bg-gray-400 text-white border-gray-500 transition-width duration-300"
        }
      >
        {copied ? clickedText : text}
      </button>
  );
}

