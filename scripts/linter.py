import json
import argparse
import os
import sys


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
