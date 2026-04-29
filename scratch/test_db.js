const { db } = require("../src/lib/db");

async function testDb() {
  try {
    const userCount = await db.user.count();
    console.log("User count:", userCount);
  } catch (error) {
    console.error("DB Test Error:", error);
  }
}

testDb();
