# Quid Icons (Iconic Font)

## Usage

This package is going to define and expose a `quid-icons` font-face in your project.

To use it, you most likely want to look at `@quid/react-core#Icon`.

## Update the iconic font

To update the iconic font:

1. Go to [IcoMoon](https://icomoon.io/app/#/projects)
2. Click on "Import Project"
3. Select the `quid-icons.json` file present in this folder
4. Click "Load" near the imported project entry
5. Add or edit the existing icons using the app

**NOTE:** Icon names CAN NOT contain dashes (-)!! Use only letters and underscores.
This is because of a "bug" of Chrome that doesn't accept ligatures containing dashes.

Once done, to download the updated iconic font:

1. Click on "Generate Font" in the bottom toolbar
2. Click on the "fi" icon in the top toolbar to show the ligatures information
3. Make sure to write in the "ligatures" field of any new icon the name of it
   otherwise it will not load when required inside the code
4. Click on "Download" button in the bottom toolbar
5. Replace all the files of this folder, excluded quid-icons.css and this README
   with the files you will find in the archive under the `fonts` folder
6. Test that the fonts still work properly in the app!!
