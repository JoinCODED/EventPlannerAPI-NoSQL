const express = require("express");
const {
  eventCreate,
  eventListFetch,
  eventDelete,
  eventDetailFetch,
  eventUpdate,
  eventFullFetch,
  eventListSearch,
  eventPaginatedFetch,
} = require("./controllers");

const router = express.Router();

router.post("/", eventCreate);

router.get("/", eventListFetch);

router.get("/full", eventFullFetch);

router.get("/search/:query", eventListSearch);

router.get("/pagination", eventPaginatedFetch);

router.get("/:eventId", eventDetailFetch);

router.put("/:eventId", eventUpdate);

router.delete("/:eventId?", eventDelete);

module.exports = router;
