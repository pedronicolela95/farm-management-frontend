import React from "react";
import editButtonImg from "../images/profile/edit_button.svg";
import editImageButton from "../images/profile/edit-picture.svg";

// import PopupWithForm from "./PopupWithForm";
// import EditProfilePopup from "./EditProfilePopup";
// import EditAvatarPopup from "./EditAvatarPopup";
// import AddPlacePopup from "./AddPlacePopup";
import MyBarChart from "./BarGraphic";
import MyPieChart from "./PieGraphic";
import Profile from "./Profile";

function Main(props) {
  const {
    currentFarm,
    incurredRevenueMonthly,
    incurredCostMonthly,
    incurredProfitMonthly,
    incurredRevenueCategories,
    incurredCostCategories,
    projectedRevenueMonthly,
    projectedCostMonthly,
    projectedProfitMonthly,
    projectedRevenueCategories,
    projectedCostCategories,
  } = props;

  return (
    <>
      <Profile currentFarm={currentFarm} />
      <section className="graphics">
        <h3 className="graphics__title">Finanças realizadas</h3>
        <div className="graphic">
          <MyBarChart
            title={"Receita"}
            dataObject={incurredRevenueMonthly}
            isProjected={false}
          />
        </div>
        <div className="graphic">
          <MyPieChart
            title={"Categoria Receita D30"}
            dataObject={incurredRevenueCategories}
          />
        </div>
        <div className="graphic">
          <MyBarChart
            title={"Custo"}
            dataObject={incurredCostMonthly}
            isProjected={false}
          />
        </div>
        <div className="graphic">
          <MyPieChart
            title={"Categoria Custo D30"}
            dataObject={incurredCostCategories}
          />
        </div>
        <div className="graphic graphic__profit-monthly">
          <MyBarChart
            title={"Lucro"}
            dataObject={incurredProfitMonthly}
            isProjected={false}
          />
        </div>
      </section>

      <section className="graphics">
        <h3 className="graphics__title">Finanças projetadas</h3>
        <div className="graphic">
          <MyBarChart
            title={"Receita"}
            dataObject={projectedRevenueMonthly}
            isProjected={true}
          />
        </div>
        <div className="graphic">
          <MyPieChart
            title={"Categoria Receita D30"}
            dataObject={projectedRevenueCategories}
          />
        </div>
        <div className="graphic">
          <MyBarChart
            title={"Custo"}
            dataObject={projectedCostMonthly}
            isProjected={true}
          />
        </div>
        <div className="graphic">
          <MyPieChart
            title={"Categoria Custo D30"}
            dataObject={projectedCostCategories}
          />
        </div>
        <div className="graphic graphic__profit-monthly">
          <MyBarChart
            title={"Lucro"}
            dataObject={projectedProfitMonthly}
            isProjected={true}
          />
        </div>
      </section>
    </>
  );
}

export default Main;
