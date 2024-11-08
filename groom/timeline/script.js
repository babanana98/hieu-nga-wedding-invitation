"use strict";

const GUEST_NAME_QUERY_PARAM = "guest";
const GUEST_ROLE_QUERY_PARAM = "role";

const invitationLinkElement = document.getElementById('invitationLink');

window.onload = function () {
  const guestName = getRequiredQueryParamOrElse(GUEST_NAME_QUERY_PARAM, "Quý khách");
  const guestRole = getRequiredQueryParamOrElse(GUEST_ROLE_QUERY_PARAM, "chúng tôi");
  
  invitationLinkElement.href = `../?role=${guestRole}&guest=${guestName}`;
};

function getRequiredQueryParamOrElse(param, defaultVal) {
  const urlValue = new URLSearchParams(window.location.search).get(param);
  if (urlValue) {
    return urlValue;
  }
  return defaultVal;
}
