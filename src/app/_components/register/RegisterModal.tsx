import { sendRequest } from "@/app/_utils/server actions/request";
import { CloudUploadOutlined, SendOutlined } from "@mui/icons-material";
import { Stack, Box, Button, Modal, Dialog, DialogTitle } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";
import PatientLayout from "../layout/PatientLayout";
import RoleCardList from "./RoleCardList";
import Roles from "@/app/_enums/Roles";
import { sendNotification } from "@/app/_utils/server actions/notification";
import { ReceiverTypes } from "@/app/_enums/ReceiverTypes";
import { NotificationTypes } from "@/app/_enums/NotificationTypes";

export default function RegisterModal({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const [uploadedFile, setUploadedFile] = useState<File | undefined>();
  const [selectedRole, setSelectedRole] = useState<Roles>(Roles.Practicante);
  const [fileURL, setFileURL] = useState("");
  const { data: session } = useSession();
  const user = session?.user;
  function handleSubmit(formData: FormData) {
    if (user) {
      sendRequest(formData, user, selectedRole).then((request) => {
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
        handleClose();
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
        <Box display="flex" justifyContent="space-evenly" sx={{ py: 5 }}>
          <Button
            component="label"
            variant="outlined"
            color="secondary"
            startIcon={<CloudUploadOutlined />}
            sx={{ width: "40%" }}
            size="large"
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
            sx={{ width: "40%" }}
            size="large"
            type="submit"
            form="pruebaForm"
          >
            Enviar solicitud
          </Button>
        </Box>
      </Stack>
    </Dialog>
  );
}
