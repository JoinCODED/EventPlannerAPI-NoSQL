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
      {
        __id: true,
        name: true,
        image: true,
        startDate: true,
        // numOfSeats: true,
      },
      {
        sort: { startDate: "asc", name: "asc" },
      }
    );
    res.json(events);
  } catch (error) {
    next(error);
  }
};

exports.eventFullFetch = async (req, res, next) => {
  try {
    const events = await Event.find({
      $expr: { $eq: ["$numOfSeats", "$bookedSeats"] },
    });
    res.json(events);
  } catch (error) {
    next(error);
  }
};

exports.eventListSearch = async (req, res, next) => {
  try {
    const events = await Event.find({
      name: { $regex: req.params.query, $options: "i" },
    });
    res.json(events);
  } catch (error) {
    next(error);
  }
};

exports.eventPaginatedFetch = async (req, res, next) => {
  try {
    //   Inside req.body => { skip: 2, limit: 2 }
    const events = await Event.find({}, null, req.body);
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
    if (req.params.eventId) {
      const product = await Event.findByIdAndDelete(req.params.eventId);
      if (product) {
        res.status(204).end();
      } else {
        next({ status: 404, message: "Event Not Found" });
      }
    } else {
      await Event.deleteMany({ _id: { $in: req.body } });
      res.status(204).end();
    }
  } catch (error) {
    next(error);
  }
};
