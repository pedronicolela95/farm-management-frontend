import React from "react";
import MyBarChart from "./BarGraphic";
import MyPieChart from "./PieGraphic";

function Main(props) {
  const {
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
    ProfileComponent,
  } = props;

  return (
    <>
      {ProfileComponent}
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
