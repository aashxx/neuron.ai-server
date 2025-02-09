import mongoose from "mongoose";

export const connectDatabase = async () => {
    try {
        if(mongoose.connection.readyState === 1) {
            console.log("🔁 Connection Established");
            return;
        }
        await mongoose.connect("mongodb+srv://tmohamedaashir:cWpiAcsXx4wv9Io9@neuron-db.igrhh.mongodb.net");
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ Failed to connect to database: " + error);
        process.exit(1);
    }
}