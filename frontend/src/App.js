import Board from "./board";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {  QueryClientProvider, QueryClient } from 'react-query';

function App() {
  const queryClient = new QueryClient();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <QueryClientProvider client={queryClient}>
        <Board />
      </QueryClientProvider >
    </LocalizationProvider>
  );
}

export default App;
