import Account from "../models/account.js";

export const getUserAccounts = async (req, res) => {
  let { userId } = req.params;
  let accounts = await Account.find({ userId });
  res.json({
    message: "Handling GET request to /accounts",
    accounts,
  });
};

export const addNewAccount = async (req, res, next) => {
  try {
    let newAccount = new Account(req.body);
    await newAccount.save();
    res.json({
      message: "Handling POST request to /accounts",
      newAccount,
    });
  } catch (error) {
    next(error);
  }
};

export const getAccount = async (req, res) => {
  let { accountId } = req.params;
  let account = await Account.findOne({ _id: accountId });
  res.json({
    message: "Handling GET request specific account with ID",
    account,
  });
};

export const updateAccount = async (req, res) => {
  let { accountId } = req.params;
  let updatedAccount = await Account.findOneAndUpdate(
    { _id: accountId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.json({
    message: "Updated account with ID",
    updatedAccount,
  });
};

export const deleteAccount = async (req, res) => {
  let { accountId } = req.params;
  let deletedAccount = await Account.findOneAndRemove({ _id: accountId });
  res.json({
    message: "Deleted account with ID " + accountId,
    accounts: await Account.find(),
  });
};
