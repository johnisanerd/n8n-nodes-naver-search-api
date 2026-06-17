# n8n-nodes-naver-search-api

An [n8n](https://n8n.io/) community node that searches Naver (Korea's largest search engine) across web, news, images, video, and shopping, and returns structured results: title, link, snippet, and source. It is backed by the [Naver Search API](https://apify.com/johnvc/naver-search-api?fpr=9n7kx3) on [Apify](https://apify.com?fpr=9n7kx3) and bills per result, so there are no subscriptions and no minimums.

[Installation](#installation) · [Credentials](#credentials) · [Operations](#operations) · [Output](#output) · [Example workflows](#example-workflows) · [Pricing](#pricing) · [Resources](#resources)

## What it does

Give the node a query and a search type, and it returns one item per result with the title, link, snippet, and source. It also works as an **AI Agent tool**, so an agent can run Korean-market searches on demand. This is useful for **Korea SEO** and market research.

- Search Naver web, news, image, video, or shopping verticals
- Control how many results to return
- Choose how much data to return per result: Simplified, Raw, or Selected Fields

## Installation

Follow the n8n [community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/):

1. In n8n, open **Settings > Community Nodes**.
2. Select **Install**.
3. Enter `n8n-nodes-naver-search-api` as the npm package name.
4. Agree to the risks of using community nodes, then select **Install**.

After it installs, the **Naver Search** node appears in the nodes panel.

> n8n Cloud only allows verified community nodes. Until this node is verified, install it on a self-hosted n8n instance.

## Credentials

You need a free [Apify account](https://apify.com?fpr=9n7kx3) and an API token.

1. Sign in to the [Apify Console](https://console.apify.com?fpr=9n7kx3).
2. Open **Settings > Integrations** and copy your **Personal API token**.
3. In n8n, create a new **Apify API** credential and paste the token.
4. Use the credential's **Test** button to confirm it works.

The node also supports **Apify OAuth2** if you prefer to connect that way.

## Operations

**Search Result > Search** returns results for a query.

| Parameter | Description |
| --- | --- |
| Search Query | The query to search Naver for. Required. |
| Search Type | All (Integrated), Web, News, Image, Video, or Shopping. |
| Maximum Results per Query | How many results to return. |
| Output | How much data to return: Simplified, Raw, or Selected Fields. |

## Output

Each result is returned as its own n8n item. The **Output** parameter lets you choose how much to return:

- **Simplified** (default): a compact object with `title`, `snippet`, `source`, `link`, `where`, `thumbnail`, and `position`. This mode is also used automatically when the node runs as an AI Agent tool, to keep responses small.
- **Raw**: every field the API returns for each result, using the original field names below.
- **Selected Fields**: pick exactly which fields to include.

### Fields (Raw and Selected Fields)

| Field | Type | Description |
| --- | --- | --- |
| `result_type` | string | Result type for the vertical |
| `query` | string | The query that produced this result |
| `where` | string | Search vertical used |
| `position` | integer | Rank in the results |
| `title` | string | Result title |
| `link` | string | Result URL |
| `snippet` | string | Result snippet |
| `source` | string | Source site or publisher |
| `thumbnail` | string | Thumbnail URL, when available |
| `displayed_link` | string | The link as displayed by Naver |
| `fetched_at` | string | When the result was fetched (ISO 8601) |

## Example workflows

### 1. Track Naver rankings for a keyword

1. **Schedule Trigger**: run daily.
2. **Naver Search**: Search Query your keyword, Search Type `Web`, Output `Simplified`.
3. **Filter**: find your domain in `link` and log its `position`.

### 2. Korea news monitoring

1. **Schedule Trigger**: run hourly.
2. **Naver Search**: a brand name, Search Type `News`.
3. **Slack**: alert on new coverage.

### 3. Let an AI Agent search Naver

1. **AI Agent** node.
2. Attach **Naver Search** as a tool.
3. Ask a question; it calls the node (in Simplified mode) and answers using live Naver results.

## Pricing

This node calls the [Naver Search API](https://apify.com/johnvc/naver-search-api?fpr=9n7kx3) on Apify, which is billed **pay-per-result**, with no subscription and no minimums. Apify also includes a free monthly usage tier that covers typical volumes. See the [Actor page](https://apify.com/johnvc/naver-search-api?fpr=9n7kx3) for current rates.

## Resources

- [Naver Search API on Apify](https://apify.com/johnvc/naver-search-api?fpr=9n7kx3)
- [npm package](https://www.npmjs.com/package/n8n-nodes-naver-search-api)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Apify n8n integration guide](https://docs.apify.com/platform/integrations/n8n)

## License

[MIT](LICENSE.md)
