import apiKit from "./apiKit";
import { getCurrentUser } from "./userApi";

const apiEndpoint = "/budgetTypes";

function getUrl(uri) {
  return `${apiEndpoint}/${uri}`;
}

export function getBudgetTypes(id) {
  return apiKit.get(getUrl(`user/${id}`));
}

export async function saveBudgetType(data) {
  const type = await getDBBudgetType(data);
  console.info("type...", type);
  if (type.id) {
    const body = { ...type };
    delete body.id;

    return apiKit.put(getUrl(type.id), body);
  }
  return apiKit.post(apiEndpoint, type);
}

export function deleteBudgetType(id) {
  console.info("id...", id);
  return apiKit.delete(getUrl(id));
}

async function getDBBudgetType(data) {
  let type = {};
  type.parent_category = data.parent_category;
  type.category = data.category;
  if (data.owner_id === undefined) {
    const user = await getCurrentUser();
    console.info("1...", user.id);
    type.owner_id = user.id;
  } else {
    console.info("2...", data.owner_id);
    type.owner_id = data.owner_id;
  }
  return type;
}
