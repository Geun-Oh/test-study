interface IUser{
    id: string;
    name: string;
    email: string;
}

export const fetchUser = (id: string, callback: (user: IUser) => unknown) => {
    setTimeout(() => {
        console.log("calling...");
        const User: IUser = {
            id,
            name: "User" + id,
            email: id + "@gmail.com"
        }
        callback(User)
    }, 100);
}

export const promiseUser = (id: string) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("calling...");
            const user: IUser = {
                id,
                name: "User" + id,
                email: id + '@test.com'
            }
            resolve(user);
        }, 100);
    });
};