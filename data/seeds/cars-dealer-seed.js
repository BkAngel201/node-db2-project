exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("car-info")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("car-info").insert([
        {
          carID: 1,
          vinNumber: "vdFE45e3rDE2134aE",
          carMake: "Hyundai",
          carModel: "sonata",
          carMileage: 23000,
          carTransmission: "auto",
          carTitleStatus: "clean",
        },
        {
          carID: 2,
          vinNumber: "jkUYT657Hytg762fg",
          carMake: "Nissan",
          carModel: "gt-r",
          carMileage: 18000,
          carTransmission: "auto",
          carTitleStatus: "salvage",
        },
        {
          carID: 3,
          vinNumber: "vd34jHU7865Gt76aE",
          carMake: "Honda",
          carModel: "accord",
          carMileage: 1000,
          carTransmission: "auto",
          carTitleStatus: "clean",
        },
      ]);
    });
};
