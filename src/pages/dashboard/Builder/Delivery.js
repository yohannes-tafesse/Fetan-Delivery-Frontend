import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../../features/dashboard/builderSlice";
import { NavLink } from "react-router-dom";
import NewPagination from "./Pagination/NewPagination";

const Delivery = () => {
  const dispatch = useDispatch();
  const { website, orders, loading, error } = useSelector(
    (state) => state.dashboard
  );

  const order = orders?.data;
  const [expandedId, setExpandedId] = useState(null);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  useEffect(() => {
    dispatch(fetchOrders({ page, limit }));
  }, [dispatch, page, limit]);

 

  return (
    <div className="d-flex flex-column  container-fluid justify-content-between mb-4 ">
      <div className=" ">
        <div className="text-left fw-bold fs-4 text-light">Delivery</div>

        {loading && (
          <div className="text-center text-warning fw-bold">
            Loading orders...
          </div>
        )}

        {error && (
          <div className="text-center text-danger fw-bold">Error: {error}</div>
        )}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle text-center text-info">
              <thead className="table-light">
                <tr>
                  <th className="text-info">Order_id</th>
                  <th className="text-info">Txn_id</th>
                  <th className="text-info">Amount</th>
                  <th className="text-info">Date</th>
                  <th className="text-info">Status</th>
                  <th className="text-info">Name</th>
                  <th className="text-info">Email</th>
                  <th className="text-info">Phone</th>
                </tr>
              </thead>
              <tbody>
                {order?.length > 0 ? (
                  order?.map((order) => (
                    <React.Fragment key={order.id}>
                      <tr>
                        {/* Order info */}
                        <td>#{order.id || "N/A"}</td>
                        <td>{order.txnid || "N/A"}</td>
                        <td>ETB {order.total_value}</td>
                        <td>
                          {" "}
                          {new Date(order.created_at)
                            .toISOString()
                            .slice(0, 10)}
                        </td>
                        <td>
                          <span
                            style={{
                              color:
                                order.status === "complete"
                                  ? "green"
                                  : order.status === "pending"
                                  ? "orange"
                                  : "red",
                            }}
                          >
                            {order.status || "N/A"}
                          </span>
                        </td>

                        <td>{order.name || "N/A"}</td>
                        <td>{order.email || "N/A"}</td>
                        <td>{order.phone || "N/A"}</td>
                      </tr>

                      {/* Expanded details */}
                      {/* Expanded details */}
                      {expandedId === order.id && (
                        <tr className="table-info">
                          <td></td>
                          <td colSpan="8">
                            <div className="p-3 small text-muted text-start w-100">
                              {/* Items Table */}
                              {order.items?.length > 0 ? (
                                <div className="mt-2">
                                  <strong className="d-block mb-2">
                                    Ordered Items:
                                  </strong>
                                  <div className="table-responsive">
                                    <table className="table table-sm table-bordered text-center w-100">
                                      <thead className="table-light text-info">
                                        <tr>
                                          {/* <th className="text-info">
                                            Product ID
                                          </th> */}
                                          <th className="text-info">
                                            {" "}
                                            Product Name
                                          </th>
                                          <th className="text-info">
                                            Quantity
                                          </th>
                                          <th className="text-info">Price</th>
                                          <th className="text-info">View</th>
                                        </tr>
                                      </thead>
                                      <tbody className="table-danger text-info">
                                        {order.items.map((item, idx) => (
                                          <tr key={idx}>
                                            {/* <td>{item.product_id}</td> */}
                                            <td>{item.product_name}</td>
                                            <td>{item.quantity}</td>
                                            <td>${item.total_price}</td>
                                            <td>
                                              <NavLink
                                                target="_blank"
                                                title="See Product"
                                                to={`/store/${website.domain}/cshop/product/${item.product_id}`}
                                              >
                                                <i className="bi bi-eye"></i>
                                              </NavLink>
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              ) : (
                                <div className="text-muted">
                                  No items in this order.
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center text-muted">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* Pagination */}
      {!loading && !error && (
        <NewPagination
          page={page}
          totalPages={orders?.pagination?.total_pages || 1}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default Delivery;
