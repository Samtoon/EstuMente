import NoteFilters from "@/app/_enums/NoteFilters";
import { Search } from "@mui/icons-material";
import { FormControl, InputLabel, Select, Stack, MenuItem, TextField, IconButton, TextFieldProps } from "@mui/material";
import { SlotCommonProps } from "@mui/material/utils/types";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { esES } from "@mui/x-date-pickers/locales";
import { es } from "date-fns/locale";
import { useState } from "react";

const sTextField = () => <TextField label="Fecha" size="small" variant="standard" />

export default function SearchField({
    // searchNotes,
    setFilter,
    filterBy,
    setFilterBy,
    trigger
}: {
    // searchNotes: (filterBy: string | Date, filterBy: NoteFilters) => void,
    setFilter: (filter: string | Date) => void,
    filterBy: NoteFilters,
    setFilterBy: (filterBy: NoteFilters) => void,
    trigger: (value: boolean) => void
}) {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState<Date | null>(null);
    const searchFieldProps: TextFieldProps = {
        size: "small",
        variant: "standard",
        label: filterBy === NoteFilters.Title ? "Título" : "Fecha",
        fullWidth: true
    }
    function handleClick() {
        setFilter(filterBy === NoteFilters.Title ? title : date as Date);
        trigger(true);
        // searchNotes(filterBy === NoteFilters.Title ? title : date as Date, filterBy);
    }
    return (
        <Stack direction="row" spacing={2} justifyContent="center">
            <FormControl size="small" variant="standard" sx={{ minWidth: 70 }}>
                <InputLabel id="search-by-label">Buscar por:</InputLabel>
                <Select
                    labelId="search-by-label"
                    value={filterBy}
                    onChange={e => setFilterBy(e.target.value as NoteFilters)}
                >
                    <MenuItem value={NoteFilters.Title}>Título</MenuItem>
                    <MenuItem value={NoteFilters.Date}>Fecha</MenuItem>
                </Select>
            </FormControl >
            {
                filterBy === "title" ?
                    <TextField
                        {...searchFieldProps}
                        sx={{ maxWidth: 180 }}
                        value={title}
                        onChange={e => setTitle(e.target.value)} />
                    :
                    <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                        adapterLocale={es}
                        localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}
                    >
                        <FormControl size="small" variant="standard" sx={{ maxWidth: 180 }}>
                            <DatePicker
                                views={['year', 'month', 'day']}
                                slotProps={{ textField: searchFieldProps }}
                                maxDate={new Date()}
                                value={date}
                                onChange={value => setDate(value)}
                            />
                        </FormControl>
                    </LocalizationProvider>
            }
            <IconButton color="secondary" onClick={handleClick}>
                <Search />
            </IconButton>
        </Stack>


    );
}