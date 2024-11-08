"use strict";

const GUEST_NAME_QUERY_PARAM = "guest";
const GUEST_ROLE_QUERY_PARAM = "role";
const HISTORY = "bride";
const ToastType = Object.freeze({
  SUCCESS: "show-success",
  ERROR: "show-error",
  INFO: "show-info"
});

const guestNameElement = document.getElementById("guestName");
const guestRoleElement = document.getElementById("guestRole");
const closeIcon = document.querySelector(".close");
const wishModal = document.getElementById("wishModal");
const wishMessage = document.getElementById("wishMessage");
const attendanceRadios = document.querySelectorAll("input[name='attendance']");
const submitWish = document.getElementById("submitWish");
const guestNameWish = document.getElementById("guestNameWish");
const guestNameOption = document.getElementById("guestNameOption");
const guestRoleOption = document.getElementById("guestRoleOption");
const wishButton = document.getElementById("wishButton");
const giftLinkElement = document.getElementById('giftLink');
const albumLinkElement = document.getElementById("albumLink");

const guestName = getRequiredQueryParamOrElse(GUEST_NAME_QUERY_PARAM, "Quý khách");
const guestRole = getRequiredQueryParamOrElse(GUEST_ROLE_QUERY_PARAM, "chúng tôi");

window.onload = function () {
  // setting guest name
  guestNameElement.innerHTML = guestName;
  guestNameWish.innerHTML = guestName;
  guestNameOption.innerHTML = guestName;

  // setting guest role
  guestRoleElement.innerHTML = guestRole;
  guestRoleOption.innerHTML = guestRole

  // setting message
  const agree = localStorage.getItem("result");
  if (agree) {
    updateButton(wishButton, false, `Cảm ơn lời chúc ý nghĩa của ${guestName}!`);
  }

  // setting album link
  giftLinkElement.href = "../gift/?" + "role=" + guestRole + "&guest=" + guestName + "&history=" + HISTORY;
  albumLinkElement.href = "../album/?" + "role=" + guestRole + "&guest=" + guestName + "&history=" + HISTORY;

  // Lắng nghe sự thay đổi trong textarea và radio button
  wishMessage.addEventListener("input", checkFormValidity);
  attendanceRadios.forEach(radio => {
      radio.addEventListener("change", checkFormValidity);
  });
};

function handelSubmit() {
  // Get submit data
  const agree = getRadioButtonValue(attendanceRadios);
  const messageWish = wishMessage.value.trim();

  // Confirm action
  if (!confirm(
      agree ? `Cảm ơn ${guestName} rất nhiều vì đã dành thời gian đến chung vui với hai ${guestRole}.\nRất mong được đón tiếp ${guestName} trong ngày đặc biệt này!`
      : `Thật tiếc khi ${guestName} không thể đến, nhưng hai ${guestRole} rất trân trọng tình cảm và lời chúc của ${guestName}.\nChúc ${guestName} luôn vui vẻ và hẹn gặp ${guestName} vào dịp gần nhất!`)) {
    return;
  }

  // Start processing
  updateButton(submitWish, false, "Đang gửi lời chúc...");

  // Create form data
  const formData = new FormData();
  formData.append("entry.297683140", "Nhà gái");
  formData.append("entry.903587558", guestName);
  formData.append("entry.1462042192", messageWish);
  formData.append("entry.650573155", agree == true ? "Có, tôi sẽ tham dự." : "Không, tôi rất tiếc không thể tham dự.");

  submitData(agree, formData);
}

function getRequiredQueryParamOrElse(param, defaultVal) {
  const urlValue = new URLSearchParams(window.location.search).get(param);
  if (urlValue) {
    return urlValue;
  }
  return defaultVal;
}

function openModal() {
  wishModal.style.display = "flex";
}

function closeModal(event) {
  if (event.target === wishModal || event.target === closeIcon) {
    wishModal.style.display = "none";
  }
}

function checkFormValidity() {
  const isMessageValid = wishMessage.value.trim().length > 0;
  const isAttendanceSelected = Array.from(attendanceRadios).some(radio => radio.checked);
  submitWish.disabled = !(isMessageValid && isAttendanceSelected);
}

function updateButton(button, state, label) {
  button.disabled = !state;
  button.innerText = label;
}

function submitData(agree, formData) {
  fetch("https://docs.google.com/forms/u/0/d/e/1FAIpQLSf3dlqaAYSeGYLEoPtqhnxKrTJNe5DlSsIJ1QxmYIh0e0IZ1Q/formResponse", {
    method: "POST",
    headers: {
      "Origin": "https://docs.google.com"
    },
    mode: "no-cors",
    body: formData
  })
  .then(response => {
    // Complete processing
    wishModal.style.display = "none";
    updateButton(wishButton, false, `Cảm ơn lời chúc ý nghĩa của ${guestName}!`);
    showToast("Gửi lời chúc thành công", ToastType.SUCCESS);
    // Save result to localstorage
    localStorage.setItem("result", agree);
  })
  .catch(error => {
    showToast("Gửi lời chúc thất bại, vui lòng thử lại!", ToastType.ERROR);
    console.error("Error submitting form:", error);
    // Error processing
    wishModal.style.display = "none";
    updateButton(submitWish, true, "Gửi lời chúc");
  });
}

function showToast(message, type) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.classList.add(type);

  setTimeout(() => {
    toast.classList.remove(type);
  }, 2000);
}

function getRadioButtonValue(radios) {
  return Array.from(radios).find(radio => radio.checked).value === "yes";
}
