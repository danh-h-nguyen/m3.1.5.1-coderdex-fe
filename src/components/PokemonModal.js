import Box from "@mui/material/Box";
import { FormProvider, FTextField } from "./form";
import Modal from "@mui/material/Modal";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { alpha, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { addPokemon } from "../features/pokemons/pokemonSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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

const defaultValues = {
  name: "",
  id: "",
  url: "",
  type1: "",
  type2: "",
};

export default function PokemonModal({ open, setOpen }) {
  const navigate = useNavigate();
  const methods = useForm(defaultValues);
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const dispatch = useDispatch();

  // State lưu thông tin lỗi
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (data) => {
    const { name, id, url, type1, type2 } = data;

    // Xử lý submit và dispatch
    dispatch(addPokemon({ name, id, imgUrl: url, types: [type1, type2] }))
      .unwrap()
      .then(() => {
        setErrorMessage("");
        navigate(`/pokemons/${id}`);
      })
      .catch((error) => {
        // Lưu thông tin lỗi vào state để hiển thị dưới form
        setErrorMessage(error.message);
      });
  };

  //   const onSubmit = (data) => {
  //     const { name, id, url, type1, type2 } = data;
  //     dispatch(addPokemon({ name, id, imgUrl: url, types: [type1, type2] })).then(
  //       (response) => {
  //         const newPokemonId = response.data[0].id;
  //         navigate(`/pokemons/${newPokemonId}`);
  //       }
  //     );
  //   };

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <FTextField
                name="name"
                fullWidth
                rows={4}
                placeholder="Name"
                sx={{
                  "& fieldset": {
                    borderWidth: `1px !important`,
                    borderColor: alpha("#919EAB", 0.32),
                  },
                }}
              />

              <FTextField
                name="id"
                fullWidth
                rows={4}
                placeholder="Id"
                sx={{
                  "& fieldset": {
                    borderWidth: `1px !important`,
                    borderColor: alpha("#919EAB", 0.32),
                  },
                }}
              />

              <FTextField
                name="url"
                fullWidth
                // rows={4}
                placeholder="Image Url"
                sx={{
                  "& fieldset": {
                    borderWidth: `1px !important`,
                    borderColor: alpha("#919EAB", 0.32),
                  },
                }}
              />

              <FTextField
                name="type1"
                fullWidth
                rows={4}
                placeholder="Type 1"
                sx={{
                  "& fieldset": {
                    borderWidth: `1px !important`,
                    borderColor: alpha("#919EAB", 0.32),
                  },
                }}
              />

              <FTextField
                name="type2"
                fullWidth
                rows={4}
                placeholder="Type 2"
                sx={{
                  "& fieldset": {
                    borderWidth: `1px !important`,
                    borderColor: alpha("#919EAB", 0.32),
                  },
                }}
              />

              {/* Hiển thị thông báo lỗi nếu có */}
              {errorMessage && (
                <Box sx={{ mt: 2, color: "red", fontSize: "14px" }}>
                  <Typography variant="body2">{errorMessage}</Typography>
                </Box>
              )}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <LoadingButton
                  type="submit"
                  variant="contained"
                  size="small"
                  loading={
                    isSubmitting
                    // || isLoading
                  }
                >
                  Create Pokemon
                </LoadingButton>
              </Box>
            </Stack>
          </FormProvider>
        </Box>
      </Modal>
    </div>
  );
}
