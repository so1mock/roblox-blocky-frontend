interface getOauthCodeParams {
  clientId: string;
  redirectUri: string;
  scope: string[];
  state: string;
}

export const getOauthCode = (params: getOauthCodeParams) => {
  const { clientId, redirectUri, scope, state } = params;

  const baseUrl = import.meta.env.VITE_AUTHORIZATION_URL;
  const searchParams = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: scope.join(" "),
    response_type: "code",
    state: state,
  });

  window.location.href = `${baseUrl}?${searchParams.toString()}`;
};
