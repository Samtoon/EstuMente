import { getUserById } from "@/app/_database/daos/userDao";
import { RequestStates } from "@/app/_enums/RequestStates";
import { IRequest } from "@/app/_interfaces/IRequest";
import IUser from "@/app/_interfaces/IUser";
import { FILES } from "@/app/_utils/endpoints";
import { answerRequest } from "@/app/_utils/server actions/request";
import { fetchUserById } from "@/app/_utils/server actions/user";
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  Divider,
  Grid,
  List,
  Skeleton,
  TextField,
} from "@mui/material";
import Link from "next/link";
import { MouseEvent, useEffect, useState } from "react";
<<<<<<< HEAD
import { toast } from "react-toastify";
=======
>>>>>>> 8eea2ccdbe020cb45315b20374ed9dc1acc12758

interface Props {
  open: boolean;
  handleClose: () => void;
  requestList: IRequest[];
  index: number;
  user: IUser | null;
  documentSrc: string;
  loading: boolean;
}

export default function RequestModal({
  open,
  handleClose,
  requestList,
  index,
  user,
  documentSrc,
  loading,
}: Props) {
  function RequestField({
    field,
    value,
    skeleton,
  }: {
    field: string;
    value?: string | JSX.Element;
    skeleton?: JSX.Element;
  }) {
    return (
      <>
        <Grid item xs={5}>
          {field}
        </Grid>
        <Grid item xs={6}>
          {loading ? skeleton || <Skeleton /> : value}
        </Grid>
      </>
    );
  }
  // const [user, setUser] = useState<IUser | null>(null);
  // const [documentSrc, setDocumentSrc] = useState("");
  // const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
<<<<<<< HEAD

  function handleClick(state: RequestStates) {
    toast
      .promise(answerRequest(requestList[index], state, user!, comment), {
        pending: "Procesando...",
        success: "Solicitud resuelta con éxito",
        error: "Ha ocurrido un error, por favor inténtalo nuevamente",
      })
      .then(() => {
        console.log("Solicitud respondida con éxito");
        requestList.splice(index, 1);
        handleClose();
      });
=======
  // useEffect(() => {
  //     console.log("useEffect infinito?");
  //     if (index !== -1) {
  //         URL.revokeObjectURL(documentSrc);
  //     setLoading(true);
  //     Promise.all([
  //         fetchUserById(requestList[index].user)
  //             .then((foundUser) => setUser(foundUser)),
  //         fetch(process.env.NEXT_PUBLIC_BASE_URL + FILES + "/" + requestList[index].supportingDocumentId)
  //             .then((response) => {
  //                 console.log(response);
  //                 return response.blob();
  //             })
  //             .then((blob) => {
  //                 const url = URL.createObjectURL(blob);
  //                 console.log("La url es:", url);
  //                 setDocumentSrc(url);
  //             })
  //             .catch((error) => console.log(error)),
  //     ])
  //         .then(() => setLoading(false));
  //     }
  // }, [requestList, index, setUser, documentSrc, setDocumentSrc]);
  function handleClick(state: RequestStates) {
    answerRequest(requestList[index], state, user!, comment).then(() => {
      console.log("Solicitud respondida con éxito");
      requestList.splice(index, 1);
      handleClose();
    });
>>>>>>> 8eea2ccdbe020cb45315b20374ed9dc1acc12758
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle fontWeight="bold">Solicitud</DialogTitle>
      <Grid container px={3} spacing={1} columns={12} pb={3}>
        <RequestField
          field="Foto de perfil:"
          value={
            <Avatar
              src={user?.profilePicture}
              slotProps={{ img: { referrerPolicy: "no-referrer" } }}
              sx={{ width: 90, height: 90 }}
              variant="square"
            />
          }
          skeleton={<Skeleton variant="rectangular" width={90} height={90} />}
        />
        <RequestField field="Nombres:" value={requestList[index]?.firstName} />
        <RequestField field="Apellidos:" value={requestList[index]?.lastName} />
        <RequestField field="Correo electrónico:" value={user?.email} />
        <RequestField
          field="Rol solicitado:"
          value={requestList[index]?.requestedRole}
        />
        <RequestField
          field="Fecha solicitud:"
          value={requestList[index]?.createdAt?.toString()}
        />
        <RequestField
          field="Documento Soporte:"
          value={
            <Link target="_blank" href={documentSrc}>
              <Button color="secondary">Ver</Button>
            </Link>
          }
          skeleton={
            <Button color="secondary" disabled>
              Ver
            </Button>
          }
        />
        <Grid item xs={12}>
          <Divider id="divisor" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Comentarios"
            multiline
            minRows={3}
            fullWidth
            onChange={(e) => setComment(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            size="large"
            fullWidth
            color="success"
            onClick={() => handleClick(RequestStates.Aprobado)}
            disabled={loading}
          >
            Aprobar
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            size="large"
            fullWidth
            color="error"
            onClick={() => handleClick(RequestStates.Rechazado)}
            disabled={loading}
          >
            Rechazar
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button size="large" fullWidth onClick={handleClose}>
            Cancelar
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
}
