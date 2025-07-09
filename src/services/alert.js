import Swal from "sweetalert2";

export const showAlert = (icon, title, text) => {
  return Swal.fire({
    icon,
    title,
    text,
    confirmButtonColor: "#646cff",
  });
};

export const showSuccess = (title, text) => showAlert("success", title, text);
export const showError = (title, text) => showAlert("error", title, text);
export const showWarning = (title, text) => showAlert("warning", title, text);
export const showInfo = (title, text) => showAlert("info", title, text);
export const showQuestion = (title, text) => showAlert("question", title, text);

export const showConfirmDialog = (
  title,
  text,
  confirmButtonText = "Confirm"
) => {
  return Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#646cff",
    cancelButtonColor: "#d33",
    confirmButtonText,
  });
};

export const showToast = (icon, title) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon,
    title,
  });
};
