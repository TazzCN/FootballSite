import { Add, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Modal,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { generateClient } from "aws-amplify/data";
import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import type { Schema } from "../../amplify/data/resource";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const columns: GridColDef<Schema["Player"]["type"]>[] = [
  {
    field: "firstName",
    headerName: "First name",
  },
  {
    field: "lastName",
    headerName: "Last name",
  },
  {
    field: "position",
    headerName: "Position",
  },
  {
    field: "delete",
    type: "actions",
    headerName: " Delete",
    width: 100,
    getActions: ({ id }) => {
      return [
        <Button
          key={id}
          onClick={() => {
            client.models.Player.delete({ id: id as string });
          }}
        >
          <Delete />
        </Button>,
      ];
    },
  },
];

const client = generateClient<Schema>();

const AddPlayer = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    position: "",
  });

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    client.models.Player.create({
      firstName: formData.firstName,
      lastName: formData.lastName,
      position: formData.position,
    });
    handleClose();
  };

  const [players, setPlayers] = useState<Schema["Player"]["type"][]>([]);

  useEffect(() => {
    client.models.Player.observeQuery().subscribe({
      next: (data) => {
        setPlayers([...data.items]);
        setLoading(false);
      },
    });
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      firstName: "",
      lastName: "",
      position: "",
    });
  };

  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography variant="h5">Players</Typography>
        <Button
          onClick={handleOpen}
          variant="contained"
          color="primary"
          startIcon={<Add />}
        >
          Add Player
        </Button>
      </Box>
      <Box paddingTop={2}>
        <DataGrid columns={columns} rows={players} loading={loading} />
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6">Add Player</Typography>
          <Box
            component={"form"}
            onSubmit={handleSubmit}
            autoComplete="off"
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            gap={2}
            paddingTop={2}
          >
            <FormControl>
              <InputLabel htmlFor="firstName">First Name</InputLabel>
              <OutlinedInput
                id="firstName"
                aria-describedby="firstName"
                label={"First Name"}
                value={formData.firstName}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="lastName">Last Name</InputLabel>
              <OutlinedInput
                id="lastName"
                aria-describedby="lastName"
                label={"Last Name"}
                value={formData.lastName}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="position">Position</InputLabel>
              <OutlinedInput
                id="position"
                aria-describedby="position"
                label={"Position"}
                value={formData.position}
                onChange={handleChange}
              />
            </FormControl>
            <Box display={"flex"} gap={2}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
              <Button
                onClick={handleClose}
                variant="contained"
                color="secondary"
              >
                Close
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddPlayer;
