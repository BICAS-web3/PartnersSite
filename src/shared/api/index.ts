import { createEffect, createEvent } from "effector";

export const BaseApiUrl = "/api";
export const BaseStaticUrl = "/static";

export type T_Localization = {};
export type T_Networks = {
  networks: Array<T_NetworkFullInfo>;
};
export type T_NetworkFullInfo = {
  basic_info: T_NetworkInfo;
  explorers: T_BlockExplorerUrl[];
  rpcs: T_RpcUrl[];
};
export type T_NetworkInfo = {
  network_id: number;
  network_name: string;
  short_name: string;
  currency_name: string;
  currency_symbol: string;
  decimals: number;
};
export type T_BlockExplorerUrl = {
  id: number;
  network_id: number;
  url: string;
};
export type T_RpcUrl = {
  id: number;
  network_id: number;
  url: string;
};
export type T_ApiResponse = {
  status: string;
  body: // | T_ErrorText
  T_Networks | T_Rpcs;
  // | T_Token_
  // | T_Game
  // | T_Nickname
  // | T_Player
  // | T_Bets
  // | T_Tokens
  // | T_GameAbi
  // | T_BlockExplorers
  // | T_Totals
  // | T_LatestGames
  // | T_PlayerTotals
  // | T_TokenPrice
  // | T_NFTMarket;
};
export type T_Rpcs = {
  rpcs: Array<T_RpcUrl>;
};
export type T_Tokens = {
  tokens: Array<T_Token>;
};
export const getRpcsFx = createEffect<T_GetRpcs, T_ApiResponse, string>(
  async (form) => {
    return fetch(`${BaseApiUrl}/rpc/get/${form.network_id}`, {
      method: "GET",
    })
      .then(async (res) => await res.json())
      .catch((e) => e);
  }
);
export type T_Token = {
  id: number;
  network_id: number;
  name: string;
  icon: string;
  contract_address: string;
};
export type T_GetRpcs = {
  network_id: number;
};
export const getLocalizationFx = createEffect<string, T_Localization, string>(
  async (language) => {
    return fetch(`${BaseStaticUrl}/localizations/${language}.json`, {
      method: "GET",
    })
      .then(async (res) => await res.json())
      .catch((e) => e);
  }
);
export const getNetworksFx = createEffect<void, T_ApiResponse, string>(
  async (_) => {
    return fetch(`${BaseApiUrl}/network/list`, {
      method: "GET",
    })
      .then(async (res) => await res.json())
      .catch((e) => {
        console.log(1, e);
      });
  }
);

export type T_GetTokens = {
  network_id: number;
};
export const getTokens = createEffect<T_GetTokens, T_ApiResponse, string>(
  async (form) => {
    return fetch(`${BaseApiUrl}/token/get/${form.network_id}`, {
      method: "GET",
    })
      .then(async (res) => await res.json())
      .catch((e) => e);
  }
);

export type T_RegisterUser = {
  country: string;
  name: string;
  main_wallet: `0x${string}`;
  signature: string;
  traffic_source: string;
  users_amount_a_month: number;
};
export const registerUser = createEffect<T_RegisterUser, T_ApiResponse, string>(
  async (form) => {
    return fetch(`https://affiliate.greekkeepers.io/api/partner/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then(async (res) => await res.json())
      .catch((e) => e);
  }
);

export type T_RegisterContact = {
  name: string;
  url: string;
  timestamp: number | string;
  wallet: string;
  auth: string;
};

export const registerContact = createEffect<
  T_RegisterContact,
  T_ApiResponse,
  string
>(async (form) => {
  return fetch(`http://127.0.0.1:8586/api/partner/contacts/add`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      timestamp: form.timestamp.toString(),
      wallet: form.wallet,
      auth: form.auth,
    },
    body: JSON.stringify({ name: form.name, url: form.url }),
  })
    .then(async (res) => await res.json())
    .catch((e) => e);
});
