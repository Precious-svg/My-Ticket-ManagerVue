import { useToast } from "vue-toastification";
import CustomToast from "../components/CustomToast.vue";
const toast = useToast();

export const showToast = (message, type = "info") => {
  toast(
    {
      component: CustomToast,
      props: { message, type },
    },
    {
      timeout: 3000,
      closeOnClick: true,
    }
  );
};
