import React from "react";
import Profile from "./Profile";
import DataTable from "./DataTable";

function FinancialsDetails({ currentFarm, financials, onDelete, onConvert }) {
  return (
    <>
      <Profile currentFarm={currentFarm} />
      {financials ? (
        <DataTable
          data={financials}
          onDelete={onDelete}
          onConvert={onConvert}
        />
      ) : (
        <h3 className="table__error">Não há dados financeiros disponíveis.</h3>
      )}
    </>
  );
}

export default FinancialsDetails;
