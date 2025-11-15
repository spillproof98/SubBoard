import { app } from "./app";
import { env } from "./config/env";

app.listen(env.PORT, () => {
  console.log(`Quarterly backend running on port ${env.PORT}`);
});
