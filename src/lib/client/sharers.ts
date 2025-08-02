export const WIN_PARAMS =
  "scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0";

const serialize = (
  params: Record<string, string | number | boolean | undefined | null>,
  prefix?: string
): string => {
  const query: string[] = [];

  for (const p in params) {
    if (Object.prototype.hasOwnProperty.call(params, p)) {
      const k = prefix ? `${prefix}[${p}]` : p;
      const v = params[p];

      if (
        v === undefined ||
        v === null ||
        (typeof v === "string" && v.trim() === "") ||
        (Array.isArray(v) && v.length === 0)
      )
        continue;

      query.push(
        v !== null && typeof v === "object" ? serialize(v, k) : `${k}=${v}`
        // : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
      );
    }
  }

  return query.join("&");
};

type BasicOptions = { url: string };

type FbOptions = BasicOptions;

export const fb = ({ url }: FbOptions) => {
  const params = serialize({
    kid_directed_site: "0",
    sdk: "alckordev",
    u: url,
    display: "popup",
    ref: "plugin",
    src: "share_button",
  });

  const sharer = `https://www.facebook.com/sharer/sharer.php?${params}`;

  return window.open(sharer, "_blank", WIN_PARAMS);
};

type TwOptions = BasicOptions & {
  title?: string;
  hashtags?: string[];
};

export const tw = ({ title, url, hashtags }: TwOptions) => {
  const params = serialize({
    text: title,
    url,
    hashtags: hashtags?.join(","),
  });

  const sharer = `https://x.com/intent/post?${params}`;

  return window.open(sharer, "_blank", WIN_PARAMS);
};

type LinkedinOptions = BasicOptions & {
  title?: string;
  description?: string;
};

export const linkedin = ({ title, description, url }: LinkedinOptions) => {
  const params = serialize({
    title,
    summary: description,
    url,
  });

  const sharer = `https://www.linkedin.com/shareArticle?mini=true&${params}`;

  return window.open(sharer, "_blank", WIN_PARAMS);
};
