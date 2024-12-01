import { toast } from "react-toastify";

const showToast = (type, message) => {
    const options = {
        autoClose: 1700,
        closeOnClick: true,
        draggable: true,
    };

    if (type === "success") {
        toast.success(message, {
            ...options,
            className: "toast-success",
            progressClassName: "Toastify__progress-bar--success",
        });
    } else if (type === "fail") {
        toast.error(message, {
            ...options,
            className: "toast-fail",
            progressClassName: "Toastify__progress-bar--fail",
        });
    }
};

export default showToast;
