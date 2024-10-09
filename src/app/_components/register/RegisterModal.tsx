import { sendRequest } from "@/app/_utils/server actions/request";
import { CloudUploadOutlined, SendOutlined } from "@mui/icons-material";
import {
  Stack,
  Box,
  Button,
  Modal,
  Dialog,
  DialogTitle,
  Link,
  DialogContent,
  DialogContentText,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";
import PatientLayout from "../layout/PatientLayout";
import RoleCardList from "./RoleCardList";
import Roles from "@/app/_enums/Roles";
import { sendNotification } from "@/app/_utils/server actions/notification";
import { ReceiverTypes } from "@/app/_enums/ReceiverTypes";
import { NotificationTypes } from "@/app/_enums/NotificationTypes";
import { toast } from "react-toastify";
import { FontWeightValues } from "@/app/_enums/FontWeightValues";

export default function RegisterModal({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const [uploadedFile, setUploadedFile] = useState<File | undefined>();
  const [selectedRole, setSelectedRole] = useState<Roles>(Roles.Practicante);
  const [sending, setSending] = useState(false);
  const [fileURL, setFileURL] = useState("");
  const { data: session } = useSession();
  const [helpOpen, setHelpOpen] = useState(false);
  const [formData, setFormData] = useState(new FormData());
  const user = session?.user;
  function handleSubmit() {
    console.log("Corre el submit");
    if (user) {
      setSending(true);
      toast
        .promise(sendRequest(formData, user, selectedRole), {
          pending: "Enviando solicitud...",
          success: "Solicitud enviada",
          error: "Ha ocurrido un error, por favor intenta nuevamente",
        })
        .then((request) => {
          const possibleRoles = [
            Roles.Administrador,
            Roles.Coordinador,
            Roles.Tutor,
          ];
          switch (request.requestedRole) {
            case Roles.Coordinador:
              possibleRoles.pop();
            case Roles.Tutor:
              possibleRoles.pop();
          }
          handleClose();
          possibleRoles.forEach((role) => {
            sendNotification(
              { type: ReceiverTypes.Role, id: role },
              `${user.firstName} ${user.lastName} está solicitando un cambio de rol a ${selectedRole}`,
              false,
              user.profilePicture,
              {
                notificationType: NotificationTypes.Request,
                clues: [request._id!],
              }
            );
          });
        })
        .finally(() => {
          setSending(false);
        });
    }
  }
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle fontWeight="bold">Cambio de Rol</DialogTitle>
      <Stack>
        <RoleCardList
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />
        {uploadedFile && (
          <div>
            <iframe src={fileURL} width="100%" height="500px" />
          </div>
        )}
        {/* <Box display="flex" justifyContent="space-evenly" sx={{ py: 5 }}>
          <Button
            component="label"
            variant="outlined"
            color="secondary"
            startIcon={<CloudUploadOutlined />}
            size="large"
            sx={{ fontWeight: FontWeightValues.Regular, width: "40%" }}
          >
            Subir documento soporte
            <form id="pruebaForm" action={handleSubmit}>
              <input
                name="document"
                type="file"
                hidden
                onChange={(e) => {
                  setUploadedFile(e.target.files?.[0]);
                  setFileURL(
                    e.target.files?.[0]
                      ? URL.createObjectURL(e.target.files?.[0])
                      : ""
                  );
                }}
                accept=".pdf"
              />
            </form>
          </Button>

          <Button
            color="secondary"
            disabled={!uploadedFile}
            startIcon={<SendOutlined />}
            sx={{ width: "40%", fontWeight: FontWeightValues.Regular }}
            size="large"
            type="submit"
            form="pruebaForm"
          >
            Enviar solicitud
          </Button>
        </Box>
        <Link
          component="button"
          variant="body2"
          color="secondary"
          underline="always"
          onClick={() => setHelpOpen(true)}
        >
          ¿Qué documento debo subir?
        </Link> */}
        <Grid container columnSpacing={2} p={3}>
          <Grid item xs={6}>
            <Button
              fullWidth
              component="label"
              variant="outlined"
              color="secondary"
              startIcon={<CloudUploadOutlined />}
              size="large"
              sx={{ fontWeight: FontWeightValues.Regular }}
            >
              Subir documento soporte
              <form id="pruebaForm">
                <input
                  name="document"
                  type="file"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setUploadedFile(file);
                      setFileURL(file ? URL.createObjectURL(file) : "");
                      const data = new FormData();
                      data.set("document", file);
                      setFormData(data);
                    }
                  }}
                  accept=".pdf"
                />
              </form>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              color="secondary"
              fullWidth
              disabled={!uploadedFile || sending}
              startIcon={<SendOutlined />}
              sx={{ fontWeight: FontWeightValues.Regular }}
              size="large"
              type="submit"
              form="pruebaForm"
              onClick={() => {
                handleSubmit();
              }}
            >
              Enviar solicitud
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Link
              component="button"
              variant="body2"
              color="secondary"
              underline="always"
              sx={{ width: "100%" }}
              onClick={() => setHelpOpen(true)}
            >
              ¿Qué documento debo subir?
            </Link>
          </Grid>
        </Grid>
        <Dialog open={helpOpen} onClose={() => setHelpOpen(false)}>
          <DialogContent>
            {/* <DialogContentText> */}
            El documento a subir, en formato pdf, depende del rol que se esté
            solicitando: <br />
            <ul>
              <li>
                Practicante: El tabulado de todos los semestres cursados junto
                con sus respectivas calificaciones y promedio acumulado. Se
                puede descargar desde el SIRA
              </li>
              <li>Tutor: Tarjeta Profesional de Psicólogo</li>
              <li>Coordinador: Tarjeta Profesional de Psicólogo</li>
            </ul>
            {/* </DialogContentText> */}
          </DialogContent>
        </Dialog>
      </Stack>
    </Dialog>
  );
}
