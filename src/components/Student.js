import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container ,Paper,Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
     
    },
  },
}));

export default function Student() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    //const[name,setName]=useState('')
  //  const[address,setAddress]=useState('')
    const[username,setUsername]=useState('')
    const[password,setPassword]=useState('')
    const[students,setStudents]=useState([])
     const classes = useStyles();

  const handleClick=(e)=>{
    e.preventDefault()
    const student={username,password};
    console.log(student);
    fetch("http://localhost:8080/student/login",{
      method:"POST",
      headers:{"Content-Type":"text/plain"},  //application/json
      body:JSON.stringify(student)

  }).then(()=>{
    console.log(" Logged in Successfully..")
  })
}

useEffect(()=>{
  fetch("https://localhost:8080/student/getlogin")
  .then(res=>res.text())
  .then((result)=>{
    setStudents(result);
  }
)
},[])
  return (

    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"blue"}}><u>Login Page</u></h1>

    <form className={classes.root} noValidate autoComplete="off">
    
      <TextField id="outlined-basic" label="User Name" variant="outlined" fullWidth 
      value={username}
      onChange={(e)=>setUsername(e.target.value)}
      />
      <TextField id="outlined-basic" label="Enter Password" variant="outlined" fullWidth
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      />
      <Button variant="contained" color="secondary" onClick={handleClick}>
  Login 
</Button>
    </form>
   
    </Paper>
    <h1>Users</h1>

    <Paper elevation={3} style={paperStyle}>

      {students.map(student=>(
        <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={student.id}>
         Id:{student.id}<br/>
         Name:{student.name}<br/>
         Address:{student.address}
 
        </Paper>
      ))
}


    </Paper>



    </Container>
  );
}
