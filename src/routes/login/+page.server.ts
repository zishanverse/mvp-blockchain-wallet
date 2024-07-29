import { redirect } from "@sveltejs/kit";
import NeucronSDK from "neucron-sdk";

export const actions = {
  login: async ({ request }) => {
    const data = await request.formData();

    const neucron = new NeucronSDK();

    const authModule = neucron.authentication;
    const walletModule = neucron.wallet;

    const loginResponse = await authModule.login({
      email: data.get("email"),
      password: data.get("password"),
    });

    if (loginResponse.success) {
      const DefaultWalletBalance = await walletModule.getWalletBalance({
        userId: loginResponse.data.userId,
      });

      return {
        auth: true,
        balance: DefaultWalletBalance.data.balance.summary,
      };
    } else {
      return {
        auth: false,
        message: "Login failed. Please check your credentials.",
      };
    }
  },
};
