import db from "../models/index";

let getAllEventService = (date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!date) {
        resolve({
          errCode: 1,
          errMessage: "必須パラメーターが不足しています！",
        });
      } else {
        let data = await db.Event.findAll({
          where: { date: date },
          nest: true,
        });
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAllEventService1 = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "入力パラメーターが不足しています！",
        });
      } else {
        let event = "";
        if (inputId === "ALL") {
          event = await db.Event.findAll({});
        }
        if (inputId && inputId !== "ALL") {
          event = await db.Event.findOne({
            where: { id: inputId },
          });
        }
        resolve({
          errCode: 0,
          data: event,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getCreateNewEventService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.date) {
        resolve({
          errCode: 1,
          errMessage: "必須パラメーターが不足しています！",
        });
      } else {
        await db.Event.create({
          nameEvent: data.nameEvent,
          description: data.description,
          date: data.date,
        });
        resolve({
          errCode: 0,
          errMessage: "ok",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getDeleteEventService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "必須パラメーターが不足しています！",
        });
      } else {
        let event = await db.Event.findOne({
          where: { id: id },
        });
        if (!event) {
          resolve({
            errCode: 2,
            errMessage: "イベントが存在しません！",
          });
        }
        await db.Event.destroy({
          where: { id: id },
        });
        resolve({
          errCode: 0,
          errMessage: "削除に成功しました！",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getEditEventService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "必須パラメーターが不足しています！",
        });
      }
      let event = await db.Event.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (event) {
        event.nameEvent = data.nameEvent;
        event.description = data.description;
        event.date = data.date;
        await event.save();
        resolve({
          errCode: 0,
          errMessage: "編集に成功しました！",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "見つかりません！",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllEventService: getAllEventService,
  getAllEventService1: getAllEventService1,
  getCreateNewEventService: getCreateNewEventService,
  getDeleteEventService: getDeleteEventService,
  getEditEventService: getEditEventService,
};
