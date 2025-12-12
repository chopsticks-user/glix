export interface ActionState<T> {
    success: boolean,
    message: string,
    data: T,
}

type Role = "admin" | "user";
type Vendor = "stripe" | "paypal";
type Status = "requested" | "pending" | "rejected" | "accepted";

// todo: remove this
interface User {
    email: string;
    roles: Role[];
    contacts: User[];
    accounts: Account[];
    transactions: Transaction[];
    preferredAccount: Account;
}

interface Account {
    owner: User;
    vendor: Vendor;
    balance: number;
}

interface Transaction {
    sender: User,
    source: Account;
    receiver: User,
    destination: Account;
    amount: number;
    status: Status;
}