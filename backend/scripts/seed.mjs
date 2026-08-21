import { createPool } from "mysql2/promise";
import bcrypt from "bcryptjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const pool = createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "brancho",
  password: process.env.DB_PASSWORD || "Br@ncho#2026",
  database: process.env.DB_NAME || "brancho",
  charset: "utf8mb4",
  multipleStatements: true,
});

async function q(sql, params = []) {
  const [rows] = await pool.query(sql, params);
  return rows;
}

const SERVICES = [
  ["AC Service & Repair", "ac-cleaning", "AC Repair", "Deep clean, gas top-up and repair for all AC brands.", "/services/ac-cleaning.svg", 449, "per AC", 60],
  ["Deep Home Cleaning", "deep-cleaning", "Cleaning", "Professional deep cleaning for every corner of your home.", "/services/deep-cleaning.svg", 1999, "per visit", 180],
  ["Plumbing Services", "plumbing", "Plumbing", "Leakage fixes, tap installation, water tank and more.", "/services/plumbing.svg", 299, "per visit", 60],
  ["Electrician", "electrician", "Electrical", "Wiring, fan, switchboard and appliance installation.", "/services/electrician.svg", 249, "per visit", 60],
  ["Carpentry Services", "carpentry", "Carpentry", "Furniture assembly, repair and custom woodwork.", "/services/carpentry.svg", 349, "per visit", 90],
  ["Pest Control", "pest-control", "Cleaning", "Cockroach, rodent and termite control with safe chemicals.", "/services/pest-control.svg", 899, "per visit", 90],
  ["Painting Services", "painting", "Painting", "Full home or single-wall painting with premium paints.", "/services/painting.svg", 2499, "per visit", 240],
  ["Water Purifier", "water-purifier", "Appliance", "RO service, filter replacement and installation.", "/services/water-purifier.svg", 399, "per visit", 60],
  ["Bathroom Cleaning", "bathroom-cleaning", "Cleaning", "Sanitisation and scaling removal for bathrooms.", "/services/bathroom-cleaning.svg", 599, "per visit", 90],
  ["Kitchen Cleaning", "kitchen-cleaning", "Cleaning", "Chimney, hob and kitchen deep cleaning.", "/services/kitchen-cleaning.svg", 749, "per visit", 90],
  ["Sofa & Carpet Cleaning", "sofa-carpet", "Cleaning", "Steam cleaning for sofas, carpets and mattresses.", "/services/sofa-carpet.svg", 499, "per seat", 90],
  ["Geyser & Appliance", "geyser-repair", "Appliance", "Repair and servicing for geysers, microwaves and more.", "/services/geyser-repair.svg", 349, "per visit", 60],
  ["Furniture Assembly", "furniture-assembly", "Carpentry", "Assembly of beds, wardrobes and modular furniture.", "/services/furniture-assembly.svg", 299, "per item", 60],
];

const COUPONS = [
  ["WELCOME10", "10% off on your first booking", "percentage", 10, 199, 300, 5000, "2027-12-31"],
  ["FESTIVE150", "₹150 off on orders above ₹999", "fixed", 150, 999, null, 2000, "2026-12-31"],
  ["CLEAN50", "Flat ₹50 off on cleaning services", "fixed", 50, 499, null, null, "2026-12-31"],
];

