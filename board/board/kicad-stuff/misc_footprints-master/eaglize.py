import os
import sys

dir_path = None

# Gerber files generated by Kicad are content- compatible with those
# made in EAGLE but naming convention is different, which can be problematic
# Renaming GERBERS to EAGLE convention eg. enables OSHPark to parse them

# Remember to megre PTH and NPTH drillings to one .drl file

EAGLE_counterparts = {
    "-F.Cu.gbr": ".GTL",        # Top Layer
    "-B.Cu.gbr": ".GBL",        # Bottom Layer
    "-F.Mask.gbr": ".GTS",      # Top Soldermask
    "-B.Mask.gbr": ".GBS",      # Bottom Soldermask
    "-F.SilkS.gbr": ".GTO",     # Top Silkscreen
    "-B.SilkS.gbr": ".GBO",     # Bottom Silkscreen
    # "": ".G2L",
    # "": ".G3L",
    "-Edge.Cuts.gbr": ".GKO",   # Board Outline
    ".drl": ".XLN"  # Drills
}


def eaglize_file(filename):
    for k_format in EAGLE_counterparts.keys():
        if filename.endswith(k_format):
            k = filename.rfind(k_format)
            new_filename = filename[:k] + EAGLE_counterparts[k_format]
            os.rename(filename, new_filename)
            return new_filename


if __name__ == "__main__":
    try:
        dir_path = sys.argv[1]
    except IndexError:
        dir_path = '.'

for root, dirs, files in os.walk(dir_path):
    for file_name in files:
            eaglize_file(file_name)