const express = require("express");
const {
  eventCreate,
  eventListFetch,
  eventDelete,
  eventDetailFetch,
  eventUpdate,
} = require("./controllers");

const router = express.Router();

router.post("/", eventCreate);

router.get("/", eventListFetch);

router.get("/:eventId", eventDetailFetch);

router.put("/:eventId", eventUpdate);

router.delete("/:eventId", eventDelete);

module.exports = router;
