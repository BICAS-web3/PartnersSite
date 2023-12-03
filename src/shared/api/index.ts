import { createEffect } from "effector";

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

export type R_getUser = {
  basic: {
    name: string;
    country: string;
    traffic_source: string;
    users_amount_a_month: number;
    main_wallet: string;
    program: string;
    is_verified: boolean;
  };
  contacts: {
    id: number;
    name: string;
    url: string;
    partner_id: string;
  }[];
  sites: [];
};

export type T_UserSitesResp = {
  basic: {
    id: number;
    internal_id: number;
    name: string;
    partner_id: string;
    url: string;
  };
  sub_ids: [
    {
      id: number;
      internal_id: number;
      name: string;
      partner_id: string;
      site_id: number;
      url: string;
    }
  ];
}[];

export type T_RegisterPage = {
  timestamp: number | string;
  wallet: string;
  auth: string;
  name: string;
  url: string;
};

export type T_RegisterSubId = {
  timestamp: number | string;
  wallet: string;
  auth: string;
  name: string;
  url: string;
  internal_site_id: number;
};

export type T_ClicksResponse = {
  clicks: number;
  id: number;
  partner_id: string;
  sub_id_internal: number;
};

export type T_GetSubIdClickResponse = {
  clicks: number;
  id: number;
  partner_id: string;
  sub_id_internal: number;
};

export type T_ApiResponse = {
  status: string;
  body: // | T_ErrorText
  | T_Networks
    | T_Rpcs
    | R_getUser
    | T_UserSitesResp
    | T_GetSubIdClickResponse
    | T_ClicksResponse;
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
    return fetch(`${BaseApiUrl}/partner/register`, {
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
  timestamp: number | string;
  wallet: string;
  auth: string;
  contact: { name: string; url: string }[];
};

export const registerContact = createEffect<
  T_RegisterContact,
  T_ApiResponse,
  string
>(async (form) => {
  return fetch(`${BaseApiUrl}/partner/contacts/add`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      timestamp: form.timestamp.toString(),
      wallet: form.wallet,
      auth: form.auth,
    },
    body: JSON.stringify({
      contacts: form.contact.map((el) => {
        return { name: el.name, url: el.url };
      }),
    }),
  })
    .then(async (res) => await res.json())
    .catch((e) => e);
});

//?-------
export type T_GetEserData = {
  timestamp: number;
  wallet: string;
  auth: string;
};

export type T_GetSiteClicks = {
  timestamp: number;
  wallet: string;
  auth: string;
  id: number | string;
};

export const getUserData = createEffect<T_GetEserData, T_ApiResponse, string>(
  async (form) => {
    return fetch(`${BaseApiUrl}/partner/get`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        timestamp: form.timestamp.toString(),
        wallet: form.wallet,
        auth: form.auth,
      },
    })
      .then(async (res) => await res.json())
      .catch((e) => e);
  }
);

export const getUserSites = createEffect<T_GetEserData, T_ApiResponse, string>(
  async (form) => {
    return fetch(`${BaseApiUrl}/partner/site/get`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        timestamp: form.timestamp.toString(),
        wallet: form.wallet,
        auth: form.auth,
      },
    })
      .then(async (res) => await res.json())
      .catch((e) => e);
  }
);

export const registerPage = createEffect<T_RegisterPage, T_ApiResponse, string>(
  async (form) => {
    return fetch(`${BaseApiUrl}/partner/site/add`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        timestamp: form.timestamp.toString(),
        wallet: form.wallet,
        auth: form.auth,
      },
      body: JSON.stringify({ url: form.url, name: form.name }),
    })
      .then(async (res) => await res.json())
      .catch((e) => e);
  }
);

export type T_GetSubIdClicks = {
  timestamp: number;
  wallet: string;
  auth: string;
  site_id: string;
  sub_id: string;
};

export const getSubIdClicks = createEffect<
  T_GetSubIdClicks,
  T_ApiResponse,
  string
>(async (form) => {
  return fetch(
    `${BaseApiUrl}/partner/site/subid/clicks/${form.site_id}/${form.sub_id}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        timestamp: form.timestamp.toString(),
        wallet: form.wallet,
        auth: form.auth,
      },
    }
  )
    .then(async (res) => await res.json())
    .catch((e) => e);
});

export const getFullClicks = createEffect<T_GetEserData, T_ApiResponse, string>(
  async (form) => {
    return fetch(`${BaseApiUrl}/partner/clicks`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        timestamp: form.timestamp.toString(),
        wallet: form.wallet,
        auth: form.auth,
      },
    })
      .then(async (res) => await res.json())
      .catch((e) => e);
  }
);

export const getSiteClicks = createEffect<
  T_GetSiteClicks,
  T_ApiResponse,
  string
>(async (form) => {
  return fetch(`${BaseApiUrl}/partner/site/subid/clicks/0/14`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      timestamp: form.timestamp.toString(),
      wallet: form.wallet,
      auth: form.auth,
    },
  })
    .then(async (res) => await res.json())
    .catch((e) => e);
});

//?--------------------------------------
//?--------------------------------------
//?--------------------------------------
//?--------------------------------------
//?--------------------------------------
//?--------------------------------------
//?--------------------------------------
export const getUserContact = createEffect<
  T_GetEserData,
  T_ApiResponse,
  string
>(async (form) => {
  return fetch(`${BaseApiUrl}/partner/contacts/get`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      timestamp: form.timestamp.toString(),
      wallet: form.wallet,
      auth: form.auth,
    },
  })
    .then(async (res) => await res.json())
    .catch((e) => e);
});

export const registerSubId = createEffect<
  T_RegisterSubId,
  T_ApiResponse,
  string
>(async (form) => {
  return fetch(`${BaseApiUrl}/partner/site/subid/add`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      timestamp: form.timestamp.toString(),
      wallet: form.wallet,
      auth: form.auth,
    },
    body: JSON.stringify({
      url: form.url,
      name: form.name,
      internal_site_id: form.internal_site_id,
    }),
  })
    .then(async (res) => await res.json())
    .catch((e) => e);
});

export type T_RegisterSubIdConnect = {
  timestamp: number | string;
  wallet: string;
  auth: string;
  partner_wallet: string;
  signature: string;
  site_id: number;
  sub_id: number;
  user_wallet: string;
};

export const registerSubIdConnect = createEffect<
  T_RegisterSubIdConnect,
  T_ApiResponse,
  string
>(async (form) => {
  return fetch(`${BaseApiUrl}/partner/site/subid/connect`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      timestamp: form.timestamp.toString(),
      wallet: form.wallet,
      auth: form.auth,
    },
    body: JSON.stringify({
      partner_wallet: form.partner_wallet,
      signature: form.signature,
      site_id: form.site_id,
      sub_id: form.sub_id,
      user_wallet: form.user_wallet,
    }),
  })
    .then(async (res) => await res.json())
    .catch((e) => e);
});
