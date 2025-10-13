import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuthCookie } from "../../utils/cookie";

const initialState = {
  user: null,
  loading: false,
  error: null,
  success: false,
  website: null,
  header: null,
  footer: null,
  hero: null,
  page: null,
  section: null,
  product: null,
  allProducts: null,
  sections: null,
  transactions: null,

  transaction: [],
  orders: null,
  owners: null,
  websiteData: [],
  stats: {},
  chart: null,
  transactionChart: null,
};

export const fetchWebsite = createAsyncThunk(
  "dashboard/fetchWebsite",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getAuthCookie();
      if (!token) {
        throw new Error("No token found");
      }
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/website/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch website" }
      );
    }
  }
);

export const fetchPublishedWebsite = createAsyncThunk(
  "dashboard/fetchPublishedWebsite",
  async (domain, { rejectWithValue, getState }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/website/domain/${domain}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch website" }
      );
    }
  }
);

export const createWebsite = createAsyncThunk(
  "dashboard/createWebsite",
  async (payload, { rejectWithValue }) => {
    try {
      const token = getAuthCookie();
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/website/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to create website" }
      );
    }
  }
);

// Create Header
export const createHeader = createAsyncThunk(
  "builder/createHeader",
  async (payload, { rejectWithValue }) => {
    try {
      const token = getAuthCookie();
      if (!token) throw new Error("No token found");

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/website/header`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to create header" }
      );
    }
  }
);

//createFooter
export const createFooter = createAsyncThunk(
  "builder/createFooter",
  async (payload, { rejectWithValue }) => {
    try {
      const token = getAuthCookie();
      if (!token) throw new Error("No token found");

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/website/footer`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to create footer" }
      );
    }
  }
);

//create Hero
export const createHero = createAsyncThunk(
  "builder/createHero",
  async (payload, { rejectWithValue }) => {
    try {
      const token = getAuthCookie();
      if (!token) throw new Error("No token found");

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/website/hero`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to create hero" }
      );
    }
  }
);

//create Pages
export const createPage = createAsyncThunk(
  "builder/createPage",
  async (payload, { rejectWithValue }) => {
    try {
      const token = getAuthCookie();
      if (!token) throw new Error("No token found");

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/website/pages/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to create page" }
      );
    }
  }
);

// create section
export const createSection = createAsyncThunk(
  "section/createSection",
  async (payload, { rejectWithValue }) => {
    try {
      const token = getAuthCookie();
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/website/pages/${payload.page_id}/sections`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to create section" }
      );
    }
  }
);

//create Product
export const createProduct = createAsyncThunk(
  "builder/createProduct",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = getAuthCookie();
      if (!token) throw new Error("No token found");

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/website/${id}/products`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to create product" }
      );
    }
  }
);

// fetch Products
export const fetchProducts = createAsyncThunk(
  "dashboard/fetchProducts",
  async ({ id, page, limit  }, { rejectWithValue }) => {
    try {
      // const token = getAuthCookie();
      // if (!token) {
      //   throw new Error('No token found');
      // }
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/website/website/${id}/products`,{
          params: { page, limit },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch products" }
      );
    }
  }
);

//edit Product
export const editProduct = createAsyncThunk(
  "builder/editProduct",
  async ({ id, productID, data }, { rejectWithValue }) => {
    try {
      const token = getAuthCookie();
      if (!token) throw new Error("No token found");

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/website/website/${id}/products/${productID}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to edit product" }
      );
    }
  }
);

//Delete Product
export const deleteProduct = createAsyncThunk(
  "builder/deleteProduct",
  async ({ id, productID }, { rejectWithValue }) => {
    try {
      const token = getAuthCookie();
      if (!token) throw new Error("No token found");

      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/website/website/${id}/products/${productID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to Delete product" }
      );
    }
  }
);

// updateWebsite
export const updateWebsite = createAsyncThunk(
  "dashboard/updateWebsite",
  async (payload, { rejectWithValue }) => {
    try {
      const token = getAuthCookie();
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/website/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to update website" }
      );
    }
  }
);

// update Hero
export const updateHero = createAsyncThunk(
  "dashboard/updateHero",
  async (payload, { rejectWithValue }) => {
    try {
      const token = getAuthCookie();
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/website/hero`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to update hero" }
      );
    }
  }
);

// update Header
export const updateHeader = createAsyncThunk(
  "dashboard/updateHeader",
  async (payload, { rejectWithValue }) => {
    try {
      const token = getAuthCookie();
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/website/header`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to update header" }
      );
    }
  }
);

