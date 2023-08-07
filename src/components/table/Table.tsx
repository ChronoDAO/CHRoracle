import { MaterialReactTable } from "material-react-table";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import tableHeader from "./tableHeader.module.scss";
import Link from "next/link";

const Table = ({ viewName, columns, data }) => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <>
      <div className={tableHeader.container}>
        <h1 className={tableHeader.title}>{viewName}</h1>
      </div>
      <ThemeProvider theme={darkTheme}>
        <MaterialReactTable columns={columns} data={data} />
      </ThemeProvider>
      <Link href="/">Go back to Home</Link>
    </>
  );
};

export default Table;
