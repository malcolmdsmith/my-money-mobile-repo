import apiKit from "./apiKit";
import { getCurrentUser } from "./userApi";
import { getMySQLDate } from "../utility/dateFunctions";

const apiEndpoint = "/transactions";

function getUrl(uri) {
  return `${apiEndpoint}/${uri}`;
}

export function getTransactionsNotCategorized(id) {
  return apiKit.get(getUrl(`notcategorized/user/${id}`));
}

export function getRunRules(id) {
  return apiKit.get(getUrl(`runrules/user/${id}`));
}

export async function searchTransactions(
  currentPage,
  pageSize,
  data,
  countOnly
) {
  const user = await getCurrentUser();
  const fromdate = data.dateFrom === "" ? "" : getMySQLDate(data.dateFrom, "-");
  const todate = data.dateTo === "" ? "" : getMySQLDate(data.dateTo, "-");
  let queryString = `?currentPage=${currentPage}&pageSize=${pageSize}&countOnly=${countOnly}&owner_id=${user.id}&dateFrom=${fromdate}&dateTo=${todate}`;
  queryString += `&category=${data.category}&amountFrom=${data.amountFrom}&amountTo=${data.amountTo}&keywords=${data.keywords}`;
  return apiKit.get(getUrl(`search/user/all${queryString}`));
}

export async function saveAllocatedTransactions(data) {
  for (const element of data) {
    await saveTransaction(element);
  }
  console.info("SAVE DONE.....");
}

export async function saveTransactions(data) {
  for (const element in data) {
    if (element["Date"] !== undefined) {
      const transaction = getDBTransaction(element);
      await saveTransaction(transaction);
    }
  }
  console.info("SAVE DONE...");
}

export async function saveTransaction(transaction) {
  if (transaction.id) {
    const body = { ...transaction };
    delete body.id;

    return apiKit.put(getUrl(transaction.id), body);
  }
  return apiKit.post(apiEndpoint, transaction);
}

export function deleteTransaction(id) {
  return apiKit.delete(getUrl(id));
}

function getDBTransaction(data) {
  let transaction = {};
  if (data.id) transaction.id = data.id;
  transaction.transDate = getMySQLDate(data.Date);
  transaction.narrative = data.Narrative;
  transaction.debitAmount =
    data["Debit Amount"] === "" ? 0 : parseFloat(data["Debit Amount"]);
  transaction.creditAmount =
    data["Credit Amount"] === "" ? 0 : parseFloat(data["Credit Amount"]);
  transaction.balance = parseFloat(data.Balance);
  transaction.categories = data.Categories;
  transaction.myBudgetCategory = "";
  if (!data.owner_id) {
    const user = getCurrentUser();
    transaction.owner_id = user.id;
  }
  return transaction;
}
