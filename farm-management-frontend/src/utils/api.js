export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getFinancials() {
    const url = this.baseUrl + "/financials";
    const data = { headers: this.headers };
    return fetch(url, data).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // se o servidor retornar um erro, rejeite a promessa
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  createFinancials(newFinancial) {
    const url = this.baseUrl + "/financials";
    const data = {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify({
        description: newFinancial.description,
        category: newFinancial.category,
        type: newFinancial.type,
        date: newFinancial.date,
        amount: newFinancial.amount,
        hasOcurred: newFinancial.hasOcurred,
      }),
    };
    return fetch(url, data).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // se o servidor retornar um erro, rejeite a promessa
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  deleteCard(financialId) {
    const url = this.baseUrl + "/financials/" + financialId;
    const data = { headers: this.headers, method: "DELETE" };
    return fetch(url, data).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // se o servidor retornar um erro, rejeite a promessa
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getFinancialsMonthly(type, hasOcurred) {
    const url = this.baseUrl + "/financials/financials-monthly";
    const data = {
      headers: this.headers,
      method: "GET",
      body: JSON.stringify({ type: type, hasOcurred: hasOcurred }),
    };
    return fetch(url, data).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // se o servidor retornar um erro, rejeite a promessa
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getFinancialsCategories(type, hasOcurred) {
    const url = this.baseUrl + "/financials/financials-category";
    const data = {
      headers: this.headers,
      method: "GET",
      body: JSON.stringify({ type: type, hasOcurred: hasOcurred }),
    };
    return fetch(url, data).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // se o servidor retornar um erro, rejeite a promessa
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getProfitsMonthly(hasOcurred) {
    const url = this.baseUrl + "/financials/profit-monthly";
    const data = {
      headers: this.headers,
      method: "GET",
      body: JSON.stringify({ type: type, hasOcurred: hasOcurred }),
    };
    return fetch(url, data).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // se o servidor retornar um erro, rejeite a promessa
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getFarmInfo() {
    const url = this.baseUrl + "/farm-info";
    const data = { headers: this.headers };

    return fetch(url, data).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // se o servidor retornar um erro, rejeite a promessa
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  updateFarmInfo(farmInfo) {
    const url = this.baseUrl + "/farm-info";
    const data = {
      headers: this.headers,
      method: "PATCH",
      body: JSON.stringify({
        farmName: farmInfo.farmName,
        city: farmInfo.city,
        state: farmInfo.state,
      }),
    };

    return fetch(url, data).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // se o servidor retornar um erro, rejeite a promessa
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  updateFarmImage(farmInfo) {
    const url = this.baseUrl + "/farm-info/farm-photo";

    const data = {
      headers: this.headers,
      method: "PATCH",
      body: JSON.stringify({
        farmPhoto: farmInfo.farmPhoto,
      }),
    };

    return fetch(url, data).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // se o servidor retornar um erro, rejeite a promessa
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}
