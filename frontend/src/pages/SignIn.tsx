import { useState, type FormEvent } from "react";
import { Box, Button, Card, CardContent, TextField, Typography} from "@mui/material";
import "./Page.css"

const PRIMARY_COLOR = "#5f5a47";

const SignIn = () => {
  const [name, setName] = useState("");

  const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const res = await fetch("http://localhost:5000/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name,
      })
    });

    if(!res.ok) {
      alert("Login failed. Please try again.")
    }
    
    const data = await res.json()
    console.log(data.message)
    console.log(document.cookie)

    window.location.href = "/KForum/forum"
  };

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" px={30} className ="sign-in">
      <Box>
        <Typography variant="h3" fontWeight="bold" color={PRIMARY_COLOR} mb={2}>
          KForum
        </Typography>
        <Typography variant="h6" fontSize={25} maxWidth="80%" className = "description">
          KForum connects people worldwide through open discussions and shared knowledge.
        </Typography>
      </Box>

      <Card sx={{width: 500, boxShadow: 3, borderRadius: 2}} className="input-card">
        <CardContent>
          <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3} color={PRIMARY_COLOR}>
            Welcome!
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField fullWidth label="Your name" value={name} autoFocus className="form-field"
              onChange={(e) => setName(e.target.value)}
            />
            <Button fullWidth type="submit" variant="contained" className="submit-button"
              disabled={!name.trim()}
            >
              Continue
            </Button>
          </Box>   
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignIn;
