// import React, { useState } from "react";
// import Form from "react-bootstrap/Form";
// import { useHistory } from "react-router-dom";
// // import LoaderButton from "../components/LoaderButton";
// // import { useAppContext } from "../libs/contextLib";
// // import { useFormFields } from "../libs/hooksLib";
// // import { onError } from "../libs/errorLib";
// // import "./Signup.css";

// export default function Signup() {
//   const [fields, handleFieldChange] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//     confirmationCode: "",
//   });
//   const history = useHistory();
//   const [newUser, setNewUser] = useState(null);
//   // const { userHasAuthenticated } = useAppContext();
//   const [isLoading, setIsLoading] = useState(false);

//   function validateForm() {
//     return (
//       fields.email.length > 0 &&
//       fields.password.length > 0 &&
//       fields.password === fields.confirmPassword
//     );
//   }

//   function validateConfirmationForm() {
//     return fields.confirmationCode.length > 0;
//   }

//   async function handleSubmit(event) {
//     event.preventDefault();
//   }

//   async function handleConfirmationSubmit(event) {
//     event.preventDefault();
//     setIsLoading(true);
//   }

//   function renderConfirmationForm() {
//     return (
//       <Form onSubmit={handleConfirmationSubmit}>
//         <Form.Group controlId="confirmationCode" size="lg">
//           <Form.Label>Confirmation Code</Form.Label>
//           <Form.Control
//             autoFocus
//             type="tel"
//             onChange={handleFieldChange}
//             value={fields.confirmationCode}
//           />
//           <Form.Text muted>Please check your email for the code.</Form.Text>
//         </Form.Group>
//         <LoaderButton
//           block
//           size="lg"
//           type="submit"
//           variant="success"
//           isLoading={isLoading}
//           disabled={!validateConfirmationForm()}
//         >
//           Verify
//         </LoaderButton>
//       </Form>
//     );
//   }

//   function renderForm() {
//     return (
//       <Form onSubmit={handleSubmit}>
//         <Form.Group controlId="email" size="lg">
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             autoFocus
//             type="email"
//             value={email}
//             onChange={handleFieldChange}
//           />
//         </Form.Group>
//         <Form.Group controlId="password" size="lg">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             value={fields.password}
//             onChange={handleFieldChange}
//           />
//         </Form.Group>
//         <Form.Group controlId="confirmPassword" size="lg">
//           <Form.Label>Confirm Password</Form.Label>
//           <Form.Control
//             type="password"
//             onChange={handleFieldChange}
//             value={fields.confirmPassword}
//           />
//         </Form.Group>
//         <LoaderButton
//           block
//           size="lg"
//           type="submit"
//           variant="success"
//           isLoading={isLoading}
//           disabled={!validateForm()}
//         >
//           Signup
//         </LoaderButton>
//       </Form>
//     );
//   }

//   return (
//     <div className="Signup">
//       {newUser === null ? renderForm() : renderConfirmationForm()}
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";

// import { Link } from "react-router-dom";
// import { Form, Button, Row, Col } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../../actions/userActions";

// import Loader from "../../components/Loader";
// import Message from "../../components/Message";
// import FormContainer from "../../components/FormContainer";

// function LoginScreen({location, history}) {
//   const [username, setUsername] = useState("");

//   const [password, setPassword] = useState("");
// const dispatch = useDispatch() 
//   const redirect = location.search ? location.search.split("=")[1] : "/"
//   const userLogin  = useSelector(state => state.userLogin)
//   const {error, loading, userInfo} = userLogin  
  
//   useEffect(()=>{
    
//     if (userInfo){
//     history.push(redirect)
// }


// },[history, userInfo, redirect])


//   const submitHandler = (e)=>{
//       e.preventDefault()
//       dispatch(login(username,password))
//   }
//   return (
//     <FormContainer>
//       <h1>Sign In</h1>
//       {error && <Message variant = 'danger'>{error}</Message>}
//       {loading && <Loader/>}
//       <Form onSubmit={handleSubmit}>
//         <Form.Group controlId="email" size="lg">
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             autoFocus
//             type="email"
//             value={fields.email}
//             onChange={handleFieldChange}
//           />
//         </Form.Group>
//         <Form.Group controlId="password" size="lg">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             value={fields.password}
//             onChange={handleFieldChange}
//           />
//         </Form.Group>
//         <Form.Group controlId="confirmPassword" size="lg">
//           <Form.Label>Confirm Password</Form.Label>
//           <Form.Control
//             type="password"
//             onChange={handleFieldChange}
//             value={fields.confirmPassword}
//           />
//         </Form.Group>
//         <LoaderButton
//           block
//           size="lg"
//           type="submit"
//           variant="success"
//           isLoading={isLoading}
//           disabled={!validateForm()}
//         >
//           Signup
//         </LoaderButton>
//       </Form>

//     <Row className ="py-3">
//         <Col>

//         New User ? 
//         <Link
//         to = {redirect? `/register?redirect=${redirect}`: '/register'}>
//         Register
//         </Link>
//         </Col>
//     </Row>

//     </FormContainer>
//   );
// }

// export default LoginScreen;
