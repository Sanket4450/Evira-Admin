export const API_BASE_URL = 'http://65.0.143.176/api/v1'

// Auth
export const LOGIN = '/auth/login'
export const FORGOT_PASSWORD = '/auth/forgot-password/email'
export const VERIFY_RESET_OTP = '/auth/verify-reset-otp'
export const REFRESH_TOKENS = '/auth/refresh-tokens'
export const RESET_PASSWORD = '/auth/reset-password'
export const LOGOUT = '/auth/logout'

// Profile
export const GET_PROFILE = '/users/profile'
export const UPDATE_PROFILE = '/users/profile'

// Upload
export const UPLOAD_FILE = '/admin/upload'

// Dashboard
export const GET_DASHBOARD = '/admin/dashboard'

// Users
export const GET_USERS = '/admin/users'
export const GET_USER = '/admin/users'
export const UDPATE_USER = '/admin/users'
export const DELETE_USER = '/admin/users'

// Categories
export const GET_CATEGORIES = '/admin/categories'
export const ADD_CATEGORY = '/admin/categories'
export const UPDATE_CATEGORY = '/admin/categories'
export const DELETE_CATEGORY = '/admin/categories'

// Products
export const GET_PRODUCTS = '/admin/products'
export const GET_PRODUCT = '/admin/products'
export const ADD_PRODUCT = '/admin/products'
export const UPDATE_PRODUCT = '/admin/products'
export const DELETE_PRODUCT = '/admin/products'
export const ADD_PRODUCT_VARIANT = '/admin/products/variants'
export const UPDATE_PRODUCT_VARIANT = '/admin/variants'
export const DELETE_PRODUCT_VARIANT = '/admin/variants'

// Reviews
export const GET_REVIEWS = '/products/reviews'
export const DELETE_REVIEW = '/admin/reviews'

// Offers
export const GET_OFFER = '/admin/offers'
export const ADD_OFFER = '/admin/offers'
export const UPDATE_OFFER = '/admin/offers'
export const DELETE_OFFER = '/admin/offers'

// Shipping Types
export const GET_SHIPPING_TYPES = '/admin/shipping'
export const ADD_SHIPPING_TYPE = '/admin/shipping'
export const UPDATE_SHIPPING_TYPE = '/admin/shipping'
export const DELETE_SHIPPING_TYPE = '/admin/shipping'

// Promo Codes
export const GET_PROMO_CODES = '/admin/promo'
export const ADD_PROMO_CODE = '/admin/promo'
export const UPDATE_PROMO_CODE = '/admin/promo'
export const DELETE_PROMO_CODE = '/admin/promo'

// Orders
export const GET_ORDERS = '/admin/orders'
export const GET_ORDER = '/admin/orders'
export const UPDATE_ORDER = '/admin/orders'

// FAQs
export const GET_FAQS = '/admin/faqs'
export const ADD_FAQ = '/admin/faqs'
export const UPDATE_FAQ = '/admin/faqs'
export const DELETE_FAQ = '/admin/faqs'

// Messages
export const GET_MESSAGES = '/admin/messages'
export const DELETE_MESSAGE = '/admin/messages'
