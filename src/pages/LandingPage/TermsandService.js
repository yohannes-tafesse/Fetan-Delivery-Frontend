import React, { useContext, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { LanguageContext } from "../Languages/LanguageContext";
import LanguageSelector from "../Languages/LanguageSelector";

const TermsandService = () => {
    const { t } = useContext(LanguageContext);
  
  // const termsData = [
  //   {
  //     heading: "1. Eligibility & Registration",
  //     points: [
  //       "You must be at least 18 years old and legally able to enter binding agreements.",
  //       "You must provide complete and accurate information during registration and keep it updated.",
  //       "Fetan Market reserves the right to verify your identity, business registration, and compliance at any time.",
  //     ],
  //   },
  //   {
  //     heading: "2. Account Security",
  //     points: [
  //       "You are responsible for maintaining the confidentiality of your account, OTPs, and login credentials.",
  //       "Any activity from your account is deemed authorized by you.",
  //       "You must immediately notify us of unauthorized use or security breaches.",
  //     ],
  //   },
  //   {
  //     heading: "3. Storefront & Listings",
  //     points: [
  //       "Each Seller store will have a unique Fetan Market storefront link.",
  //       "You may only list products you are legally authorized to sell in Ethiopia.",
  //       "You must not infringe intellectual property rights (brands, trademarks, copyrights, patents).",
  //       "Prohibited items include (but are not limited to): counterfeit products, stolen goods, unsafe food or medicine, firearms, tobacco, drugs, pornography, and any item restricted by Ethiopian law.",
  //       "You must maintain accurate product descriptions, pricing in ETB, and quality images.",
  //     ],
  //   },
  //   {
  //     heading: "4. Orders, Fulfillment & Returns",
  //     points: [
  //       "You are responsible for timely order fulfillment, accurate packaging, and safe delivery.",
  //       "You must provide invoices/receipts where required by law.",
  //       "You bear full responsibility for handling returns, refunds, replacements, and after-sale obligations with your buyers.",
  //       "Fetan Market does not intervene in refunds or guarantee them to buyers.",
  //       "Failure to meet reasonable customer service standards may result in penalties, suspension, or termination.",
  //     ],
  //   },
  //   {
  //     heading: "5. Payments & Fees",
  //     points: [
  //       "Buyers pay through payment methods enabled by Fetan Market.",
  //       "Fetan Market collects payments on your behalf and remits balances after deducting applicable commissions, fees, and taxes (if required by law).",
  //       "Settlement schedules are subject to banking/technical delays.",
  //       "Fetan Market may offset amounts you owe (refunds, penalties, chargebacks) against future payouts.",
  //       "You are responsible for all applicable taxes, including VAT and income tax.",
  //     ],
  //   },
  //   {
  //     heading: "6. Pricing & Promotions",
  //     points: [
  //       "You control your product prices but must honor listed prices.",
  //       "You may not inflate prices on Fetan Market compared to your other channels, unless otherwise permitted.",
  //       "Promotions and discounts must comply with Fetan Market guidelines.",
  //     ],
  //   },
  //   {
  //     heading: "7. Prohibited Conduct",
  //     description: "You agree not to:",
  //     points: [
  //       "Circumvent Fetan Market by directing customers off-platform.",
  //       "Misuse buyer data (spam, resale, marketing without consent).",
  //       "Post false, misleading, or deceptive content.",
  //       "Manipulate reviews, ratings, or feedback.",
  //       "Use the platform for money laundering, fraud, or unlawful activity.",
  //     ],
  //   },
  //   {
  //     heading: "8. Intellectual Property & Content License",
  //     points: [
  //       "You represent that you own or have rights to all content you upload (product names, descriptions, logos, images).",
  //       "You grant Fetan Market a royalty-free, worldwide license to use such content for operating, promoting, and improving the platform.",
  //       "Fetan Market may remove infringing or disputed content at its discretion.",
  //     ],
  //   },
  //   {
  //     heading: "9. Data & Privacy",
  //     points: [
  //       "You must comply with data protection and privacy laws.",
  //       "Buyer personal data may only be used for fulfilling orders and must not be stored or shared for unrelated purposes.",
  //       "Fetan Market may monitor Seller activity for fraud prevention and compliance.",
  //     ],
  //   },
  //   {
  //     heading: "10. Compliance & Audit Rights",
  //     points: [
  //       "You agree to comply with all applicable laws, including consumer protection, product safety, advertising, and tax obligations.",
  //       "Fetan Market may audit Seller practices and request documentation to confirm compliance.",
  //     ],
  //   },
  //   {
  //     heading: "11. Suspension & Termination",
  //     points: [
  //       "Fetan Market may suspend or terminate your account immediately if you:",
  //       "Breach these Terms.",
  //       "Sell prohibited/illegal products.",
  //       "Engage in fraud, or ",
  //       "Consistently deliver poor service.",
  //       "You remain responsible for pending orders, refunds, and obligations even after termination.",
  //       "Fetan Market may withhold funds to cover potential disputes or liabilities.",
  //     ],
  //   },
  //   {
  //     heading: "12. Liability & Indemnification",
  //     points: [
  //       "You are fully responsible for your products, listings, returns, refunds, and conduct.",
  //       "You indemnify and hold Fetan Market harmless against claims, losses, or damages related to your products or actions.",
  //       "Fetan Market is not liable for indirect, incidental, or consequential damages, or lost profits.",
  //     ],
  //   },
  //   {
  //     heading: "13. Changes to Terms & Policies",
  //     points: [
  //       "Fetan Market may update these Terms at any time. Updates will be posted on the platform, and continued use constitutes acceptance.",
  //     ],
  //   },
  //   {
  //     heading: "14. Governing Law & Dispute Resolution",
  //     points: [
  //       "These Terms are governed by the laws of the Federal Democratic Republic of Ethiopia.",
  //       "Disputes shall be resolved exclusively in Ethiopian courts unless otherwise agreed in writing.",
  //     ],
  //   },
  // ];
  

  const termsData = [
  {
    heading: "eligibility_registration",
    points: [
      "eligibility_1",
      "eligibility_2",
      "eligibility_3",
    ],
  },
  {
    heading: "account_security",
    points: [
      "account_security_1",
      "account_security_2",
      "account_security_3",
    ],
  },
  {
    heading: "storefront_listings",
    points: [
      "storefront_1",
      "storefront_2",
      "storefront_3",
      "storefront_4",
      "storefront_5",
    ],
  },
  {
    heading: "orders_fulfillment_returns",
    points: [
      "orders_1",
      "orders_2",
      "orders_3",
      "orders_4",
      "orders_5",
    ],
  },
  {
    heading: "payments_fees",
    points: [
      "payments_1",
      "payments_2",
      "payments_3",
      "payments_4",
      "payments_5",
    ],
  },
  {
    heading: "pricing_promotions",
    points: ["pricing_1", "pricing_2", "pricing_3"],
  },
  {
    heading: "prohibited_conduct",
    description: "prohibited_description",
    points: [
      "prohibited_1",
      "prohibited_2",
      "prohibited_3",
      "prohibited_4",
      "prohibited_5",
    ],
  },
  {
    heading: "intellectual_property_license",
    points: ["ip_1", "ip_2", "ip_3"],
  },
  {
    heading: "data_privacy",
    points: ["data_1", "data_2", "data_3"],
  },
  {
    heading: "compliance_audit",
    points: ["compliance_1", "compliance_2"],
  },
  {
    heading: "suspension_termination",
    points: [
      "suspension_1",
      "suspension_2",
      "suspension_3",
      "suspension_4",
      "suspension_5",
      "suspension_6",
      "suspension_7",
    ],
  },
  {
    heading: "liability_indemnification",
    points: ["liability_1", "liability_2", "liability_3"],
  },
  {
    heading: "changes_terms_policies",
    points: ["changes_1"],
  },
  {
    heading: "governing_law_dispute",
    points: ["law_1", "law_2"],
  },
];

useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
    <div
        className="navbar-expand-lg navbar-light bg-light fixed-top"
        style={{ zIndex: "99999" }}
      >
        <LanguageSelector />
      </div>
      <Header />
      <div className="container w-75 my-4">
        <h2 className="my-4 mt-6" style={{ paddingTop: "90px" }}>
          {t.sellerTermsOfService}
        </h2>
         <p className="mb-1">
          <strong> {t.effectiveDate}:</strong> 09/01/2025​
        </p>
        <p className="mb-2">
          <strong> {t.lastUpdated}:</strong> 09/01/2025​
        </p>
        <p>
          {t.termsIntro } 
        </p>
        {termsData.map((section, index) => (
          <div key={index} className="mb-4">
            <h5 className="fw-bold">{t[section.heading]}</h5>
            <p>{t[section.description]}</p>
            <ul>
              {section.points.map((point, i) => (
                <li key={i}>{t[point]}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default TermsandService;
