let onlineUsers = [];

const addUser = (userId, socketId) => {
    if (!onlineUsers.find((user) => user.userId === userId)) {
        onlineUsers.push({ userId, socketId });
    }
    console.log("Current Online Users:", onlineUsers);
};

const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return onlineUsers.find((user) => user.userId === userId);
};

export { addUser, removeUser, getUser };
