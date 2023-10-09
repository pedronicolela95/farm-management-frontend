import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { isAfter, isBefore, parseISO } from "date-fns";

function AddFinancialPopup(props) {
  const { onAddFinancial, isOpen, onClose } = props;

  const [description, setDescription] = React.useState("");

  const [type, setType] = useState("Custo");
  const [hasOccurred, setHasOccurred] = useState("Realizada");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("Insumos Agrícolas");
  const [date, setDate] = useState("");

  const [descriptionValidatorMessage, setDescriptionValidatorMessage] =
    useState("");
  const [amountValidatorMessage, setAmountValidatorMessage] = useState("");
  const [dateValidatorMessage, setDateValidatorMessage] = useState("");
  const [isEnabledToSubmit, setIsEnabledToSubmit] = useState(false);

  const regexString = /^(?=.*[a-zA-Z]).{2,30}$/;

  const [categoryOptions, setCategoryOptions] = useState([]);

  function validatorToSubmit() {
    if (
      descriptionValidatorMessage === "" &&
      amountValidatorMessage === "" &&
      dateValidatorMessage === ""
    ) {
      setIsEnabledToSubmit(true);
    }
  }

  useEffect(() => {
    if (type === "Custo") {
      setCategoryOptions([
        "Insumos Agrícolas",
        "Mão de Obra",
        "Despesas com Animais",
        "Despesas Administrativas",
        "Facilities",
        "Custos de Marketing e Vendas",
        "Outros",
      ]);
      setCategory("Insumos Agrícolas");
    } else if (type === "Receita") {
      setCategoryOptions([
        "Venda de Animais",
        "Venda de Produtos Agrícolas",
        "Arrendamento de Terras",
        "Outros",
      ]);
      setCategory("Venda de Animais");
    }
  }, [type]);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);

    if (!regexString.test(e.target.value)) {
      setDescriptionValidatorMessage(
        "A descrição deve ter entre 2 e 30 caracteres."
      );
      setIsEnabledToSubmit(false);
    } else {
      setDescriptionValidatorMessage("");
    }
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);

    if (e.target.value <= 0) {
      setAmountValidatorMessage("O valor deve ser maior que zero.");
      setIsEnabledToSubmit(false);
    } else {
      setAmountValidatorMessage("");
    }
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  useEffect(() => {
    const parsedDate = parseISO(date);

    if (hasOccurred === "Projetada" && isBefore(parsedDate, new Date())) {
      setDateValidatorMessage("Datas projetadas devem ser no futuro.");
      setIsEnabledToSubmit(false);
    } else if (hasOccurred === "Realizada" && isAfter(parsedDate, new Date())) {
      setDateValidatorMessage("Datas realizadas não podem ser no futuro.");
      setIsEnabledToSubmit(false);
    } else {
      setDateValidatorMessage("");
    }
  }, [hasOccurred, date]);

  useEffect(() => {
    validatorToSubmit();
  }, [
    amountValidatorMessage,
    dateValidatorMessage,
    descriptionValidatorMessage,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasOcurredBollean = hasOccurred === "Realizada" ? true : false;
    if (isEnabledToSubmit) {
      onAddFinancial({
        description: description,
        category: category,
        type: type,
        date: date,
        amount: amount,
        hasOcurred: hasOcurredBollean,
      });
    }
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="add-financial"
      title="Adicionar Transação"
      onSubmit={handleSubmit}
      isEnabled={isEnabledToSubmit}
    >
      <input
        value={description}
        onChange={handleDescriptionChange}
        className="popup__input"
        id="description-input"
        placeholder="Descrição da transação"
        required
        minLength="2"
        maxLength="30"
      />
      <span className="popup__error">{descriptionValidatorMessage}</span>

      <label className="popup__label">
        Tipo:
        <div className="popup__radio-container">
          <h5 className="popup__radio-subtitle"> Custo</h5>
          <input
            type="radio"
            name="type"
            value="Custo"
            onChange={(e) => setType(e.target.value)}
          />{" "}
        </div>
        <div className="popup__radio-container">
          <h5 className="popup__radio-subtitle"> Receita</h5>
          <input
            type="radio"
            name="type"
            value="Receita"
            onChange={(e) => setType(e.target.value)}
          />{" "}
        </div>
      </label>

      <label className="popup__label">
        Realizada?
        <div className="popup__radio-container">
          <h5 className="popup__radio-subtitle">Projetada</h5>
          <input
            type="radio"
            name="hasOccurred"
            value="Projetada"
            onChange={(e) => setHasOccurred(e.target.value)}
          />{" "}
        </div>
        <div className="popup__radio-container">
          <h5 className="popup__radio-subtitle">Realizada</h5>
          <input
            type="radio"
            name="hasOccurred"
            value="Realizada"
            onChange={(e) => setHasOccurred(e.target.value)}
          />{" "}
        </div>
      </label>

      <input
        type="number"
        name="amount"
        value={amount}
        min="0.01"
        step="0.01"
        placeholder="Valor da transação"
        onChange={handleAmountChange}
        className="popup__input"
      />

      <span className="popup__error">{amountValidatorMessage}</span>

      <label className="popup__label">
        Categoria:
        <select
          className="popup__input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categoryOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <input
        type="date"
        value={date}
        onChange={handleDateChange}
        className="popup__input"
      />
      <span className="popup__error">{dateValidatorMessage}</span>
    </PopupWithForm>
  );
}

export default AddFinancialPopup;
