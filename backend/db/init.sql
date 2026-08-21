-- =============================================================
-- Brancho Database Schema for MySQL (8.x)
-- Run in MySQL Workbench (as root) to create the database, user
-- and all tables. Seed data is inserted by `npm run db:seed`.
-- =============================================================

CREATE DATABASE IF NOT EXISTS brancho CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE brancho;

-- -----------------------------------------------------------
-- Users (customers, providers, admins)
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS Users (
  id                  INT             AUTO_INCREMENT PRIMARY KEY,
  name                VARCHAR(255)    NOT NULL,
  email               VARCHAR(255)    NOT NULL UNIQUE,
  password            VARCHAR(255)    NOT NULL,
  phone               VARCHAR(20)     DEFAULT NULL,
  role                ENUM('customer','provider','admin') NOT NULL DEFAULT 'customer',
  avatar              VARCHAR(255)    DEFAULT NULL,
  isActive            TINYINT(1)      NOT NULL DEFAULT 1,
  resetPasswordToken  VARCHAR(255)    DEFAULT NULL,
  resetPasswordExpire DATETIME        DEFAULT NULL,
  createdAt           DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt           DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_users_email (email),
  INDEX idx_users_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------------
-- Services
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS Services (
  id             INT             AUTO_INCREMENT PRIMARY KEY,
  name           VARCHAR(255)    NOT NULL,
  slug           VARCHAR(255)    NOT NULL UNIQUE,
  category       VARCHAR(255)    NOT NULL,
  description    TEXT            DEFAULT NULL,
  image          VARCHAR(255)    DEFAULT NULL,
  basePrice      DECIMAL(10,2)   NOT NULL DEFAULT 0,
  unit           VARCHAR(255)    NOT NULL DEFAULT 'per visit',
  durationMins   INT             DEFAULT 60,
  rating         DECIMAL(3,2)    NOT NULL DEFAULT 0.00,
  numReviews     INT             NOT NULL DEFAULT 0,
  isActive       TINYINT(1)      NOT NULL DEFAULT 1,
  createdAt      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_services_category (category, isActive),
  INDEX idx_services_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------------
-- Professionals (provider accounts link to Users.role=provider)
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS Professionals (
  id               INT             AUTO_INCREMENT PRIMARY KEY,
  userId           INT             NOT NULL UNIQUE,
  name             VARCHAR(255)    NOT NULL,
  phone            VARCHAR(20)     DEFAULT NULL,
  city             VARCHAR(255)    NOT NULL,
  avatar           VARCHAR(255)    DEFAULT NULL,
  bio              TEXT            DEFAULT NULL,
  skills           JSON            DEFAULT NULL,
  rating           DECIMAL(3,2)    NOT NULL DEFAULT 0.00,
  numReviews       INT             NOT NULL DEFAULT 0,
  jobsCompleted    INT             NOT NULL DEFAULT 0,
  totalEarnings    DECIMAL(12,2)   NOT NULL DEFAULT 0,
  isApproved       TINYINT(1)      NOT NULL DEFAULT 0,
  isActive         TINYINT(1)      NOT NULL DEFAULT 1,
  createdAt        DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt        DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_professionals_city (city),
  INDEX idx_professionals_approved (isApproved, isActive),
  CONSTRAINT fk_professionals_user FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------------
-- Addresses
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS Addresses (
  id           INT             AUTO_INCREMENT PRIMARY KEY,
  userId       INT             NOT NULL,
  label        VARCHAR(255)    NOT NULL DEFAULT 'Home',
  addressLine  VARCHAR(255)    NOT NULL,
  city         VARCHAR(255)    NOT NULL,
  state        VARCHAR(255)    DEFAULT NULL,
  zipCode      VARCHAR(20)     DEFAULT NULL,
  latitude     DECIMAL(10,7)   DEFAULT NULL,
  longitude    DECIMAL(10,7)   DEFAULT NULL,
  isDefault    TINYINT(1)      NOT NULL DEFAULT 0,
  createdAt    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_addresses_user (userId, isDefault),
  CONSTRAINT fk_addresses_user FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------------
-- Coupons
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS Coupons (
  id               INT             AUTO_INCREMENT PRIMARY KEY,
  code             VARCHAR(255)    NOT NULL UNIQUE,
  description      TEXT            DEFAULT NULL,
  discountType     ENUM('percentage','fixed') NOT NULL DEFAULT 'percentage',
  discountValue    DECIMAL(10,2)   NOT NULL,
  minBookingAmount DECIMAL(10,2)   NOT NULL DEFAULT 0,
  maxDiscount      DECIMAL(10,2)   DEFAULT NULL,
  usageLimit       INT             DEFAULT NULL,
  usedCount        INT             NOT NULL DEFAULT 0,
  expiresAt        DATETIME        DEFAULT NULL,
  isActive         TINYINT(1)      NOT NULL DEFAULT 1,
  createdAt        DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt        DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_coupons_code (code),
  INDEX idx_coupons_active (isActive, expiresAt)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------------
-- Bookings
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS Bookings (
  id              INT             AUTO_INCREMENT PRIMARY KEY,
  bookingId       VARCHAR(64)     NOT NULL UNIQUE,
  userId          INT             NOT NULL,
  serviceId       INT             NOT NULL,
  professionalId  INT             DEFAULT NULL,
  addressId       INT             DEFAULT NULL,
  couponId        INT             DEFAULT NULL,
  scheduledAt     DATETIME        NOT NULL,
  amount          DECIMAL(10,2)   NOT NULL DEFAULT 0,
  discountAmount  DECIMAL(10,2)   NOT NULL DEFAULT 0,
  payableAmount   DECIMAL(10,2)   NOT NULL DEFAULT 0,
  paymentMethod   ENUM('upi','card','netbanking','cod') DEFAULT NULL,
  paymentStatus   ENUM('pending','paid','failed','refunded') NOT NULL DEFAULT 'pending',
  bookingStatus   ENUM('pending','confirmed','assigned','in_progress','completed','cancelled') NOT NULL DEFAULT 'pending',
  notes           TEXT            DEFAULT NULL,
  rating          INT             DEFAULT NULL,
  feedback        TEXT            DEFAULT NULL,
  createdAt       DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt       DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_bookings_user (userId, bookingStatus),
  INDEX idx_bookings_service (serviceId),
  INDEX idx_bookings_professional (professionalId, bookingStatus),
  INDEX idx_bookings_status_schedule (bookingStatus, scheduledAt),
  INDEX idx_bookings_coupon (couponId),
  CONSTRAINT fk_bookings_user FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
  CONSTRAINT fk_bookings_service FOREIGN KEY (serviceId) REFERENCES Services(id) ON DELETE CASCADE,
  CONSTRAINT fk_bookings_professional FOREIGN KEY (professionalId) REFERENCES Professionals(id) ON DELETE SET NULL,
  CONSTRAINT fk_bookings_address FOREIGN KEY (addressId) REFERENCES Addresses(id) ON DELETE SET NULL,
  CONSTRAINT fk_bookings_coupon FOREIGN KEY (couponId) REFERENCES Coupons(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------------
-- Payments
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS Payments (
  id              INT             AUTO_INCREMENT PRIMARY KEY,
  bookingId       INT             NOT NULL,
  userId          INT             NOT NULL,
  amount          DECIMAL(10,2)   NOT NULL,
  method          ENUM('upi','card','netbanking','cod') DEFAULT NULL,
  transactionId   VARCHAR(255)    DEFAULT NULL,
  gatewayRef      VARCHAR(255)    DEFAULT NULL,
  status          ENUM('pending','success','failed','refunded') NOT NULL DEFAULT 'pending',
  createdAt       DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt       DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_payments_booking (bookingId),
  INDEX idx_payments_user (userId, status),
  INDEX idx_payments_txn (transactionId),
  CONSTRAINT fk_payments_booking FOREIGN KEY (bookingId) REFERENCES Bookings(id) ON DELETE CASCADE,
  CONSTRAINT fk_payments_user FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------------
-- Wallets
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS Wallets (
  id           INT             AUTO_INCREMENT PRIMARY KEY,
  userId       INT             NOT NULL UNIQUE,
  balance      DECIMAL(12,2)   NOT NULL DEFAULT 0,
  createdAt    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_wallets_user FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS WalletTransactions (
  id              INT             AUTO_INCREMENT PRIMARY KEY,
  userId          INT             NOT NULL,
  type            ENUM('credit','debit') NOT NULL,
  amount          DECIMAL(12,2)   NOT NULL,
  description     VARCHAR(255)    DEFAULT NULL,
  balanceAfter    DECIMAL(12,2)   NOT NULL DEFAULT 0,
  createdAt       DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt       DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_wallet_tx_user (userId),
  CONSTRAINT fk_wallet_tx_user FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------------
-- Reviews
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS Reviews (
  id               INT             AUTO_INCREMENT PRIMARY KEY,
  userId           INT             NOT NULL,
  bookingId        INT             DEFAULT NULL,
  professionalId   INT             DEFAULT NULL,
  rating           INT             NOT NULL,
  comment          TEXT            DEFAULT NULL,
  isApproved       TINYINT(1)      NOT NULL DEFAULT 0,
  createdAt        DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt        DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_reviews_professional (professionalId, isApproved),
  INDEX idx_reviews_user (userId),
  CONSTRAINT fk_reviews_user FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
  CONSTRAINT fk_reviews_booking FOREIGN KEY (bookingId) REFERENCES Bookings(id) ON DELETE SET NULL,
  CONSTRAINT fk_reviews_professional FOREIGN KEY (professionalId) REFERENCES Professionals(id) ON DELETE CASCADE,
  CONSTRAINT chk_reviews_rating CHECK (rating >= 1 AND rating <= 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------------
-- Notifications
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS Notifications (
  id          INT             AUTO_INCREMENT PRIMARY KEY,
  userId      INT             DEFAULT NULL,
  type        ENUM('booking','payment','system','promo') NOT NULL DEFAULT 'system',
  title       VARCHAR(255)    NOT NULL,
  message     TEXT            NOT NULL,
  isRead      TINYINT(1)      NOT NULL DEFAULT 0,
  sendToAll   TINYINT(1)      NOT NULL DEFAULT 0,
  createdAt   DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt   DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_notifications_user (userId, isRead),
  CONSTRAINT fk_notifications_user FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------------
-- SupportTickets
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS SupportTickets (
  id          INT             AUTO_INCREMENT PRIMARY KEY,
  userId      INT             NOT NULL,
  subject     VARCHAR(255)    NOT NULL,
  message     TEXT            NOT NULL,
  status      ENUM('open','assigned','resolved','closed') NOT NULL DEFAULT 'open',
  priority    ENUM('low','medium','high') NOT NULL DEFAULT 'medium',
  assignedTo  INT             DEFAULT NULL,
  resolution  TEXT            DEFAULT NULL,
  createdAt   DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt   DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_tickets_user (userId),
  INDEX idx_tickets_status (status),
  CONSTRAINT fk_tickets_user FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------------
-- ActivityLogs
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS ActivityLogs (
  id          INT             AUTO_INCREMENT PRIMARY KEY,
  userId      INT             DEFAULT NULL,
  action      VARCHAR(255)    NOT NULL,
  description TEXT            DEFAULT NULL,
  ipAddress   VARCHAR(45)     DEFAULT NULL,
  userAgent   TEXT            DEFAULT NULL,
  createdAt   DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt   DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_activity_user (userId),
  INDEX idx_activity_action (action),
  INDEX idx_activity_created (createdAt)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
