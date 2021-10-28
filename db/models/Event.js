const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
  organizer: {
    type: String,
    maxLength: 20,
  },
  name: {
    type: String,
    validate: [
      (value) => !value.includes("event"),
      "Event can't include the word include",
    ],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    // validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  image: {
    type: String,
    required: true,
  },
  numOfSeats: {
    type: Number,
    min: 5,
  },
  bookedSeats: {
    type: Number,
    default: 0,
    // validate: [
    //   (value) => {
    //     return this.numOfSeats < value;
    //   },
    //   "Booked seats can't be greater than the number of available seats",
    // ],
  },
  startDate: {
    type: Date,
    validate: {
      validator: (value) => value > Date.now(),
      message: "Event should be in the future",
    },
  },
  endDate: {
    type: Date,
  },
});

EventSchema.pre("validate", function (next) {
  if (this.numOfSeats <= this.bookedSeats) {
    this.invalidate(
      "bookedSeats",
      "Booked seats limit exceeded!",
      this.bookedSeats
    );
  }
  if (this.endDate < this.startDate) {
    this.invalidate(
      "endDate",
      "The event can't end before it starts",
      this.endDate
    );
  }
  next();
});

module.exports = mongoose.model("Event", EventSchema);
