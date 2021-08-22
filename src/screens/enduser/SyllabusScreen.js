import React, { useState } from 'react';
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Row } from "react-bootstrap";
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';


function SyllabusScreen({}) {

  pdfjs.GlobalWorkerOptions.workerSrc = 
    `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  
  const [pages, setPages] = useState([]);
  const { code, batch} = useParams();
  const location = useLocation();
  const syllabus = location.state.syllabus;

  function onDocumentLoadSuccess({ pdfDoc }) {
    setPages([...Array(pdfDoc._pdfInfo.numPages).keys()]);
  }

  return (
    <div>
      <Row><h3>{code} - {batch}</h3></Row>
      <Row><h5>Theory marks : {syllabus.theory}</h5></Row>
      <Row><h5>Practical marks : {syllabus.practical}</h5></Row>
      <Row><h5>Teaching hours : {syllabus.teaching}</h5></Row>
      <Document
        file={syllabus.filename} // hardcoded just for testing 
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {pages.map((page)=>
          <Page key={page} pageNumber={page+1} width={850} size="A3" />
        )}
      </Document>
    </div>
  );
}

export default SyllabusScreen