// update Footer
export const updateFooter = createAsyncThunk(
  "dashboard/updateFooter",
  async (payload, { rejectWithValue }) => {
    try {
      const token = getAuthCookie();
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/website/footer`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to update footer" }
      );
    }
  }
);

// update Pages
export const updatePages = createAsyncThunk(
  "dashboard/updatePages",
  async ({ data, page_id }, { rejectWithValue }) => {
    try {
      const token = getAuthCookie();
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/website/pages/${page_id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to update Pages" }
      );
    }
  }
);

// fetch Sections
export const fetchSections = createAsyncThunk(
  "dashboard/fetchSections",
  async ({ website_id, slug }, { rejectWithValue }) => {
    try {
      // const token = getAuthCookie();
      // if (!token) {
      //   throw new Error('No token found');
      // }
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/website/pages/public/website/${website_id}/sections/${slug}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch sections" }
      );
    }
  }
);

// update Section By Id
export const updateSections = createAsyncThunk(
  "dashboard/updateSections",
  async ({ data, page_id, section_id }, { rejectWithValue }) => {
    try {
      const token = getAuthCookie();
      if (!token) throw new Error("No token found");

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/website/pages/${page_id}/sections/${section_id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("API Error:", error.response?.data);
      return rejectWithValue(
        error.response?.data || { message: "Failed to update sections" }
      );
    }
  }
);

// fetch Pgaes By Id
export const fetchPage = createAsyncThunk(
  "dashboard/fetchPage",
  async ({ id }, { rejectWithValue }) => {
    try {
      const token = getAuthCookie();
      if (!token) {
        throw new Error("No token found");
      }
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/website/pages/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch pages" }
      );
    }
  }
);

//Delete section
export const deleteSection = createAsyncThunk(
  "builder/deleteSection",
  async ({ pageID, sectionID }, { rejectWithValue }) => {
    try {
      const token = getAuthCookie();
      if (!token) throw new Error("No token found");

      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/website/pages/${pageID}/sections/${sectionID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to Delete sections" }
      );
    }
  }
);

// ftech oublish website but ID
export const fetchPublishedWebsitebyID = createAsyncThunk(
  "dashboard/fetchPublishedWebsitebyID",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/website/id/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to fetch website",
        status: error.response?.status || 500,
      });
    }
  }
);

export const fetchOrders = createAsyncThunk(
  "dashboard/fetchOrders",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const token = getAuthCookie();
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/orders/`,
        {
          params: { page, limit },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Fetched Orders Data:", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch orders" }
      );
    }
  }
);

export const fetchTransactions = createAsyncThunk(
  "dashboard/fetchTransactions",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const token = getAuthCookie();
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/transactions/`,
        {
          params: { page, limit }, // 👈 pass page & limit as query params
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch Transaction" }
      );
    }
  }
);
// Super Admin Api for fetch Transactions
export const fetchTransaction = createAsyncThunk(
  "superadmin/transactions",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const token = getAuthCookie();
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/superadmin/transactions`,
        {
          params: { page, limit },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch Transaction" }
      );
    }
  }
);

export const fetchOrder = createAsyncThunk(
  "superadmin/orders",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const token = getAuthCookie();
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/superadmin/orders`,
        {
          params: { page, limit },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch orders" }
      );
    }
  }
);

export const fetchOwners = createAsyncThunk(
  "superadmin/owners",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const token = getAuthCookie();
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/superadmin/owners`,
        {
          params: { page, limit },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch orders" }
      );
    }
  }
);

