const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
const upload = multer({ dest: "uploads/" });

// MongoDB connection string
const mongoURI =
  "mongodb+srv://jauvalue:Tby5VZdwtU9GGaJw@cluster0.pi9vv.mongodb.net/jay?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err.message));

// Cloth Schema and Model
const blogPostSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  kind: {
    type: String,
  },
  id: {
    type: String,
  },
  blog: {
    id: {
      type: String,
    },
  },
  published: {
    type: Date,
  },
  updated: {
    type: Date,
  },
  url: {
    type: String,
  },
  selfLink: {
    type: String,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  Image: {
    type: String,
  },
  author: {
    id: {
      type: String,
    },
    displayName: {
      type: String,
    },
    url: {
      type: String,
    },
    image: {
      url: {
        type: String,
      },
    },
  },
  replies: {
    totalItems: {
      type: String,
    },
    selfLink: {
      type: String,
    },
  },
  labels: {
    type: [String], // Array of strings for labels
  },
  etag: {
    type: String,
  },
  displayName: { type: String },
  adminUrl: { type: String },
  adminImage: { type: String },
});

const postBlog = mongoose.model("blog", blogPostSchema);

// Routes
app.get("/blogs", async (req, res) => {
  try {
    const products = await postBlog.find();
    res.json(products);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Error fetching data");
  }
});

// post routes
app.post("/post", upload.single("coverImage"), async (req, res) => {
  const { title, content, labels, coverImage } = req.body;
  const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  try {
    const newPost = new postBlog({
      id: uniqueId,
      title,
      content: content,
      labels: labels.split(","),
      Image: coverImage,
      selfLink:
        "https://www.googleapis.com/blogger/v3/blogs/3908422654159649151/posts/6672486155132627158",
      displayName: "Jaysriraam",
      adminUrl: "https://www.blogger.com/profile/03781464141678674051",
      published: new Date(),
      updated: new Date(),
      adminImage:
        "//2.bp.blogspot.com/-OZ9GRDO1L44/Zf_D1qe2XlI/AAAAAAAAAmE/L_n6wfLelFITU7aG2xwxH7EbkX4N_dMFACK4BGAYYCw/s35/65a18958-20d5-4eec-afd0-c86363a9c1ba_upscaled-transformed.png",
      adminUrl: "https://www.blogger.com/profile/03781464141678674051",
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error("Error saving data:", err);
    res.status(500).send("Error saving data");
  }
});

// serach by id
app.get("/blogs/:id", async (req, res) => {
  const { id } = req.params; // Use req.params to get the id from the URL

  if (!id) {
    return res.status(400).json({ message: "ID parameter is required" });
  }

  try {
    const blog = await postBlog.findById(id); // Use findById for MongoDB
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (error) {
    console.error("Failed to fetch blog:", error.message);
    res.status(500).json({ message: "Failed to fetch blog" });
  }
});

// login state

const userLoginData = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("loginDataforblog", userLoginData);

// app.get("/users", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     console.error("Error fetching users:", error.message);
//     res.status(500).json({ message: "An error occurred while fetching users" });
//   }
// });

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Directly compare passwords (not recommended)
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "An error occurred during login" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unexpected error:", err);
  res.status(500).json({ message: "Something went wrong" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
