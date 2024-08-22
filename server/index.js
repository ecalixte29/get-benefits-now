import app from "./src/app.js";
import { connectDB } from "./src/config/database.js";

const PORT = process.env.PORT || 5001;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});