"use strict";

const GUEST_NAME_QUERY_PARAM = "guest";
const GUEST_ROLE_QUERY_PARAM = "role";
const HISTORY_QUERY_PARAM = "history";

const invitationLinkElement = document.getElementById('invitationLink');

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

function setInvitationLinkAndBox(history, guestName, guestRole) {
  switch(history) {
    case "groom":
      invitationLinkElement.href = `../groom/?role=${guestRole}&guest=${guestName}`;
      break;
    case "bride":
      invitationLinkElement.href = `../bride/?role=${guestRole}&guest=${guestName}`;
      break;
    default:
      invitationLinkElement.href = `../?role=${guestRole}&guest=${guestName}`;
  }
}
