const Event = require("../../db/models/Event");

exports.eventCreate = async (req, res, next) => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
};

exports.eventListFetch = async (req, res, next) => {
  try {
    const events = await Event.find(
      {},
      { __id: true, name: true, image: true, startDate: true },
      {
        sort: { startDate: "asc", name: "asc" },
      }
    );
    res.json(events);
  } catch (error) {
    next(error);
  }
};

exports.eventDetailFetch = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.eventId);
    res.json(event);
  } catch (error) {
    next(error);
  }
};

exports.eventUpdate = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.eventId, req.body);
    if (event) {
      res.status(204).end();
    } else {
      next({ status: 404, message: "Event Not Found" });
    }
  } catch (error) {
    next(error);
  }
};

exports.eventDelete = async (req, res, next) => {
  try {
    const product = await Event.findByIdAndDelete(req.params.eventId);
    if (product) {
      res.status(204).end();
    } else {
      next({ status: 404, message: "Event Not Found" });
    }
  } catch (error) {
    next(error);
  }
};
