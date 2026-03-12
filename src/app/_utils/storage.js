"use client";

export const CART_STORAGE_KEY = "cart";
export const DELIVERY_LOCATION_STORAGE_KEY = "deliveryLocation";
export const CART_UPDATED_EVENT = "cart-updated";
export const DELIVERY_LOCATION_UPDATED_EVENT = "delivery-location-updated";

export const readCart = () => {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

export const getCartItemCount = () =>
  readCart().reduce((total, item) => total + (Number(item.quantity) || 0), 0);

export const writeCart = (items) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
};

export const readDeliveryLocation = () => {
  if (typeof window === "undefined") return "";

  return localStorage.getItem(DELIVERY_LOCATION_STORAGE_KEY) || "";
};

export const writeDeliveryLocation = (value) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(DELIVERY_LOCATION_STORAGE_KEY, value);
  window.dispatchEvent(new Event(DELIVERY_LOCATION_UPDATED_EVENT));
};

export const clearDeliveryLocation = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem(DELIVERY_LOCATION_STORAGE_KEY);
  window.dispatchEvent(new Event(DELIVERY_LOCATION_UPDATED_EVENT));
};
