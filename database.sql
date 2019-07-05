CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

SELECT * FROM "user";

CREATE TABLE "cards" (
    "object" VARCHAR(5000) ,
    "id" VARCHAR(5000) ,
    "oracle_id" VARCHAR(5000) ,
    "multiverse_ids" VARCHAR(5000) ,
    "name" VARCHAR(5000) ,
    "lang" VARCHAR(5000) ,
    "released_at" VARCHAR(5000) ,
    "uri" VARCHAR(5000) ,
    "scryfall_uri" VARCHAR(5000) ,
    "layout" VARCHAR(5000) ,
    "highres_image" VARCHAR(5000) ,
    "image_uris" VARCHAR(50000) ,
    "mana_cost" VARCHAR(5000) ,
    "cmc" VARCHAR(5000) ,
    "type_line" VARCHAR(5000) ,
    "oracle_text" VARCHAR(5000) ,
    "loyalty" VARCHAR(5000) ,
    "colors" VARCHAR(5000) ,
    "color_identity" VARCHAR(5000) ,
    "legalities" VARCHAR(5000) ,
    "games" VARCHAR(5000) ,
    "reserved" VARCHAR(5000) ,
    "foil" VARCHAR(5000) ,
    "nonfoil" VARCHAR(5000) ,
    "oversized" VARCHAR(5000) ,
    "promo" VARCHAR(5000) ,
    "reprint" VARCHAR(5000) ,
    "variation" VARCHAR(5000) ,
    "set" VARCHAR(5000) ,
    "set_name" VARCHAR(5000) ,
    "set_type" VARCHAR(5000) ,
    "set_uri" VARCHAR(5000) ,
    "set_search_uri" VARCHAR(5000) ,
    "scryfall_set_uri" VARCHAR(5000) ,
    "rulings_uri" VARCHAR(5000) ,
    "prints_search_uri" VARCHAR(5000) ,
    "collector_number" VARCHAR(5000) ,
    "digital" VARCHAR(5000) ,
    "rarity" VARCHAR(5000) ,
    "illustration_id" VARCHAR(5000) ,
    "card_back_id" VARCHAR(5000) ,
    "artist" VARCHAR(5000) ,
    "border_color" VARCHAR(5000) ,
    "frame" VARCHAR(5000) ,
    "full_art" VARCHAR(5000) ,
    "textless" VARCHAR(5000) ,
    "booster" VARCHAR(5000) ,
    "story_spotlight" VARCHAR(5000) ,
    "promo_types" VARCHAR(5000) ,
    "edhrec_rank" VARCHAR(5000) ,
    "related_uris" VARCHAR(5000) 
);

COPY "cards" FROM '/user/trevorramlow/AtomProjects/caesar/spike-wknd/scryfall-csv-copy.csv' DELIMITER ',' CSV HEADER;

ALTER TABLE "cards" ADD COLUMN "serial_id" SERIAL PRIMARY KEY;
ALTER TABLE "public"."cards" ADD COLUMN "price" integer;

ALTER TABLE "public"."cards"
  DROP COLUMN "object",
  DROP COLUMN "oracle_id",
  DROP COLUMN "multiverse_ids",
  DROP COLUMN "lang",
  DROP COLUMN "released_at",
  DROP COLUMN "uri",
  DROP COLUMN "scryfall_uri",
  DROP COLUMN "layout",
  DROP COLUMN "mana_cost",
  DROP COLUMN "cmc",
  DROP COLUMN "loyalty",
  DROP COLUMN "colors",
  DROP COLUMN "color_identity",
  DROP COLUMN "legalities",
  DROP COLUMN "games",
  DROP COLUMN "reserved",
  DROP COLUMN "foil",
  DROP COLUMN "nonfoil",
  DROP COLUMN "oversized",
  DROP COLUMN "promo",
  DROP COLUMN "reprint",
  DROP COLUMN "variation",
  DROP COLUMN "set_type",
  DROP COLUMN "set_uri",
  DROP COLUMN "set_search_uri",
  DROP COLUMN "scryfall_set_uri",
  DROP COLUMN "rulings_uri",
  DROP COLUMN "prints_search_uri",
  DROP COLUMN "collector_number",
  DROP COLUMN "digital",
  DROP COLUMN "rarity",
  DROP COLUMN "illustration_id",
  DROP COLUMN "card_back_id",
  DROP COLUMN "artist",
  DROP COLUMN "border_color",
  DROP COLUMN "frame",
  DROP COLUMN "full_art",
  DROP COLUMN "textless",
  DROP COLUMN "booster",
  DROP COLUMN "story_spotlight",
  DROP COLUMN "promo_types",
  DROP COLUMN "edhrec_rank",
  DROP COLUMN "highres_image",
  DROP COLUMN "related_uris"
;

SELECT * FROM "cards" 
ORDER BY "serial_id";

CREATE TABLE "user_cards" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "cards_id" INT REFERENCES "cards",
    "number_owned" INT
);


SELECT * FROM "user"
JOIN "user_cards" ON "user"."id"="user_cards"."user_id"
JOIN "cards" on "cards"."serial_id"="user_cards"."cards_id"
ORDER BY "user"."id";