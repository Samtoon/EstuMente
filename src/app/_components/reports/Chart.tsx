import { IReportResult } from "@/app/_interfaces/IReportResult";
import { Box, Typography } from "@mui/material";
import {
  blueberryTwilightPalette,
  blueberryTwilightPaletteDark,
  cheerfulFiestaPalette,
} from "@mui/x-charts/colorPalettes";
import { PieItemId, PieValueType } from "@mui/x-charts/models";
import { pieArcLabelClasses, PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";

function toPieValueType(result: IReportResult): PieValueType {
  return {
    id: String(result._id),
    value: result.count,
    label: result._id
      ? String(result._id).replaceAll(" ", "\n")
      : "No\nregistra",
  };
}

export default function Chart({
  title,
  fetcher,
}: {
  title: string;
  fetcher: () => Promise<IReportResult[]>;
}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PieValueType[]>([]);
  useEffect(() => {
    setLoading(true);
    fetcher().then((results) => {
      const newData = results.map(toPieValueType);
      setData([...newData]);
      setLoading(false);
    });
  }, [fetcher]);
  return (
    <Box display="flex" flexDirection="column">
      <Typography>{title}</Typography>
      <PieChart
        colors={cheerfulFiestaPalette}
        loading={loading}
        series={[
          {
            data: [...data],
            arcLabel: (item) => item.value,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontWeight: "bold",
          },
        }}
        width={380}
        height={200}
        slotProps={{
          legend: {
            direction: "column",
            position: { vertical: "middle", horizontal: "right" },
            padding: 0,
          },
        }}
      />
    </Box>
  );
}
