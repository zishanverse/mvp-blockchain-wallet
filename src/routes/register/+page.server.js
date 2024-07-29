import { redirect } from "@sveltejs/kit";
import NeucronSDK from "neucron-sdk";

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
      return {
        success: false,
        message: "Please fill in all fields",
      };
    }

    try {
      const neucron = new NeucronSDK();
      const authModule = neucron.authentication;

      const signUpResponse = await authModule.signUp({
        email,
        password,
      });

      if (signUpResponse.success) {
        throw redirect(303, '/login'); // Redirect to login page after successful registration
      } else {
        return {
          success: false,
          message: signUpResponse.message || "Registration failed. Please try again.",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.message || "Registration failed. Please try again.",
      };
    }
  }
};
