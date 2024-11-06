"use strict";

// Constant
const GUEST_NAME_QUERY_PARAM = "guest";
const GUEST_ROLE_QUERY_PARAM = "role";

// JavaScript for handling image popup, zoom, and drag
const invitationLinkElement = document.getElementById('invitationLink');
const albumLinkElement = document.getElementById('albumLink');

window.onload = function () {
  const guestName = getRequiredQueryParamOrElse(GUEST_NAME_QUERY_PARAM, "Quý khách");
  const guestRole = getRequiredQueryParamOrElse(GUEST_ROLE_QUERY_PARAM, "chúng tôi");
  invitationLinkElement.href = invitationLinkElement.href + "?" + "role=" + guestRole + "&guest=" + guestName;
  albumLinkElement.href = albumLinkElement.href + "?" + "role=" + guestRole + "&guest=" + guestName;
};

function getRequiredQueryParamOrElse(param, defaultVal) {
  const urlValue = new URLSearchParams(window.location.search).get(param);
  if (urlValue) {
    return urlValue;
  }
  return defaultVal;
}

function copyText(elementId) {
  const textToCopy = document.getElementById(elementId).innerText;

  navigator.clipboard.writeText(textToCopy)
    .then(() => showToast("Đã sao chép vào clipboard!"))
    .catch((error) => {
      console.error("Sao chép thất bại:", error);
      showToast("Không thể sao chép nội dung, vui lòng thử lại.");
    });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}
