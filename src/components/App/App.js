import "./App.css";
import { Route, Routes } from "react-router-dom";
import React from 'react';
import mockApi from "../../utils/api/MockApi";
import { MAIN_ROUTE } from "../../utils/constants/routes";
import Table from "../Table/Table";

function App() {
  const [data, setData] = React.useState({});

  const handleDataChange = (data) => {
    setData(data)
  }

  React.useEffect(() => {
    // Последний запрашиваемый месяц скорее всего достанем из
    // локального хранилища браузера
    const month = 'April'
    mockApi.get_workers(month)
      .then((res) => {
        setData(res)
      })
  }, [])

  return (
    <div className='app'>
      <main className='content'>
        <Routes>
          <Route
            path={MAIN_ROUTE}
            element={<Table data={data} handleDataChange={handleDataChange}/>}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
