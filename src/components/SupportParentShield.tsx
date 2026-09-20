import React from "react";
export const SupportParentShield: React.FC<{ onNavigateToTab?: (tab: string) => void }> = () => {
  const links = {
    together: "https://buy.stripe.com/14A28qdgcflw3ez3pkgUM04",
    defender: "https://buy.stripe.com/9B64gygso7T44iDcZUgUM00",
    protector: "https://buy.stripe.com/dRm8wOgso1uG16raRMgUM01",
    shield: "https://buy.stripe.com/9B6bJ05NK1uG6qL9NIgUM03",
    guardian: "https://buy.stripe.com/eVqcN4gsoflweXh8JEgUM02",
  };
  return <div>Support wiring pending full file replace. Links: {Object.keys(links).join(", ")}</div>;
};
