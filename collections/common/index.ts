import type {Access, FieldHook} from "payload";
import type {User} from "@/payload-types";

export function checkRole(
    allRoles: User["roles"] = [], user?: User | null
) {
    if (user) {
        if (allRoles?.some(role => {
            return user?.roles?.some(individualRole => {
                return individualRole === role;
            })
        })) {
            return true;
        }
    }
    return false;
}

export const isAnyone = () => true;

export const isAdmin: Access<User> = ({req: {user}}) => {
    return checkRole(["admin"], user);
}

export const isAdminOrSelf: Access<User> = ({req: {user}}) => {
    return checkRole(["admin"], user) ||
        {owner: {equals: user?.id}};
}

// hooks

export const useProtectRoles: FieldHook<{ id: string } & User> = ({req, data}) => {
    const isAdmin = req.user?.roles?.includes("admin");

    if (!isAdmin) {
        return ["user"];
    }

    const userRoles = new Set(data?.roles ?? []);
    userRoles.add("user");
    return [...userRoles.values()];
};
