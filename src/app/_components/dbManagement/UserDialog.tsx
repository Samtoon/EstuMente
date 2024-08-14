import { getAssignedUsersById } from "@/app/_database/daos/userDao";
import Roles from "@/app/_enums/Roles";
import IUser from "@/app/_interfaces/IUser";
import {
  fetchAssignedUsersById,
  fetchUserById,
  saveUserById,
} from "@/app/_utils/server actions/user";
import { Cancel, Check, Edit } from "@mui/icons-material";
import {
  Autocomplete,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import mongoose from "mongoose";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function UserDialog({
  index,
  users,
  open,
  handleClose,
}: {
  index?: number;
  users: IUser[];
  open: boolean;
  handleClose: () => void;
}) {
  console.log("Se recarga el dialog");
  // const [assignedUsers, setAssignedUsers] = useState<string[]>([]);
  // const [responsibleUser, setResponsibleUser] = useState<string>("");
  const dbUser = index === undefined ? index : users[index];
  const [editingAssignedUsers, setEditingAssignedUsers] = useState(false);
  const [editingResponsibleUser, setEditingResponsibleUser] = useState(false);
  const responsibleUserCounts: Record<string, number> = {};
  const indexedUsers = users.map((user, index) => {
    if (user.responsibleUser) {
      const key = user.responsibleUser.toString();
      if (!responsibleUserCounts[key]) responsibleUserCounts[key] = 0;
      responsibleUserCounts[key] += 1;
    }
    return { ...user, index };
  });
  const assignedUsers = indexedUsers
    .filter(
      (user) => user.responsibleUser?.toString() === dbUser?._id?.toString()
    )
    .map((user) => ({
      id: user._id,
      label: user.fullName,
      index: user.index,
    }));
  let newAssignedUsers: typeof assignedUsers;
  const baseResponsibleUser = indexedUsers.find(
    (user) => user._id === dbUser?.responsibleUser?.toString()
  );
  const responsibleUser = baseResponsibleUser && {
    id: baseResponsibleUser?._id,
    label: baseResponsibleUser?.fullName,
    index: baseResponsibleUser?.index,
  };
  let newResponsibleUser: typeof responsibleUser;

  // useEffect(() => {
  //   if (dbUser) {
  //     if (dbUser.role === Roles.Tutor || dbUser.role === Roles.Coordinador) {
  //       fetchAssignedUsersById(dbUser._id!).then((users) =>
  //         setAssignedUsers([...users.map((user) => user.fullName)])
  //       );
  //     }
  //     if (dbUser.role === Roles.Practicante || dbUser.role === Roles.Tutor) {
  //       if (dbUser.responsibleUser) {
  //         fetchUserById(dbUser.responsibleUser?.toString()).then((user) =>
  //           setResponsibleUser(user.fullName)
  //         );
  //       } else {
  //         setResponsibleUser("Sin asignar");
  //       }
  //     }
  //   }
  // }, [dbUser, setAssignedUsers, setResponsibleUser]);
  function editAssignedUsers() {
    if (editingAssignedUsers) {
      Promise.all(
        assignedUsers.map((user) => {
          users[user.index].responsibleUser = undefined;
          return saveUserById(user.id!, { $unset: { responsibleUser: 1 } });
        })
      )
        .then(() =>
          Promise.all(
            newAssignedUsers.map((user) => {
              const newId = new mongoose.Types.ObjectId(dbUser?._id);
              users[user.index].responsibleUser = newId;
              return saveUserById(user.id!, { responsibleUser: newId });
            })
          )
        )
        .then(() => {
          console.log(users);
          setEditingAssignedUsers(false);
        });
    } else {
      setEditingAssignedUsers(true);
    }
  }
  function editResponsibleUser() {
    if (editingResponsibleUser && dbUser) {
      const newId =
        newResponsibleUser &&
        new mongoose.Types.ObjectId(newResponsibleUser.id);
      if (index !== undefined) users[index].responsibleUser = newId;
      saveUserById(
        dbUser._id!,
        newId ? { responsibleUser: newId } : { $unset: { responsibleUser: 1 } }
      ).then(() => setEditingResponsibleUser(false));
      console.log(users);
    } else {
      setEditingResponsibleUser(true);
    }
  }
  if (dbUser) {
    const responsibleUserOptions = indexedUsers
      .filter((user) => {
        switch (dbUser.role) {
          case Roles.Practicante:
            return (
              user.role === Roles.Tutor &&
              (!responsibleUserCounts[user._id?.toString()!] ||
                responsibleUserCounts[user._id?.toString()!] <= 5)
            );

          case Roles.Tutor:
            return (
              user.role === Roles.Coordinador &&
              (!responsibleUserCounts[user._id?.toString()!] ||
                responsibleUserCounts[user._id?.toString()!] <= 5)
            );
          default:
            return false;
        }
      })
      .map((user) => ({
        id: user._id,
        label: user.fullName,
        index: user.index,
      }));
    const assignedUsersOptions = indexedUsers
      .filter((user) => {
        switch (dbUser.role) {
          case Roles.Tutor:
            return user.role === Roles.Practicante && !user.responsibleUser;
          case Roles.Coordinador:
            return user.role === Roles.Tutor && !user.responsibleUser;
          default:
            return false;
        }
      })
      .map((user) => ({
        id: user._id,
        label: user.fullName,
        index: user.index,
      }));
    const user = {
      Nombres: dbUser.firstName,
      Apellidos: dbUser.lastName,
      Correo: dbUser.email,
      Rol: dbUser.role,
      Teléfono: dbUser.phone ?? "No registrado",
      Estado: dbUser.state,
      Género: dbUser.gender ?? "No registrado",
      "Registrado el": format(new Date(dbUser.createdAt!), "PPPPp", {
        locale: es,
      }),
      "Última sesión": format(new Date(dbUser.updatedAt!), "PPPPp", {
        locale: es,
      }),
      Carrera: dbUser.career ?? undefined,
      Semestre: dbUser.semester ?? undefined,
      "Usuarios asignados": assignedUsers,
      "Usuario responsable": responsibleUser,
    };
    console.log(user);
    return (
      <Dialog open={open} onClose={handleClose} sx={{ overflow: "auto" }}>
        <DialogTitle>{dbUser.fullName}</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            {Object.entries(user).map(([key, value], index) => {
              switch (key) {
                case "Usuarios asignados":
                  return (
                    (user.Rol === Roles.Tutor ||
                      user.Rol === Roles.Coordinador) && (
                      <>
                        {index > 0 && (
                          <Grid xs={12}>
                            <Divider />
                          </Grid>
                        )}
                        <Grid item key={`${key}:key`} xs={4}>
                          <Typography>
                            <b>{key + ":"}</b>
                          </Typography>
                        </Grid>
                        <Grid item key={`${key}:value`} xs={6}>
                          <Autocomplete
                            multiple
                            size="small"
                            fullWidth
                            defaultValue={assignedUsers}
                            readOnly={!editingAssignedUsers}
                            options={assignedUsersOptions}
                            onChange={(e, newValue) =>
                              (newAssignedUsers = [...newValue])
                            }
                            renderInput={(params) => (
                              <TextField {...params} label={key} />
                            )}
                          />
                        </Grid>
                        <Grid item key={`${key}:value`} xs={2} display="flex">
                          <IconButton
                            color="secondary"
                            onClick={editAssignedUsers}
                          >
                            {editingAssignedUsers ? <Check /> : <Edit />}
                          </IconButton>
                          <IconButton
                            disabled={!editingAssignedUsers}
                            onClick={() => setEditingAssignedUsers(false)}
                          >
                            <Cancel />
                          </IconButton>
                        </Grid>
                      </>
                    )
                  );
                case "Usuario responsable":
                  return (
                    (user.Rol === Roles.Practicante ||
                      user.Rol === Roles.Tutor) && (
                      <>
                        {index > 0 && (
                          <Grid xs={12}>
                            <Divider />
                          </Grid>
                        )}
                        <Grid item xs={4}>
                          <Typography>
                            <b>{key + ":"}</b>
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Autocomplete
                            size="small"
                            fullWidth
                            defaultValue={responsibleUser}
                            readOnly={!editingResponsibleUser}
                            options={responsibleUserOptions}
                            onChange={(e, newValue) =>
                              (newResponsibleUser = newValue ?? undefined)
                            }
                            renderInput={(params) => (
                              <TextField {...params} label={key} />
                            )}
                          />
                        </Grid>
                        <Grid item key={`${key}:value`} xs={2}>
                          <IconButton
                            color="secondary"
                            onClick={editResponsibleUser}
                          >
                            {editingResponsibleUser ? <Check /> : <Edit />}
                          </IconButton>
                          <IconButton
                            disabled={!editingResponsibleUser}
                            onClick={() => setEditingResponsibleUser(false)}
                          >
                            <Cancel />
                          </IconButton>
                        </Grid>
                      </>
                    )
                  );
                default:
                  return (
                    value && (
                      <>
                        {index > 0 && (
                          <Grid item xs={12}>
                            <Divider />
                          </Grid>
                        )}
                        <Grid item xs={4}>
                          <Typography>
                            <b>{key + ":"}</b>
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          {value.toString()}
                        </Grid>
                      </>
                    )
                  );
              }
            })}
          </Grid>
        </DialogContent>
      </Dialog>
    );
  }
  return null;
}
