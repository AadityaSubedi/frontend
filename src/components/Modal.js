// import * as React from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import LoadingButton from '@mui/lab/LoadingButton';
// import {SendIcon, SaveIcon} from '@mui/icons-material/Send';
// import { Children, useState, useRef } from "react";
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import Box from '@mui/material/Box';


// export default function FormDialog({ show, handleClose, data }) {
//     const [progCode, setProgCode] = useState("");
//     const [subCode, setSubCode] = useState("");
//     const [subName, setSubName] = useState("");



//     return (

//         <div>
//             <Dialog open={show} onClose={handleClose}>
//                 <DialogTitle>{data.title}</DialogTitle>
//                 <DialogContent>
//                     <DialogContentText>
//                         Add subject code and program code it is offered by:
//                     </DialogContentText>
//                     <TextField
//                         autoFocus
//                         margin="dense"
//                         id="sub_code"
//                         label="subject code"
//                         type="text"
//                         variant="standard"
//                         value={subCode}
//                         onChange={(e) => { setSubCode(e.target.value) }}
//                         required
//                     />
//                     <TextField
//                         margin="dense"
//                         id="sub_name"
//                         label="subject name"
//                         type="text"
//                         variant="standard"
//                         value={subName}
//                         onChange={(e) => { setSubName(e.target.value) }}
//                         required
//                     />

//                 </DialogContent>

//                 <DialogActions>
//                     <Button variant="outlined" onClick={handleClose} >
//                         Cancel
//                     </Button>
// <LoadingButton
//     onClick={(e) => {

//         handleClose(subCode, progCode, subName)
//     }}
//     endIcon={<SendIcon/>}

//     loading={false}
//     loadingPosition="end"
//     variant="contained"
//     id="send"

// >
//     Post
// </LoadingButton>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// }



import {useEffect, useState, useSelector} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import { SendIcon, SaveIcon } from '@mui/icons-material/Send';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { useHistory } from "react-router-dom";
import axios from "axios"


export default function FormDialog({ show, handleClose, data }) {
    const [progCode, setProgCode] = useState("");
    const [subCode, setSubCode] = useState("");
    const [subName, setSubName] = useState("");
    const [programs, setPrograms] = useState([]);




    useEffect(() => {


          const fn = async () => {
            try {
              const { data } = await axios.get(`/api/programs`);
              // console.log(data);
              let programs = data["data"];
              console.log(data["data"])
              setPrograms(programs);
            } catch (error) {
                setPrograms([{ "code": "error" }]);
            }
          };
          fn();
        },[] )
    return (
        <div>

            <Dialog open={show} onClose={handleClose}>
                <DialogTitle>{data.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add subject code and program code it is offered by:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="sub_code"
                        label="subject code"
                        type="text"
                        variant="standard"
                        value={subCode}
                        onChange={(e) => { setSubCode(e.target.value) }}
                        required
                    />
                    <TextField
                        margin="dense"
                        id="sub_name"
                        label="subject name"
                        type="text"
                        variant="standard"
                        value={subName}
                        onChange={(e) => { setSubName(e.target.value) }}
                        required
                    />
                    <br/>
                    <br/>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Prog code</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={progCode}
                            label="progCode"
                            onChange={(e)=>setProgCode(e.target.value)}
                        >
                            {programs.map((program)=><MenuItem value={program.code}>{program.code}</MenuItem>)}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose} >
                        Cancel
                    </Button>
                    <Button variant="contained" color="success" onClick={() => { handleClose(subCode,progCode,subName) }}>
                        Post
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
