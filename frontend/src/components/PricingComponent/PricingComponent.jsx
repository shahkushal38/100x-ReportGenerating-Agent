import { useCallback } from "react";
import { styles } from "./PricingComponent.styles";
import { PLANS } from "./PriceComponent.constant";

export function PricingComponent(props) {
  const { plans = PLANS, onPlanClick } = props;

  const handlePlanClick = useCallback((plan) => {
    console.log("Plan  -- ", plan);
    if (onPlanClick) {
      onPlanClick(plan);
    }
  }, [onPlanClick]);

  return (
    <div className="pricing-container" style={styles.container}>
      <h1 style={styles.heading}>Pricing Plans</h1>
      <div style={styles.cardContainer}>
        {plans.map((plan, index) => (
          <div key={index} style={styles.card}>
            <h2 style={styles.planName}>{plan.name}</h2>
            <p style={styles.price}>{plan.price}</p>
            <ul style={styles.featuresList}>
              {plan.features.map((feature, idx) => (
                <li key={idx} style={styles.featureItem}>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              style={styles.button}
              onClick={() => handlePlanClick(plan.name)}
            >
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
