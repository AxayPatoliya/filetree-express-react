import React, { useEffect, useState } from "react";

function FileTree({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const openUrl = (url) => {
    window.open(url, "_blank"); // Open URL in a new tab
  };

  return (
    <div>
      <div onClick={toggleOpen} style={{ cursor: "pointer" }}>
        {data.isDirectory ? (
          <span>{isOpen ? "[-] " : "[+] "}</span>
        ) : (
          <span>&nbsp;&nbsp;&nbsp;</span>
        )}
        <span onClick={() => openUrl(data.url)} style={{ color: "blue", textDecoration: "underline" }}>
          {data.name}
        </span>
      </div>
      {isOpen && data.contents && (
        <div style={{ marginLeft: "20px" }}>
          {data.contents.map((item, index) => (
            <FileTree key={index} data={item} />
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  const [fileTree, setFileTree] = useState([]);

  useEffect(() => {
    // Fetch file tree data from your API (e.g., /getFiles)
    fetch("http://localhost:4000/getFiles")
      .then((response) => response.json())
      .then((data) => {
        setFileTree(data);
      })
      .catch((error) => {
        console.error("Error fetching file tree:", error);
      });
  }, []);

  return (
    <div>
      <h1>File and Directory Tree</h1>
      {fileTree.map((item, index) => (
        <FileTree key={index} data={item} />
      ))}
    </div>
  );
}

export default App;
