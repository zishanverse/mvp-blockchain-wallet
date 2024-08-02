import NeucronSDK from "neucron-sdk";

export const neucron = new NeucronSDK();

export const authModule = neucron.authentication;
export const walletModule = neucron.wallet;