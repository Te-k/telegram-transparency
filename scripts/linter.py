import json
import argparse
import os
import sys

EXISTING_DATES = ["20240101", "20240331", "20240401", "20240630", "20240701", "20240930", "20241001", "20241231", "20250101", "20250331", "20250401", "20250630", "20250701", "20250930", "20251001", "20251231"]


def check_format(fpath):
    try:
        with open(fpath) as f:
            data = json.load(f)
    except json.JSONDecodeError as e:
        print("Invalid JSON format: {}".format(str(e)))
        return False

    success = True
    done = []
    for country in data:
        if country in done:
            print("Duplicated entry {}".format(country))
            success = False
        else:
            done.append(country)

        if len(country) != 3:
            print("Invalid country code: {}".format(country))
            success = False

        keys = ["from", "to", "requests", "users"]
        for entry in data[country]:
            for k in keys:
                if k not in entry:
                    print("Invalid entry for {}: missing {}".format(country, k))
                    success = False
            if entry["from"] not in EXISTING_DATES:
                print("Invalid date {} for {}".format(entry["from"], country))
                success = False
            if entry["to"] not in EXISTING_DATES:
                print("Invalid date {} for {}".format(entry["to"], country))
                success = False

            # check if total per year exist and are good
        for year in range(2024, 2027):
            try:
                q1 = [a for a in data[country] if a["from"] == str(year) + '0101' and a["to"] == str(year) + '0331'][0]
                q2 = [a for a in data[country] if a["from"] == str(year) + '0401' and a["to"] == str(year) + '0630'][0]
                q3 = [a for a in data[country] if a["from"] == str(year) + '0701' and a["to"] == str(year) + '0930'][0]
                q4 = [a for a in data[country] if a["from"] == str(year) + '1001' and a["to"] == str(year) + '1231'][0]
            except IndexError:
                # Not all data for this year
                pass
            else:
                users = q1["users"] + q2["users"] + q3["users"] + q4["users"]
                requests = q1["requests"] + q2["requests"] + q3["requests"] + q4["requests"]
                yeard = [a for a in data[country] if a["from"] == str(year) + "0101" and a["to"] == str(year) + '1231']
                if len(yeard) == 0:
                    print("Missing total year {} for country {} ({{\"from\": \"{}0101\", \"to\": \"{}1231\", \"requests\": {}, \"users\": {}}})".format(
                        year,
                        country,
                        year,
                        year,
                        requests,
                        users
                    ))
                    success = False
                else:
                    d = yeard[0]
                    if d["users"] != users:
                        print("Mistake in users for year data of year {} and country {}, it should be {}".format(
                            year,
                            country,
                            users
                        ))
                        success = False
                    if d["requests"] != requests:
                        print("Mistake in requests for year data of year {} and country {}, it should be {}".format(
                            year,
                            country,
                            requests
                        ))
                        success = False

    return success


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Check telegram transparency dataset format")
    parser.add_argument("--folder", "-f", default=".", help="Indicator folder")
    args = parser.parse_args()

    if not os.path.isdir(args.folder):
        print("Invalid folder")
        sys.exit(1)

    fpath = os.path.join(args.folder, "dataset.json")
    if not os.path.isfile(fpath):
        print("Can't find the dataset file")
        sys.exit(1)

    if not check_format(fpath):
        print("Oh noes, there are some issues")
        sys.exit(1)

    with open(fpath) as f:
        data = json.load(f)
    nb_countries = len(data.keys())
    print("{} countries".format(nb_countries))

    print("All good, good work!")
