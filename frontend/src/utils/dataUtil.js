export const getUnitType = (type) => {
    if (type === "SR") {
        return "Single Room";
    } else if (type === "BS") {
        return "Bed Sitter";
    } else if (type === "OB") {
        return "One Bedroom";
    } else if (type === "TwB") {
        return "Two Bedroom";
    } else if (type === "TrB") {
        return "Three Bedroom";
    } else if (type === "FB") {
        return "Four Bedroom";
    }
};

export const properties = [
    {
      type: "Select",
      value: "undefined",
    },
    {
      type: "Single Room",
      value: "SR",
    },
    {
      type: "Bedsitter",
      value: "BD",
    },
    {
      type: "One Bedroom",
      value: "OBD",
    },
    {
      type: "Two Bedroom",
      value: "TWB",
    },
    {
      type: "Three Bedroom",
      value: "THB",
    },
    {
      type: "Four Bedroom",
      value: "FRB",
    },
  ];