const middlewareFunctions = {
  async bulkWriteInChunks(collection, bulkArray, chunkSize = 300) {
    try {
      // Split the bulkArray into chunks
      for (let i = 0; i < bulkArray.length; i += chunkSize) {
        const chunk = bulkArray.slice(i, i + chunkSize);

        // Perform bulkWrite for the current chunk
        const result = await collection.bulkWrite(chunk);
        console.log(`Chunk ${i / chunkSize + 1}:`, result);
      }

      console.log("All chunks processed successfully.");
      return true;
    } catch (error) {
      console.error("Error during bulkWrite:", error);
      return false;
    }
  },
  async bulkInsertInChunks(collection, bulkArray, chunkSize = 300) {
    try {
      // Split the bulkArray into chunks
      for (let i = 0; i < bulkArray.length; i += chunkSize) {
        const chunk = bulkArray.slice(i, i + chunkSize);

        // Perform bulkWrite for the current chunk
        const result = await collection.insertMany(chunk);
        console.log(`Chunk ${i / chunkSize + 1}:`, result);
      }

      console.log("All chunks processed successfully.");
      return true;
    } catch (error) {
      console.error("Error during bulkInsert:", error);
      return false;
    }
  },
};
module.exports = middlewareFunctions