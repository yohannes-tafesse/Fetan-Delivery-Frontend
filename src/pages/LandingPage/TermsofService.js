import React, { useContext, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import LanguageSelector from "../Languages/LanguageSelector";
import { LanguageContext } from "../Languages/LanguageContext";


const TermsofService = () => {
      const { t } = useContext(LanguageContext);
  
  //  const termsData = [
  //   {
  //     heading: "1. Eligibility & Registration",
  //     points: [
  //         "You must be at least 18 years old or have parental/guardian consent to use Fetan Market.",
  //         "You agree to provide accurate and complete information when registering or placing orders.",
  //       "You are responsible for maintaining the confidentiality of your account and OTP verification codes.",
  //     ],
  //   },
  //   {
  //     heading: "2. Buying on Fetan Market",
  //     points: [
  //         "Products are listed and sold by independent sellers, not Fetan Market.",
  //         "Fetan Market acts as a platform to connect buyers and sellers, process payments, and facilitate transactions.",
  //       "Product descriptions, images, and prices are provided by sellers; while Fetan Market seeks accuracy, it does not guarantee completeness or error-free listings.",
  //     ],
  //   },
  //   {
  //     heading: "3. Orders & Payments",
  //     points: [
  //         "By placing an order, you commit to pay the listed price (in ETB) plus applicable taxes, delivery, and service fees.",
  //       "Payment must be made using methods supported by Fetan Market.",
  //       "Orders are confirmed only after successful payment authorization.",
  //       "Fetan Market reserves the right to cancel orders due to stock errors, fraudulent activity, or technical issues.",
  //     ],
  //   },
  //   {
  //     heading: "4. Delivery & Shipping",
  //     points: [
  //         "Delivery timelines are provided by sellers and may vary.",
  //         "Fetan Market is not liable for shipping delays but may provide a channel to contact sellers.",
  //       "Risk of loss passes to you once products are delivered by the seller or delivery partner.",
  //     ],
  //   },
  //   {
  //     heading: "5. Returns & Refunds",
  //     points: [
  //         "All returns, exchanges, and refunds must be resolved directly between you (the buyer) and the seller.",
  //       "Fetan Market does not process or guarantee refunds.",
  //       "Each seller may have their own return/refund policy, which you are responsible for reviewing before purchase.",
  //       "Certain items (e.g., food, personal care, digital goods) may be non-returnable.",
  //     ],
  //   },
  //   {
  //     heading: "6. Buyer Responsibilities",
  //     description: "You agree not to:",
  //     points: [
  //       "Provide false or misleading order information.",
  //       "Refuse payments after placing confirmed orders.",
  //       "Abuse return/refund processes with sellers.",
  //       "Use the platform for fraud, money laundering, or illegal activities.",
  //       "Harass or threaten sellers or customer support.",
  //     ],
  //   },
  //   {
  //     heading: "7. Reviews & Feedback",
  //     points: [
  //       "You may leave reviews and ratings for products or sellers.",
  //       "Reviews must be honest, accurate, and not abusive.",
  //       "Fetan Market may remove reviews that are false, offensive, or manipulative.",
  //     ],
  //   },
  //   {
  //     heading: "8. Intellectual Property",
  //     points: [
  //         "Content on Fetan Market (logos, branding, design, product images uploaded by sellers) is protected by intellectual property laws.",
  //       "You may not copy, resell, or misuse content without permission."],
  //   },
  //   {
  //     heading: "9. Disclaimers & Liability",
  //     points: [
  //         "Fetan Market is a marketplace platform and is not the seller of listed products.",
  //         "Sellers are responsible for product quality, safety, legality, returns, refunds, and warranties.",
  //       "Fetan Market provides services “as is” without warranties of uninterrupted access.",
  //       "Fetan Market is not liable for indirect or consequential damages, lost profits, or disputes between buyers and sellers.",
  //     ],
  //   },
  //   {
  //     heading: "10. Dispute Resolution",
  //     points: [
  //         "For order issues, you must first contact the seller through the platform. ",
  //         "If unresolved, Fetan Market may provide communication assistance but is not obligated to resolve or fund disputes.",
  //       "Any legal disputes will be governed by Ethiopian law and resolved in Ethiopian courts.",
  //     ],
  //   },
  //   {
  //     heading: "11. Account Suspension",
  //     points: [
  //         "Fetan Market may suspend or terminate buyer accounts that:",
  //       "Engage in fraud or abuse.", "Violate these Terms.", "Harm sellers, customers, or the platform."],
  //   },
  //   {
  //     heading: "12. Changes to Terms",
  //     points: [
  //         "Fetan Market may update these Terms at any time. Updates will be posted on the platform, and continued use constitutes acceptance.",

  //     ],
  //   },
  // ];


 const termsData = [
  {
    heading: "buyer_eligibility_registration",
    points: [
      "buyer_eligibility_1",
      "buyer_eligibility_2",
      "buyer_eligibility_3",
    ],
  },
  {
    heading: "buyer_account_security",
    points: [
      "buyer_account_security_1",
      "buyer_account_security_2",
      "buyer_account_security_3",
    ],
  },
  {
    heading: "buyer_orders_fulfillment_returns",
    points: [
      "buyer_orders_1",
      "buyer_orders_2",
      "buyer_orders_3",
      "buyer_orders_4",
    ],
  },
  {
    heading: "buyer_delivery_shipping",
    points: [
      "buyer_delivery_1",
      "buyer_delivery_2",
      "buyer_delivery_3",
    ],
  },
  {
    heading: "buyer_returns_refunds",
    points: [
      "buyer_returns_1",
      "buyer_returns_2",
      "buyer_returns_3",
      "buyer_returns_4",
    ],
  },
  {
    heading: "buyer_responsibilities",
    points: [
      "buyer_responsibilities_1",
      "buyer_responsibilities_2",
      "buyer_responsibilities_3",
      "buyer_responsibilities_4",
      "buyer_responsibilities_5",
    ],
  },
  {
    heading: "buyer_reviews_feedback",
    points: [
      "buyer_reviews_1",
      "buyer_reviews_2",
      "buyer_reviews_3",
    ],
  },
  {
    heading: "buyer_intellectual_property",
    points: [
      "buyer_ip_1",
      "buyer_ip_2",
    ],
  },
  {
    heading: "buyer_disclaimers_liability",
    points: [
      "buyer_disclaimers_1",
      "buyer_disclaimers_2",
      "buyer_disclaimers_3",
      "buyer_disclaimers_4",
    ],
  },
  {
    heading: "buyer_dispute_resolution",
    points: [
      "buyer_dispute_1",
      "buyer_dispute_2",
      "buyer_dispute_3",
    ],
  },
  {
    heading: "buyer_account_suspension",
    points: [
      "buyer_suspension_1",
      "buyer_suspension_2",
      "buyer_suspension_3",
    ],
  },
  {
    heading: "buyer_changes_terms",
    points: [
      "buyer_changes_1",
    ],
  },
  // {
  //   heading: "buyer_governing_law",
  //   points: [
  //     "buyer_law_1",
  //     "buyer_law_2",
  //   ],
  // },
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
        <LanguageSelector/>
      </div>
      <Header />

      <div className="container w-75 my-4">
        <h2 className="my-4 mt-6" style={{ paddingTop: "90px" }}>
          {t.buyerTermsOfService} 
        </h2>
        <p className="mb-1">
          <strong>{t.effectiveDate}:</strong> 09/01/2025​
        </p>
        <p className="mb-2">
          <strong>{t.lastUpdated}:</strong> 09/01/2025​
        </p>

        <p>
          {t.buyertermsintro}
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

export default TermsofService;
