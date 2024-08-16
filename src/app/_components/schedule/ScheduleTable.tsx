"use client";

import { days, hours } from "@/app/_utils/constants";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import CellButton from "./CellButton";
import { IDay } from "@/app/_interfaces/schedule/IDay";
import { scheduleTheme } from "@/app/_themes/schedule-theme";

export default function ScheduleTable({
  schedule,
  readOnly,
}: {
  schedule: IDay[];
  readOnly?: boolean;
}) {
  console.log("Schedule es");
  console.log(schedule);
  return (
    <TableContainer sx={{ height: "100%" }}>
      <Table size="small" stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {days.map((day) => (
              <TableCell
                key={`header${day}`}
                sx={{
                  backgroundColor: "purple",
                  color: "white",
                  borderLeft: 1,
                }}
                align="center"
              >
                {day}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {hours.map((hour) => (
            <TableRow key={`fila${hour}`}>
              <TableCell
                sx={{
                  position: "sticky",
                  left: 0,
                  background: "white",
                  zIndex: 800,
                }}
              >
                {hour.getString()}
              </TableCell>
              {days.map((day, index) => {
                let color: string | undefined;
                if (readOnly) {
                  color = schedule[index].hours[hour.getValue()]
                    ? scheduleTheme.palette.primary.main
                    : scheduleTheme.palette.secondary.main;
                }
                return (
                  <TableCell
                    key={day + hour.getString()}
                    sx={{
                      paddingTop: 0,
                      paddingBottom: 0,
                      paddingLeft: 0,
                      paddingRight: 0,
                      backgroundColor: color,
                      borderLeft: 1,
                      borderRight: index === days.length - 1 ? 1 : 0,
                      borderColor: "#e0e0e0",
                    }}
                  >
                    {/* <Button size="large" variant="text" sx={{
                                paddingTop: 0, 
                                paddingBottom: 0, 
                                paddingLeft: 0, 
                                paddingRight: 0, 
                                borderRadius: 0, 
                                minHeight: "32px", 
                                width: "100%", 
                                backgroundColor: schedule[index].hours[hour.getValue()] ? "violet" : "cyan",
                            }}
                            onClick= {() => {
                                schedule[index].hours[hour.getValue()] = !schedule[index].hours[hour.getValue()];
                                setSchedule([...schedule]);
                                console.log("Cambio");
                            }}
                            >
                                
                            </Button> */}
                    {!readOnly && (
                      <CellButton
                        initialSelected={schedule[index].hours[hour.getValue()]}
                        day={index}
                        hour={hour.getValue()}
                        schedule={schedule}
                      />
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
