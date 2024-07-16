import { Box, Typography } from "@mui/material";
import PatientLayout from "../_components/layout/PatientLayout";
import RequestTable from "../_components/requests/RequestTable";
import PageHeader from "../_components/PageHeader";
import { fetchRequests } from "../_utils/server actions/request";
import { serialize } from "../_database/connection";

export default async function RequestPage() {
    const requests = await fetchRequests();
    return(
        <PatientLayout title="Registro" pageDescription="">
            <PageHeader header="Solicitudes pendientes"/>
            <Box px={3}>
                <RequestTable requests={serialize(requests)}/>
            </Box>
        </PatientLayout>
    );
}