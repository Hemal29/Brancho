-- =============================================================
-- Migration: add OTP login columns to Users
-- Run once against an existing brancho database:
--   mysql -u brancho -p brancho < db/migrations/add_otp_columns.sql
-- =============================================================

USE brancho;

ALTER TABLE Users
  ADD COLUMN IF NOT EXISTS otpCode    VARCHAR(10) DEFAULT NULL AFTER resetPasswordExpire,
  ADD COLUMN IF NOT EXISTS otpExpire  DATETIME    DEFAULT NULL AFTER otpCode,
  ADD COLUMN IF NOT EXISTS otpAttempts INT NOT NULL DEFAULT 0 AFTER otpExpire;