async function main() {
  console.log("Seeding brancho database...");

  // Ensure schema exists
  const schema = fs.readFileSync(path.join(__dirname, "..", "db", "init.sql"), "utf8");
  await pool.query(schema);
  console.log("Schema ensured.");

  const hash = (pw) => bcrypt.hashSync(pw, 10);

  // Users
  await q("DELETE FROM Bookings; DELETE FROM Payments; DELETE FROM Reviews; DELETE FROM WalletTransactions; DELETE FROM Coupons; DELETE FROM Addresses; DELETE FROM Professionals; DELETE FROM Notifications; DELETE FROM SupportTickets; DELETE FROM ActivityLogs; DELETE FROM Wallets; DELETE FROM Users; DELETE FROM Services;");

  const admin = await q("INSERT INTO Users (name, email, phone, password, role) VALUES (?, ?, ?, ?, 'admin')", ["Brancho Admin", "admin@brancho.in", "18001234567", hash("Admin@123")]);
  const adminId = admin.insertId;

  const customers = await Promise.all([
    ["Aarav Patel", "aarav@example.com", "9824011111"],
    ["Priya Shah", "priya@example.com", "9824022222"],
    ["Rohan Mehta", "rohan@example.com", "9824033333"],
    ["Sneha Desai", "sneha@example.com", "9824044444"],
  ].map(async ([name, email, phone]) => {
    const r = await q("INSERT INTO Users (name, email, phone, password, role) VALUES (?, ?, ?, ?, 'customer')", [name, email, phone, hash("Customer@123")]);
    await q("INSERT INTO Wallets (userId, balance) VALUES (?, ?)", [r.insertId, Math.floor(Math.random() * 800) + 100]);
    return r.insertId;
  }));

  const providerUsers = await Promise.all([
    ["Ramesh Kumar", "ramesh@brancho.in", "9824055555"],
    ["Suresh Yadav", "suresh@brancho.in", "9824066666"],
    ["Vikram Singh", "vikram@brancho.in", "9824077777"],
    ["Dinesh Rathod", "dinesh@brancho.in", "9824088888"],
    ["Kiran Prajapati", "kiran@brancho.in", "9824099999"],
    ["Manoj Chauhan", "manoj@brancho.in", "9824000000"],
  ].map(async ([name, email, phone]) => {
    const r = await q("INSERT INTO Users (name, email, phone, password, role) VALUES (?, ?, ?, ?, 'provider')", [name, email, phone, hash("Provider@123")]);
    return r.insertId;
  }));

  const profData = [
    ["Ramesh Kumar", "9824055555", "Ahmedabad", ["ac-cleaning", "water-purifier", "geyser-repair"], 4.9, 820, 5400],
    ["Suresh Yadav", "9824066666", "Ahmedabad", ["plumbing", "bathroom-cleaning"], 4.8, 640, 4200],
    ["Vikram Singh", "9824077777", "Ahmedabad", ["electrician", "geyser-repair"], 4.9, 750, 5100],
    ["Dinesh Rathod", "9824088888", "Ahmedabad", ["carpentry", "furniture-assembly"], 4.7, 430, 2900],
    ["Kiran Prajapati", "9824099999", "Ahmedabad", ["pest-control", "deep-cleaning", "kitchen-cleaning"], 4.8, 560, 3600],
    ["Manoj Chauhan", "9824000000", "Ahmedabad", ["painting", "sofa-carpet"], 4.6, 310, 2100],
  ];

  const professionals = [];
  for (let i = 0; i < profData.length; i++) {
    const [name, phone, city, skills, rating, jobs, earnings] = profData[i];
    const r = await q(
      "INSERT INTO Professionals (userId, name, phone, city, skills, rating, numReviews, jobsCompleted, totalEarnings, isApproved, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 1)",
      [providerUsers[i], name, phone, city, JSON.stringify(skills), rating, jobs, jobs, earnings]
    );
    professionals.push(r.insertId);
  }

  // Services
  const serviceIds = {};
  for (const [name, slug, category, desc, image, price, unit, mins] of SERVICES) {
    const r = await q("INSERT INTO Services (name, slug, category, description, image, basePrice, unit, durationMins, rating, numReviews, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)", [name, slug, category, desc, image, price, unit, mins, 4.8, 120]);
    serviceIds[slug] = r.insertId;
  }

  // Coupons
  for (const [code, desc, type, value, min, max, limit, exp] of COUPONS) {
    await q("INSERT INTO Coupons (code, description, discountType, discountValue, minBookingAmount, maxDiscount, usageLimit, expiresAt, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)", [code, desc, type, value, min, max, limit, exp]);
  }

  // Addresses for customers
  const addrIds = [];
  for (const cid of customers) {
    const r = await q("INSERT INTO Addresses (userId, label, addressLine, city, state, zipCode, isDefault) VALUES (?, 'Home', ?, 'Ahmedabad', 'Gujarat', '3800XX', 1)", [cid, "Sindhu Bhavan Road, Bodakdev, Ahmedabad"]);
    addrIds.push(r.insertId);
  }

  // Bookings + payments (sample data)
  const slugs = Object.keys(serviceIds);
  const statuses = ["completed", "completed", "in_progress", "confirmed", "pending", "completed", "cancelled"];
  let totalRevenue = 0;
  for (let i = 0; i < 14; i++) {
    const cid = customers[i % customers.length];
    const slug = slugs[i % slugs.length];
    const serviceId = serviceIds[slug];
    const prof = professionals[i % professionals.length];
    const status = statuses[i % statuses.length];
    const amount = SERVICES.find((s) => s[1] === slug)[5];
    const daysAgo = i % 7;
    const scheduledAt = new Date(Date.now() - daysAgo * 86400000 + i * 3600000).toISOString().slice(0, 19).replace("T", " ");
    const bookingRef = "BR-" + Date.now().toString(36).toUpperCase().slice(-4) + Math.random().toString(36).slice(2, 7).toUpperCase();

    const paid = status !== "cancelled" && status !== "pending";
    const b = await q(
      `INSERT INTO Bookings (bookingId, userId, serviceId, professionalId, addressId, scheduledAt, amount, discountAmount, payableAmount, paymentMethod, paymentStatus, bookingStatus, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?, 'upi', ?, ?, NULL)`,
      [bookingRef, cid, serviceId, prof, addrIds[cid % addrIds.length], scheduledAt, amount, amount, paid ? "paid" : "pending", status]
    );
    if (paid) {
      totalRevenue += amount;
      await q("INSERT INTO Payments (bookingId, userId, amount, method, transactionId, gatewayRef, status) VALUES (?, ?, ?, 'upi', ?, ?, 'success')", [b.insertId, cid, amount, "TXN-SEED-" + b.insertId, "gw_seed_" + b.insertId]);
    }
    if (status === "completed") {
      const rating = 4 + Math.floor(Math.random() * 2);
      await q("INSERT INTO Reviews (userId, bookingId, professionalId, rating, comment, isApproved) VALUES (?, ?, ?, ?, ?, 1)", [cid, b.insertId, prof, rating, "Great service, very professional and on time.", ]);
    }
  }

  await q("INSERT INTO Notifications (userId, type, title, message, isRead, sendToAll) VALUES (?, 'system', 'Welcome to Brancho', 'Your admin account is ready. Explore the dashboard.', 0, 0)", [adminId]);

  console.log("Seed complete.");
  console.log("  Admin:    admin@brancho.in / Admin@123");
  console.log("  Customer: aarav@example.com / Customer@123");
  console.log("  Provider: ramesh@brancho.in / Provider@123");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
