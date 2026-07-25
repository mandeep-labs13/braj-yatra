/* ============================================================
   BRAJ YATRA — TOUR CONFIG
   Everything client/event-specific lives here. Edit this file,
   nothing else needs to change.
   ============================================================ */
window.BRAJ_CONFIG = {

  tour: {
    name: "Braj Darshan Yatra",
    tagline: "6 Days · 7 Nights in the land of Krishna's Leela",
    subtitle: "Vrindavan · Mathura · Govardhan · Barsana · Nandgaon · Gokul",
    startDateISO: "2026-11-12T05:00:00+05:30",
    startDateDisplay: "Thursday, 12 November 2026",
    endDateDisplay: "Wednesday, 18 November 2026",
    departureCity: "Delhi NCR",
    contactWhatsApp: "919510180882",
    contactDisplay: "+91 95101 80882",
    organiser: "Aiautomations",
  },

  days: [
    {
      num: 1,
      title: "Mathura — Janmasthan",
      subtitle: "Arrival & the birthplace of Krishna",
      line: "Check-in, darshan at Krishna Janmabhoomi, evening Yamuna aarti at Vishram Ghat.",
      stops: ["Krishna Janmabhoomi", "Vishram Ghat Aarti", "Dwarkadhish Temple"],
      accent: "#C9A24B",
    },
    {
      num: 2,
      title: "Vrindavan — Nagari of Bihariji",
      subtitle: "Banke Bihari & the temples of divine love",
      line: "Morning darshan at Banke Bihari, ISKCON Krishna-Balaram Mandir, evening light-and-sound at Prem Mandir.",
      stops: ["Banke Bihari Mandir", "ISKCON Vrindavan", "Prem Mandir (evening)"],
      accent: "#E8871E",
    },
    {
      num: 3,
      title: "Vrindavan — Nidhivan & the Yamuna",
      subtitle: "The forest of eternal Raas Leela",
      line: "Nidhivan at dawn, Radha Raman Mandir, Seva Kunj, and a boat ride on the Yamuna at sunset.",
      stops: ["Nidhivan", "Radha Raman Mandir", "Seva Kunj", "Yamuna Boat Ride"],
      accent: "#5C1A2E",
    },
    {
      num: 4,
      title: "Govardhan Parikrama",
      subtitle: "The hill Krishna lifted",
      line: "Govardhan parikrama, Radha Kund & Shyam Kund darshan, sunset at Kusum Sarovar.",
      stops: ["Govardhan Parikrama", "Radha Kund", "Shyam Kund", "Kusum Sarovar"],
      accent: "#C9A24B",
    },
    {
      num: 5,
      title: "Barsana & Nandgaon",
      subtitle: "Radha's home & Krishna's village",
      line: "Radha Rani Temple atop the Barsana hill, then across to Nand Bhavan in Nandgaon.",
      stops: ["Radha Rani Temple, Barsana", "Nand Bhavan, Nandgaon", "Sanket"],
      accent: "#E8871E",
    },
    {
      num: 6,
      title: "Gokul & Mahavan",
      subtitle: "Where Krishna spent his childhood",
      line: "Nand Bhavan Gokul, Raman Reti, Chhathi Palna — a gentle final day before the farewell dinner.",
      stops: ["Nand Bhavan, Gokul", "Raman Reti", "Chhathi Palna"],
      accent: "#5C1A2E",
    },
    {
      num: 7,
      title: "Departure",
      subtitle: "One last darshan before you go",
      line: "Morning aarti, checkout, and transfer for onward journey.",
      stops: ["Morning Aarti", "Checkout & Departure"],
      accent: "#C9A24B",
    },
  ],

  inclusions: [
    "6 nights accommodation (twin sharing)",
    "All darshan & temple entries",
    "AC vehicle for the full circuit",
    "Daily breakfast & dinner (pure satvik)",
    "Local guide across all 5 towns",
    "Yamuna boat ride & Govardhan parikrama support",
  ],

  notIncluded: [
    "Travel to/from Delhi NCR",
    "Lunch (available at extra cost en route)",
    "Personal expenses & donations",
  ],
};
