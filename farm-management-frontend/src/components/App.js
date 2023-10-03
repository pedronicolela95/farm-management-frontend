import React from "react";
import { Route, Switch, withRouter, useHistory } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Register from "./Register";
import Login from "./Login";
import FinancialsDetails from "./FinancialsDetails";
import ProtectedRoute from "./ProtectedRoute";
import Spinner from "./Spinner";

import Api from "../utils/api";
import { authorize, authenticate } from "../utils/auth";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App(props) {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);

  const [currentFarm, setCurrentFarm] = React.useState("");

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [farmName, setFarmName] = React.useState("");
  const [InfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);

  const [token, setToken] = React.useState(localStorage.getItem("jwt"));

  const [financials, setFinancials] = React.useState("");
  const [incurredRevenueMonthly, setIncurredRevenueMonthly] =
    React.useState("");
  const [incurredCostMonthly, setIncurredCostMonthly] = React.useState("");
  const [incurredProfitMonthly, setIncurredProfitMonthly] = React.useState("");
  const [projectedRevenueMonthly, setProjectedRevenueMonthly] =
    React.useState("");
  const [projectedCostMonthly, setProjectedCostMonthly] = React.useState("");
  const [projectedProfitMonthly, setProjectedProfitMonthly] =
    React.useState("");
  const [incurredRevenueCategories, setIncurredRevenueCategories] =
    React.useState("");
  const [incurredCostCategories, setIncurredCostCategories] =
    React.useState("");
  const [projectedRevenueCategories, setProjectedRevenueCategories] =
    React.useState("");
  const [projectedCostCategories, setProjectedCostCategories] =
    React.useState("");

  const [isLoading, setIsLoading] = React.useState(true);

  const history = useHistory();

  const BASE_URL = "http://localhost:3000";
  // fix me

  const api = new Api({
    baseUrl: BASE_URL,
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setInfoTooltipOpen(false);
  }

  function handleDeleteFinancial(_id) {
    api.deleteFinancials(_id).then(() => {
      setFinancials((state) =>
        state.filter((financial) => financial._id !== _id)
      );
    });
    getFinancialsData();
  }

  function handleConvertFinancial(_id) {
    api.convertFinancials(_id).then(() => {
      setFinancials((state) =>
        state.map((financial) =>
          financial._id === _id ? { ...financial, hasOcurred: true } : financial
        )
      );
    });
    getFinancialsData();
  }

  const getFinancialsData = async () => {
    setIsLoading(true);
    try {
      const [
        financialsData,
        incurredRevenueMonthlyData,
        incurredCostMonthlyData,
        incurredProfitMonthlyData,
        projectedRevenueMonthlyData,
        projectedCostMonthlyData,
        projectedProfitMonthlyData,
        incurredRevenueCategoriesData,
        incurredCostCategoriesData,
        projectedRevenueCategoriesData,
        projectedCostCategoriesData,
      ] = await Promise.all([
        api.getFinancials(),
        api.postFinancialsMonthly("Receita", true),
        api.postFinancialsMonthly("Custo", true),
        api.postProfitsMonthly(true),
        api.postFinancialsMonthly("Receita", false),
        api.postFinancialsMonthly("Custo", false),
        api.postProfitsMonthly(false),
        api.postFinancialsCategories("Receita", true),
        api.postFinancialsCategories("Custo", true),
        api.postFinancialsCategories("Receita", false),
        api.postFinancialsCategories("Custo", false),
      ]);

      setFinancials(financialsData.financials);
      setIncurredRevenueMonthly(incurredRevenueMonthlyData.calculateFinancials);
      setIncurredCostMonthly(incurredCostMonthlyData.calculateFinancials);
      setIncurredProfitMonthly(incurredProfitMonthlyData.profit);
      setProjectedRevenueMonthly(
        projectedRevenueMonthlyData.calculateFinancials
      );
      setProjectedCostMonthly(projectedCostMonthlyData.calculateFinancials);
      setProjectedProfitMonthly(projectedProfitMonthlyData.profit);
      setIncurredRevenueCategories(incurredRevenueCategoriesData.financial);
      setIncurredCostCategories(incurredCostCategoriesData.financial);
      setProjectedRevenueCategories(projectedRevenueCategoriesData.financial);
      setProjectedCostCategories(projectedCostCategoriesData.financial);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setIsLoading(false);
    }
  };

  function authenticateWithToken(token) {
    return authenticate(token)
      .then((res) => {
        setFarmName(res.user.farmName);
        setIsLoggedIn(true);
        setCurrentFarm(res.user);
        return res;
      })
      .then((res) => {
        getFinancialsData();
        return res;
      })
      .catch((error) => {
        return error;
      });
  }

  function onLogin(email, password) {
    return authorize(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setToken(res.token);
        return res;
      })
      .then((res) => {
        return authenticateWithToken(res.token);
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  function handleAuthResponse() {
    setInfoTooltipOpen(true);
  }

  function onSignOut() {
    localStorage.removeItem("jwt");
    setToken("");
    setFarmName("");
    setIsLoggedIn(false);
  }

  React.useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const authResponse = await authenticateWithToken(token);
        if (
          authResponse.user.farmName &&
          history.location.pathname === "/signin"
        ) {
          history.push("/");
        }
      } catch (err) {
        console.log(err);
        history.push("/signin");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [token, history]);

  React.useEffect(() => {
    const fetchFarmInfoAndFinancials = async () => {
      setIsLoading(true);
      try {
        const farmInfo = await api.getFarmInfo();
        setCurrentFarm(farmInfo.user);
        await getFinancialsData();
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFarmInfoAndFinancials();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentFarm}>
      <Header farmName={farmName} onSignOut={onSignOut} />
      {isLoading ? (
        <Spinner />
      ) : (
        <Switch>
          <Route exact path="/signup">
            <Register
              isOpen={InfoTooltipOpen}
              closeAllPopups={closeAllPopups}
              handleAuthResponse={handleAuthResponse}
            />
          </Route>
          <Route exact path="/signin">
            <Login
              onLogin={onLogin}
              isOpen={InfoTooltipOpen}
              closeAllPopups={closeAllPopups}
              handleAuthResponse={handleAuthResponse}
            />
          </Route>
          <ProtectedRoute
            path="/details"
            loggedIn={isLoggedIn}
            component={FinancialsDetails}
            currentFarm={currentFarm}
            financials={financials}
            onDelete={handleDeleteFinancial}
            onConvert={handleConvertFinancial}
          />
          <ProtectedRoute
            path="/"
            loggedIn={isLoggedIn}
            component={Main}
            currentFarm={currentFarm}
            incurredRevenueMonthly={incurredRevenueMonthly}
            incurredCostMonthly={incurredCostMonthly}
            incurredProfitMonthly={incurredProfitMonthly}
            incurredRevenueCategories={incurredRevenueCategories}
            incurredCostCategories={incurredCostCategories}
            projectedRevenueMonthly={projectedRevenueMonthly}
            projectedCostMonthly={projectedCostMonthly}
            projectedProfitMonthly={projectedProfitMonthly}
            projectedRevenueCategories={projectedRevenueCategories}
            projectedCostCategories={projectedCostCategories}
          />
        </Switch>
      )}
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
