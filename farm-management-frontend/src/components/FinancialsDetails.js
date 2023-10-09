import React from "react";
import DataTable from "./DataTable";
import AddFinancialPopup from "./AddFinancialsPopup";

function FinancialsDetails({
  financials,
  onDelete,
  onConvert,
  ProfileComponent,
  closeAllPopups,
  isAddFinancialPopupOpen,
  setAddFinancialOpen,
  addFinancial,
}) {
  return (
    <>
      <section className="financial-details">
        {ProfileComponent}
        <button className="financial-button" onClick={setAddFinancialOpen}>
          Adicionar Nova Finança
        </button>
        {financials ? (
          <DataTable
            data={financials}
            onDelete={onDelete}
            onConvert={onConvert}
          />
        ) : (
          <h3 className="table__error">
            Não há dados financeiros disponíveis.
          </h3>
        )}
      </section>
      <AddFinancialPopup
        isOpen={isAddFinancialPopupOpen}
        onClose={closeAllPopups}
        onAddFinancial={addFinancial}
      />
    </>
  );
}

export default FinancialsDetails;
