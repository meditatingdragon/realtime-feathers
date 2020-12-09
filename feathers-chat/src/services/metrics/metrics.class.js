const { getRandomInt } = require("../../utils/dataGenerator");

/* eslint-disable no-unused-vars */
exports.Metrics = class Metrics {
  async create(data) {
    return data;
  }

  setup() {
    let logins = [
      getRandomInt(50, 70),
      getRandomInt(50, 70),
      getRandomInt(50, 70),
      getRandomInt(50, 70),
      getRandomInt(50, 70),
      getRandomInt(50, 70),
      getRandomInt(50, 70),
    ];

    setInterval(() => {
      console.log("Sending new data");
      logins.shift();
      logins.push(getRandomInt(50, 70));
      this.create({
        messageCount: getRandomInt(1000, 10000) + getRandomInt(0, 100),
        activeChatRooms: getRandomInt(5, 100),
        recentLogins: logins,
        openTickets: getRandomInt(0, 100),
        closedTickets: getRandomInt(0, 100),
        unassignedTickets: getRandomInt(0, 100),
      });
    }, 5000);
  }
};
