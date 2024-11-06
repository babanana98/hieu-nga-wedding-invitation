"use strict";

// Constant
const GUEST_NAME_QUERY_PARAM = "guest";
const GUEST_ROLE_QUERY_PARAM = "role";

const groomLink = document.getElementById('groomLink');
const brideLink = document.getElementById('brideLink');

window.onload = function () {
  const guestName = getRequiredQueryParamOrElse(GUEST_NAME_QUERY_PARAM, "Quý khách");
  const guestRole = getRequiredQueryParamOrElse(GUEST_ROLE_QUERY_PARAM, "chúng tôi");
  groomLink.href = groomLink.href + "?" + "role=" + guestRole + "&guest=" + guestName;
  brideLink.href = brideLink.href + "?" + "role=" + guestRole + "&guest=" + guestName;
};

function getRequiredQueryParamOrElse(param, defaultVal) {
  const urlValue = new URLSearchParams(window.location.search).get(param);
  if (urlValue) {
    return urlValue;
  }
  return defaultVal;
}
