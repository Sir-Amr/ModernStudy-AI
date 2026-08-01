import { toast } from "sonner";

export function useToast() {
  const showSuccess = (message, description) => {
    toast.success(message, { description });
  };

  const showError = (message, description) => {
    toast.error(message, { description });
  };

  const showInfo = (message, description) => {
    toast.info(message, { description });
  };

  const showWarning = (message, description) => {
    toast.warning(message, { description });
  };

  const showLoading = (message, description) => {
    return toast.loading(message, { description });
  };

  return { showSuccess, showError, showInfo, showWarning, showLoading };
}