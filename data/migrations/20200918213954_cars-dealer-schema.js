exports.up = function (knex) {
  return knex.schema.createTable("car-info", (tbl) => {
    tbl.increments("carID");
    tbl.string("vinNumber", 17);
    tbl.string("carMake");
    tbl.string("carModel");
    tbl.integer("carMileage");
    tbl.string("carTransmission");
    tbl.string("carTitleStatus");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("car-info");
};
