import {
  ref,
} from 'vue';
import {
  InputState,
} from '../enums';
import {
  type Toast,
} from '../components/__types/AntToaster.types';

export const useToaster = () => {
  const toasts = ref<Toast[]>([]);

  return {
    getToasts() {
      return [
        ...toasts.value,
      ].reverse();
    },
    toast(toast: Toast) {
      const id = `${Date.now()}`;

      toasts.value.push({
        ...toast,
        id,
      });

      setTimeout(() => {
        const index = toasts.value.findIndex(toast => toast.id === id);

        if (index !== -1) {
          toasts.value.splice(index, 1);
        }
      }, 5000);
    },
    removeToast(toast: Toast) {
      const index = toasts.value.indexOf(toast);

      if (index !== -1) {
        toasts.value.splice(index, 1);
      }
    },
    toastSuccess(message: string) {
      this.toast({
        title: message,
        type: InputState.success,
      });
    },
    toastError(message: string) {
      this.toast({
        title: message,
        type: InputState.danger,
      });
    },
    toastWarning(message: string) {
      this.toast({
        title: message,
        type: InputState.warning,
      });
    },
    toastInfo(message: string) {
      this.toast({
        title: message,
        type: InputState.info,
      });
    },
  };
};
