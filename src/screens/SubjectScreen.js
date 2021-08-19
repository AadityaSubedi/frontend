import React, { useState } from 'react';
// using ES6 modules
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';


function SubjectScreen() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <p>Page {pageNumber} of {numPages}</p>
      <Document
        file="/files/maths.pdf" // hardcoded just for testing 
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
    </div>
  );
}


export default SubjectScreen