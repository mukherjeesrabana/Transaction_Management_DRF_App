import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Box, Button, Modal, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Unauthorized({ openstate, content, onLogin }) {
  const navigate = useNavigate();
  return (
    <Modal
      open={openstate}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Seems like your session expired. Please Login to continue
        </Typography>
        <Button variant="text" onClick={onLogin}>
          Login
        </Button>
      </Box>
    </Modal>
  );
}

// Add PropTypes validation
Unauthorized.propTypes = {
  openstate: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
  onLogin: PropTypes.func,
};
