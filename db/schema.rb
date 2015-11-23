# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151121201637) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "days", force: :cascade do |t|
    t.date     "date"
    t.time     "start_time"
    t.time     "end_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "home_base"
    t.integer  "trip_id"
  end

  add_index "days", ["trip_id"], name: "index_days_on_trip_id", using: :btree

  create_table "destinations", force: :cascade do |t|
    t.string   "name"
    t.string   "address"
    t.time     "start_time"
    t.date     "date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "trip_id"
    t.integer  "day_id"
    t.integer  "duration"
    t.integer  "like_count"
    t.time     "end_time"
  end

  add_index "destinations", ["day_id"], name: "index_destinations_on_day_id", using: :btree
  add_index "destinations", ["trip_id"], name: "index_destinations_on_trip_id", using: :btree

  create_table "reservations", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "trip_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "reservations", ["trip_id"], name: "index_reservations_on_trip_id", using: :btree
  add_index "reservations", ["user_id"], name: "index_reservations_on_user_id", using: :btree

  create_table "trips", force: :cascade do |t|
    t.string   "location"
    t.string   "name"
    t.date     "start_date"
    t.date     "end_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "user_id"
  end

  add_index "trips", ["user_id"], name: "index_trips_on_user_id", using: :btree

  create_table "trips_users", id: false, force: :cascade do |t|
    t.integer "user_id"
    t.integer "trip_id"
  end

  add_index "trips_users", ["trip_id"], name: "index_trips_users_on_trip_id", using: :btree
  add_index "trips_users", ["user_id"], name: "index_trips_users_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "email",                  default: "", null: false
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.integer  "trip_id"
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["trip_id"], name: "index_users_on_trip_id", using: :btree

end