export const fetchWebsites = createAsyncThunk(
  "superadmin/websites",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const token = getAuthCookie();
      if (!token) throw new Error("No token found");

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/superadmin/websites`,
        {
          params: { page, limit },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch websites" }
      );
    }
  }
);

export const fetchStats = createAsyncThunk(
   "superadmin/dashboard/stats/year/month",
  async ({ year, month }, { rejectWithValue }) => {
    console.log(year, "Year")
    try {
      const token = getAuthCookie();
      if (!token) throw new Error("No token found");

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/superadmin/dashboard/stats?year=${year}&month=${month}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data; // ✅ only serializable data
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch transactions" }
      );
    }
  }
);


export const fetchOrderchart = createAsyncThunk(
  "/superadmin/dashboard/orders-chart/year",
  async ({ year, month }, { rejectWithValue }) => {
    try {
      const token = getAuthCookie();
      if (!token) throw new Error("No token found");

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/superadmin/dashboard/orders-chart?year=${year}&month=${month}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data; // ✅ only serializable data
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch transactions" }
      );
    }
  }
);

export const fetchTransactionchart = createAsyncThunk(
  "superadmin/dashboard/transactions-chart/year",
  async ({ year, month }, { rejectWithValue }) => {
    try {
      const token = getAuthCookie();
      if (!token) throw new Error("No token found");

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/superadmin/dashboard/transactions-chart?year=${year}&month=${month}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data; // ✅ only serializable data
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch transactions" }
      );
    }
  }
);


const builderSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Website Cases
      .addCase(fetchWebsite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWebsite.fulfilled, (state, action) => {
        state.loading = false;
        state.website = action.payload;
        state.success = true;
      })
      .addCase(fetchWebsite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch website";
      })
      // Fetch WebsitePublished Cases
      .addCase(fetchPublishedWebsite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublishedWebsite.fulfilled, (state, action) => {
        state.loading = false;
        state.website = action.payload;
        state.success = true;
      })
      .addCase(fetchPublishedWebsite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch website";
      })

      // Fetch WebsitePublished store Cases
      .addCase(fetchPublishedWebsitebyID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublishedWebsitebyID.fulfilled, (state, action) => {
        state.loading = false;
        state.website = action.payload;
        state.success = true;
      })
      .addCase(fetchPublishedWebsitebyID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch website";
      })

      // Create Website Cases
      .addCase(createWebsite.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createWebsite.fulfilled, (state, action) => {
        state.loading = false;
        state.website = action.payload;
        state.success = true;
      })
      .addCase(createWebsite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create website";
        state.success = false;
      })
      // Create Header Cases
      .addCase(createHeader.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createHeader.fulfilled, (state, action) => {
        state.loading = false;
        state.header = action.payload;
        state.success = true;
      })
      .addCase(createHeader.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create header";
        state.success = false;
      })

      // Create Footer Cases
      .addCase(createFooter.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createFooter.fulfilled, (state, action) => {
        state.loading = false;
        state.footer = action.payload;
        state.success = true;
      })
      .addCase(createFooter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create footer";
        state.success = false;
      })

      // create Hero Cases
      .addCase(createHero.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createHero.fulfilled, (state, action) => {
        state.loading = false;
        state.hero = action.payload;
        state.success = true;
      })
      .addCase(createHero.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create hero";
        state.success = false;
      })

      //create Pages Cases
      .addCase(createPage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createPage.fulfilled, (state, action) => {
        state.loading = false;
        state.page = action.payload;
        state.success = true;
      })
      .addCase(createPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create page";
        state.success = false;
      })

      // Create Section Cases
      .addCase(createSection.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSection.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.section = action.payload;
      })
      .addCase(createSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Error creating section";
      })
      // Create Product Cases
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.success = true;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create product";
        state.success = false;
      })
      //Fetch product
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload;
        state.success = true;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create product";
        state.success = false;
      })
      //Fetch Section
      .addCase(fetchSections.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action.payload;
        state.success = true;
      })
      .addCase(fetchSections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch sections";
        state.success = false;
      })
      // fetch orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.success = true;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch orders";
        state.success = false;
      })

      // fetch tarnsactions
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
        state.success = true;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch transactions";
        state.success = false;
      })

      // fetch tarnsactions
      .addCase(fetchTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transaction = action.payload;
        state.success = true;
      })
      .addCase(fetchTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch transactions";
        state.success = false;
      })
      // fetch orders
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.success = true;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch orders";
        state.success = false;
      })
      // fetch owners
      .addCase(fetchOwners.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchOwners.fulfilled, (state, action) => {
        state.loading = false;
        state.owners = action.payload;
        state.success = true;
      })
      .addCase(fetchOwners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch orders";
        state.success = false;
      })
      // fetch websutes
      .addCase(fetchWebsites.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchWebsites.fulfilled, (state, action) => {
        state.loading = false;
        state.websiteData = action.payload; // ✅ store only the array
        state.success = true;
      })
      .addCase(fetchWebsites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch orders";
        state.success = false;
      })
      // fetch stats
      .addCase(fetchStats.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
        state.success = true;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch orders";
        state.success = false;
      })
      // fetch order chart
      .addCase(fetchOrderchart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchOrderchart.fulfilled, (state, action) => {
        state.loading = false;
        state.chart = action.payload;
        state.success = true;
      })
      .addCase(fetchOrderchart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch orders-chart";
        state.success = false;
      })
      // fetch transactionChart
      .addCase(fetchTransactionchart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchTransactionchart.fulfilled, (state, action) => {
        state.loading = false;
        state.transactionChart = action.payload;
        state.success = true;
      })
      .addCase(fetchTransactionchart.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch transactions-chart";
        state.success = false;
      });
  },
});

export const { resetAuthState } = builderSlice.actions;
export default builderSlice.reducer;
