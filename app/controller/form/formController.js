const { Form } = require("../../models/form/form");

exports.createForm = async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.status(201).json(form);
  } catch (error) {
    console.error("Error creating Form:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllForm = async (req, res) => {
  try {
    const { $filter, $skip, $top, $select } = req.query;

    let query = {};

    // Apply filtering
    if ($filter) {
      try {
        query = JSON.parse($filter);
      } catch (error) {
        return res.status(400).json({ error: "Invalid filter format" });
      }
    }

    // Apply pagination
    const options = {};
    if ($skip) options.skip = parseInt($skip, 10);
    if ($top) options.limit = parseInt($top, 10);

    // Apply field selection
    let selectFields = "";
    if ($select) {
      selectFields = $select.split(",").join(" ");
    }

    const forms = await Form.find(query)
      .select(selectFields)
      .skip(options.skip || 0)
      .limit(options.limit || 0);

    res.status(200).json(forms);
  } catch (error) {
    console.error("Error fetching Forms:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getFormById = async (req, res) => {
  try {
    const { id } = req.params;

    const form = await Form.findById(id);
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }

    res.status(200).json(form);
  } catch (error) {
    console.error("Error fetching Form:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateForm = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedForm = await Form.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });

    if (!updatedForm) {
      return res.status(404).json({ error: "Form not found" });
    }

    res.status(200).json(updatedForm);
  } catch (error) {
    console.error("Error updating Form:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteForm = async (req, res) => {
  try {
    const { id } = req.params;

    const form = await Form.findByIdAndDelete(id);

    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }

    res.status(200).json({ message: "Form deleted successfully!" });
  } catch (error) {
    console.error("Error deleting Form:", error);
    res.status(500).json({ error: error.message });
  }
};
