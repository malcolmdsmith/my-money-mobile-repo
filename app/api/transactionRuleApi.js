import apiKit from "./apiKit";
import { getCurrentUser } from "./userApi";

const apiEndpoint = "/rules";

function getUrl(uri) {
  return `${apiEndpoint}/${uri}`;
}

export function getRules(id) {
  return apiKit.get(getUrl(`user/${id}`));
}

export async function saveTransactionRule(data) {
  const rule = await getDBTransactionRule(data);
  console.info(rule);
  if (rule.id) {
    const body = { ...rule };
    delete body.id;

    return apiKit.put(getUrl(rule.id), body);
  }
  return apiKit.post(apiEndpoint, rule);
}

export function deleteTransactionRule(id) {
  return apiKit.delete(getUrl(id));
}

async function getDBTransactionRule(data) {
  let rule = {};
  console.info(data);
  if (data.id !== 0) rule.id = data.id;
  rule.search_keywords = data.search_keywords;
  rule.category = data.category;
  rule.amount = data.amount;
  if (data.owner_id === undefined) {
    const user = await getCurrentUser();
    rule.owner_id = user.id;
  } else {
    rule.owner_id = data.owner_id;
  }
  return rule;
}
