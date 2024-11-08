"use strict";

// Constant
const GUEST_NAME_QUERY_PARAM = "guest";
const GUEST_ROLE_QUERY_PARAM = "role";
const HISTORY_QUERY_PARAM = "history";

// JavaScript for handling image popup, zoom, and drag
const invitationLinkElement = document.getElementById('invitationLink');
const albumLinkElement = document.getElementById('albumLink');
const giftBoxs = document.querySelectorAll('.gift-box');

window.onload = function () {
  const guestName = getRequiredQueryParamOrElse(GUEST_NAME_QUERY_PARAM, "Quý khách");
  const guestRole = getRequiredQueryParamOrElse(GUEST_ROLE_QUERY_PARAM, "chúng tôi");
  const history = getRequiredQueryParamOrElse(HISTORY_QUERY_PARAM, "../");
  
  setInvitationLinkAndBox(history, guestName, guestRole);
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

function setInvitationLinkAndBox(history, guestName, guestRole) {
  switch(history) {
    case "groom":
      invitationLinkElement.href = `../groom/?role=${guestRole}&guest=${guestName}`;
      displayGiftBox(history);
      break;
    case "bride":
      invitationLinkElement.href = `../bride/?role=${guestRole}&guest=${guestName}`;
      displayGiftBox(history);
      break;
    default:
      invitationLinkElement.href = `../?role=${guestRole}&guest=${guestName}`;
      giftBoxs.forEach(box => box.classList.add("display-gift-box"));
  }
}

function displayGiftBox(history) {
  giftBoxs.forEach(box => {
    if (box.getAttribute("name") == history) {
      box.classList.add("display-gift-box");
      return;
    }
  });
}
