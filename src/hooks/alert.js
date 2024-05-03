import Swal from 'sweetalert2';

export const showSuccessAlert = (message) => {
  Swal.fire({
    icon: 'success',
    title: 'Success!',
    text: message,
  });
};

export const showErrorAlert = (message) => {
  Swal.fire({
    icon: 'error',
    title: 'Error!',
    text: message,
  });
};
