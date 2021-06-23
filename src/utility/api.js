export const baseUrl = "http://demoprakash.nephost.net";
export const baseUrlApi = `${baseUrl}/api/v1`;

export const loginUrl = `${baseUrlApi}/admin/auth/signin`;
export const categoriesUrl = `${baseUrlApi}/admin/category/main/list`;
export const productListUrl = `${baseUrlApi}/admin/product/list`;
export const listOrderUrl = `${baseUrlApi}/admin/order/list`;
export const listVendorApi = `${baseUrlApi}/admin/vendor/list`;
export const listUsersApi = `${baseUrlApi}/admin/user/list`;

export const siteSettingapi = `${baseUrlApi}/admin/site/settings`;

export const suspendProductApi = (prodId) =>
  `${baseUrlApi}/admin/product/${prodId}/suspend`;
export const approveProductApi = (prodId) =>
  `${baseUrlApi}/admin/product/${prodId}/approve`;
export const listEnquaryList = `${baseUrlApi}/admin/product-enquiry/list`;

export const suspendVendorApi = (vendorId) =>
  `${baseUrlApi}/admin/vendor/${vendorId}/account/suspend`;

export const approveVendorApi = (vendorId) =>
  `${baseUrlApi}/admin/vendor/${vendorId}/account/approve`;

export const orderDescriptionApi = (orderId) =>
  `${baseUrlApi}/admin/order/${orderId}/detail`;
// category
export const addMainCategoryApi = `${baseUrlApi}/admin/category/main/create`;
export const addSubCategoryApi = `${baseUrlApi}/admin/category/sub/create`;
export const addChildCategoryApi = `${baseUrlApi}/admin/category/child/create`;

// orders worrk
export const cancilOrderApi = (orderId) =>
  `${baseUrlApi}/admin/order/${orderId}/cancel`;
export const declineOrderApi = (orderId) =>
  `${baseUrlApi}/admin/order/${orderId}/decline`;
export const shipOrderApi = (orderId) =>
  `${baseUrlApi}/admin/order/${orderId}/ship`;
export const completeOrderApi = (orderId) =>
  `${baseUrlApi}/admin/order/${orderId}/complete`;
export const refundOrderApi = (orderId) =>
  `${baseUrlApi}/admin/order/${orderId}/refund`;
export const vendorDetailsApi = (vendorId) =>
  `${baseUrlApi}/admin/vendor/${vendorId}/detail`;
export const deleteMainCategoryApi = (categoryId) =>
  `${baseUrlApi}/admin/category/main/${categoryId}/remove`;
export const deleteSubCategoryApi = (categoryId) =>
  `${baseUrlApi}/admin/category/sub/${categoryId}/remove`;
export const deleteChildCategoryApi = (categoryId) =>
  `${baseUrlApi}/admin/category/child/${categoryId}/remove`;
