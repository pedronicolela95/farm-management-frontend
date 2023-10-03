import React from "react";
const moment = require("moment");

function DataTable({ data, onDelete, onConvert }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  function deleteFinancial(event, _id) {
    event.preventDefault();
    onDelete(_id);
  }

  function convertFinancial(event, _id) {
    event.preventDefault();
    onConvert(_id);
  }

  const today = moment().startOf("day");

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr className="table__header">
            <th>Data</th>
            <th>Tipo</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Realizada?</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={`table__row ${
                !item.hasOcurred &&
                moment(item.date).startOf("day").isBefore(today)
                  ? "table__row_highlighted"
                  : ""
              }`}
            >
              <td>{formatDate(item.date)}</td>
              <td>{item.type}</td>
              <td>{item.description}</td>
              <td>{item.category}</td>
              <td>{item.hasOcurred ? "Realizada" : "Projetada"}</td>
              <td>{item.amount}</td>
              <td>
                {!item.hasOcurred && (
                  <button
                    className="table__button table__button_convert"
                    onClick={(event) => convertFinancial(event, item._id)}
                  >
                    Converter
                  </button>
                )}
                <button
                  className="table__button table__button_delete"
                  onClick={(event) => deleteFinancial(event, item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
